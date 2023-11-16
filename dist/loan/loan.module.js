"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanModule = void 0;
const common_1 = require("@nestjs/common");
const loan_controller_1 = require("./loan.controller");
const loan_service_1 = require("./loan.service");
const prisma_module_1 = require("../prisma/prisma.module");
const reference_service_1 = require("../reference/reference.service");
const inventory_service_1 = require("../inventory/inventory.service");
const notification_module_1 = require("../notification/notification.module");
const fine_module_1 = require("../fine/fine.module");
const physicalBook_module_1 = require("../physicalBook/physicalBook.module");
let LoanModule = class LoanModule {
};
exports.LoanModule = LoanModule;
exports.LoanModule = LoanModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, notification_module_1.NotificationModule, fine_module_1.FineModule, physicalBook_module_1.PhysicalBookModule],
        controllers: [loan_controller_1.LoanController],
        providers: [loan_service_1.LoanService, reference_service_1.ReferenceService, inventory_service_1.InventoryService],
        exports: [loan_service_1.LoanService],
    })
], LoanModule);
//# sourceMappingURL=loan.module.js.map