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
const constant_1 = require("../utils/constant");
const genericError_exception_1 = require("../exceptions/genericError.exception");
let FineService = class FineService {
    constructor(loanService, prisma) {
        this.loanService = loanService;
        this.prisma = prisma;
    }
    async fine(data) {
        try {
            return this.prisma.fine.create({
                data,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('FineService', error.message, 'fine');
        }
    }
    async getFine(data) {
        let fine;
        try {
            fine = await this.prisma.fine.findUnique({ where: data });
            if (!fine) {
                return null;
            }
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('FineService', error.message, 'getFine');
        }
        return fine;
    }
    async getFinesByUserID(data, user_id) {
        let fines = [];
        try {
            const loans_user = await this.loanService.getLoanByUserID({
                user_id,
            });
            const loans_user_id = loans_user.map((loan) => loan.id);
            fines = await this.prisma.fine.findMany({
                where: {
                    AND: [
                        {
                            loan_id: {
                                in: loans_user_id,
                            },
                        },
                        data,
                    ],
                },
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('FineService', error.message, 'getFinesByUserID');
        }
        return fines;
    }
    async updateFine(params) {
        const { where, data } = params;
        try {
            return this.prisma.fine.update({
                data,
                where,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('FineService', error.message, 'updateFine');
        }
    }
    async updateFineAmountToPay() {
        const fines = await this.prisma.fine.findMany({
            where: {
                status: client_1.FineStatus.unpaid,
                last_update_date: {
                    gt: new Date(),
                },
            },
        });
        const date = new Date();
        fines.forEach(async (fine) => {
            const loan = await this.loanService.loan({ id: fine.loan_id });
            const due_date = new Date(loan.due_date);
            const diffTime = Math.ceil(Math.abs(due_date.getTime() - date.getTime()) / constant_1.ONE_DAY_IN_MILLISECONDS);
            if (diffTime > 0) {
                await this.updateFine({
                    where: { id: fine.id },
                    data: {
                        status: client_1.FineStatus.unpaid,
                        amount: fine.amount * diffTime,
                        last_update_date: new Date(),
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