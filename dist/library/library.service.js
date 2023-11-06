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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryService = void 0;
const common_1 = require("@nestjs/common");
const fine_service_1 = require("../fine/fine.service");
const loan_service_1 = require("../loan/loan.service");
let LibraryService = class LibraryService {
    constructor(fineService, loanService) {
        this.fineService = fineService;
        this.loanService = loanService;
    }
    async getFinesByUserID(where, user_id) {
        const fines = await this.fineService.getFinesByUserID(where, user_id);
        return fines;
    }
    async getFine(where) {
        const fine = await this.fineService.getFine(where);
        return fine;
    }
    async fine(data) {
        const fine = await this.fineService.fine(data);
        return fine;
    }
    async getLoanByUserID(where) {
        const loans = await this.loanService.getLoanByUserID(where);
        return loans;
    }
    async loan(where) {
        const loan = await this.loanService.loan(where);
        return loan;
    }
};
exports.LibraryService = LibraryService;
exports.LibraryService = LibraryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [fine_service_1.FineService,
        loan_service_1.LoanService])
], LibraryService);
//# sourceMappingURL=library.service.js.map