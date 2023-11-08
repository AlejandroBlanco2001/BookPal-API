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
exports.PhysicalBookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const physicalBookNotFound_exception_1 = require("../exceptions/physicalBookNotFound.exception");
const genericError_exception_1 = require("../exceptions/genericError.exception");
let PhysicalBookService = class PhysicalBookService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPhysicalBook(data) {
        try {
            return this.prisma.physicalBook.create({
                data,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('PhysicalBookService', error.message, 'createPhysicalBook');
        }
    }
    async updatePhysicalBook(params) {
        const { where, data } = params;
        try {
            return this.prisma.physicalBook.update({
                data,
                where,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('PhysicalBookService', error.message, 'updatePhysicalBook');
        }
    }
    async physicalBook(physicalBookWhereUniqueInput) {
        try {
            return this.prisma.physicalBook.findUnique({
                where: physicalBookWhereUniqueInput,
            });
        }
        catch (error) {
            throw new physicalBookNotFound_exception_1.PhysicalBookNotFound(physicalBookWhereUniqueInput);
        }
    }
    async physicalBooks(params) {
        let { skip, take } = params;
        const { where, orderBy } = params;
        skip = Number(skip) || 0;
        take = Number(take) || 10;
        try {
            return this.prisma.physicalBook.findMany({
                where,
                skip,
                take,
                orderBy,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('PhysicalBookService', error.message, 'physicalBooks');
        }
    }
};
exports.PhysicalBookService = PhysicalBookService;
exports.PhysicalBookService = PhysicalBookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhysicalBookService);
//# sourceMappingURL=physicalBook.service.js.map