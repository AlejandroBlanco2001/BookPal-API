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
var InventoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const genericError_exception_1 = require("../exceptions/genericError.exception");
const prisma_service_1 = require("../prisma/prisma.service");
let InventoryService = InventoryService_1 = class InventoryService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(InventoryService_1.name);
    }
    async inventory() {
        try {
            return this.prisma.inventory.findMany();
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('InventoryService', error.message, 'inventory');
        }
    }
    async inventoryByPhyiscalBookId(physicalBookId) {
        try {
            return this.prisma.inventory.findMany({
                where: {
                    physical_book_serial_number: physicalBookId,
                },
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new genericError_exception_1.GenericError('InventoryService', error.message, 'inventoryByPhyiscalBookId');
        }
    }
    async createInventory(data) {
        try {
            return this.prisma.inventory.create({
                data,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('InventoryService', error.message, 'createInventory');
        }
    }
    async updateInventory(params) {
        const { where, data } = params;
        try {
            return await this.prisma.inventory.update({
                data,
                where,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('InventoryService', error.message, 'updateInventory');
        }
    }
    async updateInventoryGivenSerialNumber(params) {
        const { where, data } = params;
        try {
            return await this.prisma.inventory.updateMany({
                data,
                where,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('InventoryService', error.message, 'updateInventory');
        }
    }
    async isPhysicalBookAvailable(where) {
        try {
            const inventory = await this.prisma.inventory.findFirst({
                where,
            });
            return (inventory.quantity > 0 &&
                inventory.quantity - 1 > inventory.minimum_quantity);
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('InventoryService', error.message, 'isPhysicalBookAvailable');
        }
    }
    async inventoryByPhyiscalSerialNumber(where) {
        try {
            return this.prisma.inventory.findFirstOrThrow({
                where,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('InventoryService', error.message, 'inventoryByPhyiscalSerialNumber');
        }
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = InventoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map