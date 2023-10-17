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
exports.PhyiscalBookController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const physicalBook_service_1 = require("./physicalBook.service");
const client_1 = require("@prisma/client");
const custom_decorators_1 = require("../utils/custom_decorators");
const swagger_1 = require("@nestjs/swagger");
let PhyiscalBookController = class PhyiscalBookController {
    constructor(physicalBookService) {
        this.physicalBookService = physicalBookService;
    }
    getPhysicalBookByBarcode(barcode) {
        return this.physicalBookService.physicalBook({ barcode: barcode });
    }
    getPhysicalBookByID(id) {
        return this.physicalBookService.physicalBook({ id: Number(id) });
    }
    getPhysicalBooks(query) {
        return this.physicalBookService.physicalBooks(query);
    }
};
exports.PhyiscalBookController = PhyiscalBookController;
__decorate([
    (0, custom_decorators_1.Public)(),
    (0, common_1.Get)(':barcode'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a physical book by barcode' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PhyiscalBookController.prototype, "getPhysicalBookByBarcode", null);
__decorate([
    (0, custom_decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a physical book by ID' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PhyiscalBookController.prototype, "getPhysicalBookByID", null);
__decorate([
    (0, custom_decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all physical books' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhyiscalBookController.prototype, "getPhysicalBooks", null);
exports.PhyiscalBookController = PhyiscalBookController = __decorate([
    (0, swagger_1.ApiTags)('physical-book'),
    (0, common_1.Controller)('physical-book'),
    __metadata("design:paramtypes", [physicalBook_service_1.PhysicalBookService])
], PhyiscalBookController);
//# sourceMappingURL=physicalBook.controller.js.map