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
exports.LoanController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const loan_service_1 = require("./loan.service");
const create_loan_dto_1 = require("./dto/create-loan-dto");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
let LoanController = class LoanController {
    constructor(loanService) {
        this.loanService = loanService;
    }
    getLoanByID(id) {
        return this.loanService.loan({ id: Number(id) });
    }
    getUserLoans(id) {
        return this.loanService.getLoanByUserID({ user_id: Number(id) });
    }
    async createLoan(req, createLoanDto) {
        const data = {
            status: client_1.LoanStatus.active,
            start_date: new Date(),
            user: {
                connect: {
                    id: req.user.id,
                },
            },
            physical_book: {
                connect: {
                    barcode: createLoanDto.physical_book_barcode,
                },
            },
        };
        return await this.loanService.createLoan(req.user.id, createLoanDto.phone_token, data);
    }
    returnLoan(id) {
        return this.loanService.updateLoan({
            where: { id: Number(id) },
            data: {
                return_date: new Date(),
                status: client_1.LoanStatus.returned,
            },
        });
    }
};
exports.LoanController = LoanController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a loan by ID' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoanController.prototype, "getLoanByID", null);
__decorate([
    (0, common_1.Get)('/user/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a user loans' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoanController.prototype, "getUserLoans", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new loan' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_loan_dto_1.CreateLoanDto]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "createLoan", null);
__decorate([
    (0, common_1.Put)('return/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Return a loan' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoanController.prototype, "returnLoan", null);
exports.LoanController = LoanController = __decorate([
    (0, swagger_1.ApiTags)('loan'),
    (0, common_1.Controller)('loan'),
    __metadata("design:paramtypes", [loan_service_1.LoanService])
], LoanController);
//# sourceMappingURL=loan.controller.js.map