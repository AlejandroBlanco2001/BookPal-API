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
var CronjobsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const loan_service_1 = require("../loan/loan.service");
const fine_service_1 = require("../fine/fine.service");
const EVERY_10_MINUTES_BETWEEN_7AM_AND_8PM = '0 */10 7-19 * * *';
let CronjobsService = CronjobsService_1 = class CronjobsService {
    constructor(loanService, fineService) {
        this.loanService = loanService;
        this.fineService = fineService;
        this.logger = new common_1.Logger(CronjobsService_1.name);
    }
    updateLoanStatus() {
        this.logger.debug('Updating loan status...');
        try {
            this.loanService.updateLoanStatus();
        }
        catch (err) {
            console.log(err);
        }
        this.logger.log('Finished updating loan status.');
    }
    updateFineAmountToPay() {
        this.logger.debug('Updating fine amount to pay...');
        try {
            this.fineService.updateFineAmountToPay();
        }
        catch (err) {
            console.log(err);
        }
        this.logger.debug('Finished updating fine amount to pay.');
    }
};
exports.CronjobsService = CronjobsService;
__decorate([
    (0, schedule_1.Cron)(EVERY_10_MINUTES_BETWEEN_7AM_AND_8PM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CronjobsService.prototype, "updateLoanStatus", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CronjobsService.prototype, "updateFineAmountToPay", null);
exports.CronjobsService = CronjobsService = CronjobsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [loan_service_1.LoanService,
        fine_service_1.FineService])
], CronjobsService);
//# sourceMappingURL=cronjobs.service.js.map