"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalBookModule = void 0;
const common_1 = require("@nestjs/common");
const physicalBook_service_1 = require("./physicalBook.service");
const physicalBook_controller_1 = require("./physicalBook.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let PhysicalBookModule = class PhysicalBookModule {
};
exports.PhysicalBookModule = PhysicalBookModule;
exports.PhysicalBookModule = PhysicalBookModule = __decorate([
    (0, common_1.Module)({
        controllers: [physicalBook_controller_1.PhyiscalBookController],
        providers: [physicalBook_service_1.PhysicalBookService],
        imports: [prisma_module_1.PrismaModule],
        exports: [physicalBook_service_1.PhysicalBookService],
    })
], PhysicalBookModule);
//# sourceMappingURL=physicalBook.module.js.map