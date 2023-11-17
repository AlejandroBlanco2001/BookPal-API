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
    async loan(loanWhereUniqueInput) {
        const loan = await this.prisma.loan.findUnique({
            where: loanWhereUniqueInput,
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
    async createLoan(user_id, user_token, data) {
        try {
            const physicalBook = await this.physicalBookService.physicalBook({
                barcode: data.physical_book.connect?.barcode,
            });
            if (physicalBook?.status === client_1.BookStatus.unavailable) {
                throw new physicalBookNotAvailable_exception_1.PhysicalBookNotAvailable(data.physical_book.connect?.barcode);
            }
            const unpaidFines = await this.fineService.getFinesByUserID({
                status: client_1.FineStatus.unpaid,
            }, user_id);
            if (unpaidFines?.length > 0) {
                throw new userUnpaidFines_exception_1.UserUnpaidFines();
            }
            const due_date = await this.referenceService.getDueDate({
                id: physicalBook?.collection_id,
            });
            const max_number_of_collection = await this.referenceService.getMaxLoans({
                id: physicalBook?.collection_id,
            });
            const user_loans = await this.getLoanByUserID({
                id: user_id,
            });
            const user_loans_barcode = user_loans.map((loan) => loan.physical_book_barcode);
            const user_loans_books = await this.physicalBookService.physicalBooks({
                where: {
                    serial_number: {
                        in: user_loans_barcode,
                    },
                    collection_id: physicalBook?.collection_id,
                },
            });
            if (user_loans_books?.length > max_number_of_collection) {
                throw new maximumLoansPerCollection_exception_1.MaximumLoansPerCollection();
            }
            const inventory = await this.inventoryService.inventoryByPhyiscalSerialNumber({
                physical_book_serial_number: physicalBook?.serial_number,
            });
            if (inventory && physicalBook) {
                await this.inventoryService.updateInventory({
                    where: {
                        id: inventory.id,
                    },
                    data: {
                        quantity: inventory.quantity - 1,
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
            const notificationDate = new Date(due_date);
            notificationDate.setDate(notificationDate.getDate() - 1);
            await this.notificationService.createNotification({
                message: 'You loan return date is coming soon!',
                title: 'Book Pal',
                next_schedule_date: notificationDate.toISOString(),
            });
            data.due_date = new Date(due_date);
            const loan = await this.prisma.loan.create({
                data,
            });
            return {
                ...loan,
                physical_book: physicalBook,
            };
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
            const loan = await this.loan({ id });
            if (loan && loan.status === client_2.LoanStatus.returned) {
                throw new loanAlreadyReturned_exception_1.LoanAlreadyReturned();
            }
            const fine = await this.fineService.getFines({
                loan_id: id,
                status: client_1.FineStatus.unpaid,
            });
            if (fine) {
                throw new userUnpaidFines_exception_1.UserUnpaidFines();
            }
            const physicalBook = await this.physicalBookService.physicalBook({
                barcode: loan.physical_book_barcode,
            });
            const inventory = await this.inventoryService.inventoryByPhyiscalSerialNumber({
                physical_book_serial_number: physicalBook.serial_number,
            });
            if (inventory && physicalBook) {
                await this.inventoryService.updateInventory({
                    where: {
                        id: inventory.id,
                    },
                    data: {
                        quantity: inventory.quantity + 1,
                        last_update: new Date(),
                    },
                });
                await this.physicalBookService.updatePhysicalBook({
                    where: {
                        barcode: physicalBook.barcode,
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
            });
            const today = new Date();
            loans.forEach(async (loan) => {
                const dueDate = new Date(loan.due_date);
                const physicalBook = await this.physicalBookService.physicalBook({
                    barcode: loan.physical_book_barcode,
                });
                const collection = await this.referenceService.reference({
                    id: physicalBook.collection_id,
                });
                if (dueDate < today) {
                    await this.fineService.fine({
                        last_update_date: new Date(),
                        amount: collection?.amount_of_money_per_day,
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
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('LoanService', error.message, 'updateLoanStatus');
        }
    }
    async getLoanByUserID(data) {
        try {
            const loans = await this.prisma.loan.findMany({
                where: data,
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