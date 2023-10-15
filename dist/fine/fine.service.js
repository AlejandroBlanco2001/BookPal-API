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
exports.FineService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const loan_service_1 = require("../loan/loan.service");
const prisma_service_1 = require("../prisma/prisma.service");
let FineService = class FineService {
    constructor(loanService, prisma) {
        this.loanService = loanService;
        this.prisma = prisma;
    }
    async fine(data) {
        return this.prisma.fine.create({
            data,
        });
    }
    async getFineByLoanID(data) {
        return this.prisma.fine.findUnique({
            where: data,
        });
    }
    async getFinesByUserID(data) {
        return this.prisma.fine.findMany({
            where: data,
        });
    }
    async updateFine(params) {
        const { where, data } = params;
        return this.prisma.fine.update({
            data,
            where,
        });
    }
    async updateFineAmountToPay() {
        const fines = await this.prisma.fine.findMany({
            where: {
                status: client_1.FineStatus.unpaid,
            },
        });
        const date = new Date();
        fines.forEach(async (fine) => {
            const loan = await this.loanService.loan({ id: fine.loan_id });
            const due_date = new Date(loan.due_date);
            const oneDay = 24 * 60 * 60 * 1000;
            const diffTime = Math.floor(Math.abs(due_date.getTime() - date.getTime()) / oneDay);
            if (due_date < date) {
                await this.updateFine({
                    where: { id: fine.id },
                    data: {
                        status: client_1.FineStatus.unpaid,
                        amount: fine.amount + diffTime * 1000,
                    },
                });
            }
        });
    }
};
exports.FineService = FineService;
exports.FineService = FineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => loan_service_1.LoanService))),
    __metadata("design:paramtypes", [loan_service_1.LoanService,
        prisma_service_1.PrismaService])
], FineService);
//# sourceMappingURL=fine.service.js.map