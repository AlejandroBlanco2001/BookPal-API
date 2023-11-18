"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const client_2 = require("@prisma/client");
const fine_service_1 = require("../fine/fine.service");
const userUnpaidFines_exception_1 = require("../exceptions/userUnpaidFines.exception");
const physicalBook_service_1 = require("../physicalBook/physicalBook.service");
const reference_service_1 = require("../reference/reference.service");
const genericError_exception_1 = require("../exceptions/genericError.exception");
const loanNotFound_exceptions_1 = require("../exceptions/loanNotFound.exceptions");
const inventory_service_1 = require("../inventory/inventory.service");
const physicalBookNotAvailable_exception_1 = require("../exceptions/physicalBookNotAvailable.exception");
const maximumLoansPerCollection_exception_1 = require("../exceptions/maximumLoansPerCollection.exception");
const notification_service_1 = require("../notification/notification.service");
const loanAlreadyReturned_exception_1 = require("../exceptions/loanAlreadyReturned.exception");
let LoanService = class LoanService {
    constructor(fineService, physicalBookService, referenceService, inventoryService, notificationService, prisma) {
        this.fineService = fineService;
        this.physicalBookService = physicalBookService;
        this.referenceService = referenceService;
        this.inventoryService = inventoryService;
        this.notificationService = notificationService;
        this.prisma = prisma;
    }
    async loan(loanWhereUniqueInput, includes) {
        const loan = await this.prisma.loan.findUnique({
            where: loanWhereUniqueInput,
            include: includes,
        });
        if (!loan) {
            throw new loanNotFound_exceptions_1.LoanNotFound(loanWhereUniqueInput);
        }
        const book = await this.physicalBookService.physicalBook({
            barcode: loan.physical_book_barcode,
        });
        return {
            ...loan,
            physical_book: book,
        };
    }
    async createLoan(user_id, data) {
        try {
            const physicalBook = await this.physicalBookService.physicalBook({
                barcode: data.physical_book.connect?.barcode,
            }, {
                collection: true,
                Loan: true,
            });
            if (physicalBook?.status === client_1.BookStatus.unavailable) {
                throw new physicalBookNotAvailable_exception_1.PhysicalBookNotAvailable(data.physical_book.connect?.barcode);
            }
            const unpaidFines = await this.fineService.getFines({
                status: client_1.FineStatus.unpaid,
                user_id: user_id,
            });
            if (unpaidFines?.length > 0) {
                throw new userUnpaidFines_exception_1.UserUnpaidFines();
            }
            const date = new Date();
            date.setDate((date.getDate() +
                physicalBook.collection.amount_of_days_per_loan));
            const maxNumberOfCollection = physicalBook.collection
                .max_number_of_loans;
            const user_loans = await this.getLoanByUserID({
                id: user_id,
            });
            const userAmountOfLoansPerCollection = user_loans.filter((loan) => {
                return loan.physical_book.collection_id === physicalBook?.collection_id;
            }).length;
            if (userAmountOfLoansPerCollection > maxNumberOfCollection) {
                throw new maximumLoansPerCollection_exception_1.MaximumLoansPerCollection();
            }
            if (physicalBook) {
                await this.inventoryService.updateInventoryGivenSerialNumber({
                    where: {
                        physical_book_serial_number: physicalBook?.serial_number,
                    },
                    data: {
                        quantity: {
                            decrement: 1,
                        },
                        last_update: new Date(),
                    },
                });
                await this.physicalBookService.updatePhysicalBook({
                    where: {
                        barcode: physicalBook.barcode,
                    },
                    data: {
                        status: client_1.BookStatus.unavailable,
                    },
                });
            }
            const notificationDate = new Date(date);
            notificationDate.setDate(notificationDate.getDate() - 1);
            await this.notificationService.createNotification({
                message: 'You loan return date is coming soon!',
                title: 'Book Pal',
                next_schedule_date: notificationDate.toISOString(),
            });
            data.due_date = new Date(date);
            const loan = await this.prisma.loan.create({
                data,
            });
            return loan;
        }
        catch (error) {
            if (error instanceof genericError_exception_1.GenericError) {
                throw new genericError_exception_1.GenericError('LoanService', error.message, 'createLoan');
            }
            throw error;
        }
    }
    async updateLoan(params) {
        const { where, data } = params;
        try {
            return await this.prisma.loan.update({
                data,
                where,
            });
        }
        catch (error) {
            if (!(error instanceof userUnpaidFines_exception_1.UserUnpaidFines)) {
                throw new genericError_exception_1.GenericError('LoanService', error.message, 'updateLoan');
            }
            throw error;
        }
    }
    async returnLoan(id) {
        try {
            const loan = await this.loan({ id }, { Fine: true, physical_book: true });
            if (loan && loan.status === client_2.LoanStatus.returned) {
                throw new loanAlreadyReturned_exception_1.LoanAlreadyReturned();
            }
            const isAnyFineUnpaid = loan?.Fine.some((fine) => {
                return fine.status === client_1.FineStatus.unpaid;
            });
            if (isAnyFineUnpaid) {
                throw new userUnpaidFines_exception_1.UserUnpaidFines();
            }
            if (loan?.physical_book) {
                await this.inventoryService.updateInventoryGivenSerialNumber({
                    where: {
                        physical_book_serial_number: loan?.physical_book.serial_number,
                    },
                    data: {
                        quantity: {
                            increment: 1,
                        },
                        last_update: new Date(),
                    },
                });
                await this.physicalBookService.updatePhysicalBook({
                    where: {
                        barcode: loan?.physical_book.barcode,
                    },
                    data: {
                        status: client_1.BookStatus.available,
                    },
                });
            }
            return await this.updateLoan({
                where: { id },
                data: { status: client_2.LoanStatus.returned, return_date: new Date() },
            });
        }
        catch (error) {
            if (error instanceof genericError_exception_1.GenericError) {
                throw new genericError_exception_1.GenericError('LoanService', error.message, 'returnLoan');
            }
            throw error;
        }
    }
    async updateLoanStatus() {
        try {
            const loans = await this.prisma.loan.findMany({
                where: {
                    status: client_2.LoanStatus.active,
                },
                include: {
                    physical_book: {
                        include: {
                            collection: true,
                        },
                    },
                },
            });
            const today = new Date();
            for (const loan of loans) {
                const dueDate = new Date(loan.due_date);
                if (dueDate < today) {
                    await this.fineService.fine({
                        last_update_date: new Date(),
                        amount: loan.physical_book.collection?.amount_of_money_per_day,
                        user: {
                            connect: {
                                id: loan.user_id,
                            },
                        },
                        loan: {
                            connect: {
                                id: loan.id,
                            },
                        },
                        status: client_1.FineStatus.unpaid,
                    });
                    await this.updateLoan({
                        where: { id: loan.id },
                        data: { status: client_2.LoanStatus.overdue },
                    });
                }
            }
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('LoanService', error.message, 'updateLoanStatus');
        }
    }
    async getLoanByUserID(data) {
        try {
            const loans = await this.prisma.loan.findMany({
                where: data,
                include: {
                    physical_book: true,
                },
                orderBy: {
                    start_date: 'desc',
                },
            });
            const loans_book = await Promise.all(loans.map(async (loan) => {
                const physicalBook = await this.physicalBookService.physicalBook({
                    barcode: loan.physical_book_barcode,
                });
                return {
                    ...loan,
                    physical_book: physicalBook,
                };
            }));
            return loans_book;
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('LoanService', error.message, 'getLoanByUserID');
        }
    }
};
exports.LoanService = LoanService;
exports.LoanService = LoanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => fine_service_1.FineService))),
    __metadata("design:paramtypes", [fine_service_1.FineService,
        physicalBook_service_1.PhysicalBookService,
        reference_service_1.ReferenceService,
        inventory_service_1.InventoryService,
        notification_service_1.NotificationService,
        prisma_service_1.PrismaService])
], LoanService);
//# sourceMappingURL=loan.service.js.map