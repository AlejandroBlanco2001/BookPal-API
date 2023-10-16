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
let LoanService = class LoanService {
    constructor(fineService, physicalBookService, referenceService, prisma) {
        this.fineService = fineService;
        this.physicalBookService = physicalBookService;
        this.referenceService = referenceService;
        this.prisma = prisma;
    }
    async loan(loanWhereUniqueInput) {
        return this.prisma.loan.findUnique({
            where: loanWhereUniqueInput,
        });
    }
    async createLoan(user_id, data) {
        const unpaidFines = await this.fineService.getFinesByUserID({
            id: user_id,
            status: client_1.FineStatus.unpaid,
        });
        if (unpaidFines.length > 0) {
            throw new userUnpaidFines_exception_1.UserUnpaidFines();
        }
        return this.prisma.loan.create({
            data,
        });
    }
    async updateLoan(params) {
        const { where, data } = params;
        return this.prisma.loan.update({
            data,
            where,
        });
    }
    async updateLoanStatus() {
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
                id: physicalBook.reference_id,
            });
            if (dueDate < today && loan.status === client_2.LoanStatus.active) {
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
};
exports.LoanService = LoanService;
exports.LoanService = LoanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => fine_service_1.FineService))),
    __metadata("design:paramtypes", [fine_service_1.FineService,
        physicalBook_service_1.PhysicalBookService,
        reference_service_1.ReferenceService,
        prisma_service_1.PrismaService])
], LoanService);
//# sourceMappingURL=loan.service.js.map