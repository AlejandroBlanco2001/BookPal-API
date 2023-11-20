"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobsModule = void 0;
const common_1 = require("@nestjs/common");
const cronjobs_service_1 = require("./cronjobs.service");
const loan_module_1 = require("../loan/loan.module");
const fine_module_1 = require("../fine/fine.module");
const notification_module_1 = require("../notification/notification.module");
const company_module_1 = require("../company/company.module");
const security_module_1 = require("../utils/security/security.module");
let CronjobsModule = class CronjobsModule {
};
exports.CronjobsModule = CronjobsModule;
exports.CronjobsModule = CronjobsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            loan_module_1.LoanModule,
            fine_module_1.FineModule,
            notification_module_1.NotificationModule,
            company_module_1.CompanyModule,
            security_module_1.SecurityModule,
        ],
        providers: [cronjobs_service_1.CronjobsService],
    })
], CronjobsModule);
//# sourceMappingURL=cronjobs.module.js.map