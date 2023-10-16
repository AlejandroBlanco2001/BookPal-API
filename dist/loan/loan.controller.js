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
const common_1 = require("@nestjs/common");
const loan_service_1 = require("./loan.service");
const create_loan_dto_1 = require("./dto/create-loan-dto");
const client_1 = require("@prisma/client");
const reference_service_1 = require("../reference/reference.service");
let LoanController = class LoanController {
    constructor(loanService, referenceService) {
        this.loanService = loanService;
        this.referenceService = referenceService;
    }
    getLoanByID(id) {
        return this.loanService.loan({ id: Number(id) });
    }
    async createLoan(req, createLoanDto) {
        const due_date = await this.referenceService.getDueDate({
            reference_name: createLoanDto.physical_book_collection_name,
        });
        const data = {
            status: client_1.LoanStatus.active,
            start_date: new Date(),
            due_date: due_date,
            user: {
                connect: {
                    id: req.user.id,
                },
            },
            user_id: req.user.id,
            physical_book: {
                connect: {
                    id: createLoanDto.physical_book_barcode,
                },
            },
            physical_book_barcode: createLoanDto.physical_book_barcode,
        };
        return await this.loanService.createLoan(req.user.id, data);
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
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoanController.prototype, "getLoanByID", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_loan_dto_1.CreateLoanDto]),
    __metadata("design:returntype", Promise)
], LoanController.prototype, "createLoan", null);
__decorate([
    (0, common_1.Put)('return/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoanController.prototype, "returnLoan", null);
exports.LoanController = LoanController = __decorate([
    (0, common_1.Controller)('loan'),
    __metadata("design:paramtypes", [loan_service_1.LoanService,
        reference_service_1.ReferenceService])
], LoanController);
//# sourceMappingURL=loan.controller.js.map