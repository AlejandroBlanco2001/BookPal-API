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
const physicalBook_service_1 = require("../physicalBook/physicalBook.service");
const reference_service_1 = require("../reference/reference.service");
let FineModule = class FineModule {
};
exports.FineModule = FineModule;
exports.FineModule = FineModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [fine_service_1.FineService, loan_service_1.LoanService, physicalBook_service_1.PhysicalBookService, reference_service_1.ReferenceService],
        exports: [fine_service_1.FineService],
    })
], FineModule);
//# sourceMappingURL=fine.module.js.map