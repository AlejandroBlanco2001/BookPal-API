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
exports.ReferenceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReferenceService = class ReferenceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async reference(referenceWhereUniqueInput) {
        return this.prisma.reference.findUnique({
            where: referenceWhereUniqueInput,
        });
    }
    async getDueDate(referenceWhereUniqueInput) {
        const reference = await this.prisma.reference.findUnique({
            where: referenceWhereUniqueInput,
        });
        const date = new Date();
        date.setDate(date.getDate() + reference.amount_of_days_per_loan);
        return date;
    }
};
exports.ReferenceService = ReferenceService;
exports.ReferenceService = ReferenceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReferenceService);
//# sourceMappingURL=reference.service.js.map