"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FineModule = void 0;
const common_1 = require("@nestjs/common");
const fine_service_1 = require("./fine.service");
const prisma_module_1 = require("../prisma/prisma.module");
const loan_service_1 = require("../loan/loan.service");
const reference_service_1 = require("../reference/reference.service");
const inventory_service_1 = require("../inventory/inventory.service");
const notification_module_1 = require("../notification/notification.module");
const physicalBook_module_1 = require("../physicalBook/physicalBook.module");
const company_service_1 = require("../company/company.service");
const security_module_1 = require("../utils/security/security.module");
let FineModule = class FineModule {
};
exports.FineModule = FineModule;
exports.FineModule = FineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            notification_module_1.NotificationModule,
            physicalBook_module_1.PhysicalBookModule,
            security_module_1.SecurityModule,
        ],
        providers: [
            fine_service_1.FineService,
            loan_service_1.LoanService,
            reference_service_1.ReferenceService,
            inventory_service_1.InventoryService,
            company_service_1.CompanyService,
        ],
        exports: [fine_service_1.FineService],
    })
], FineModule);
//# sourceMappingURL=fine.module.js.map