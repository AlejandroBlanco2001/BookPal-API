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
const notification_service_1 = require("../notification/notification.service");
const fine_service_1 = require("../fine/fine.service");
let CronjobsService = CronjobsService_1 = class CronjobsService {
    constructor(loanService, fineService, notificationService) {
        this.loanService = loanService;
        this.fineService = fineService;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger(CronjobsService_1.name);
    }
    async updateLoanStatus() {
        this.logger.debug('Updating loan status...');
        try {
            await this.loanService.updateLoanStatus();
        }
        catch (err) {
            this.logger.error(err);
        }
        this.logger.log('Finished updating loan status.');
    }
    async updateFineAmountToPay() {
        this.logger.debug('Updating fine amount to pay...');
        try {
            await this.fineService.updateFineAmountToPay();
        }
        catch (err) {
            this.logger.error(err);
        }
        this.logger.debug('Finished updating fine amount to pay.');
    }
    async sendNotifications() {
        this.logger.debug('Sending notifications...');
        try {
        }
        catch (err) {
            this.logger.error(err);
        }
        this.logger.debug('Finished sending notifications.');
    }
};
exports.CronjobsService = CronjobsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronjobsService.prototype, "updateLoanStatus", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronjobsService.prototype, "updateFineAmountToPay", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronjobsService.prototype, "sendNotifications", null);
exports.CronjobsService = CronjobsService = CronjobsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [loan_service_1.LoanService,
        fine_service_1.FineService,
        notification_service_1.NotificationService])
], CronjobsService);
//# sourceMappingURL=cronjobs.service.js.map