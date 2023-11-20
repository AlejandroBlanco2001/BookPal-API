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
var CompanyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const companyNotFound_exception_1 = require("../exceptions/companyNotFound.exception");
const genericError_exception_1 = require("../exceptions/genericError.exception");
const services_1 = require("@nestjs/common/services");
const security_service_1 = require("../utils/security/security.service");
let CompanyService = CompanyService_1 = class CompanyService {
    constructor(prisma, securityService) {
        this.prisma = prisma;
        this.securityService = securityService;
        this.logger = new services_1.Logger(CompanyService_1.name);
    }
    async updateCompany(params) {
        const { where, data } = params;
        try {
            return await this.prisma.company.update({
                data,
                where,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('CompanyService', error.message, 'updateCompany');
        }
    }
    async company(companyWhereUniqueInput) {
        const company = await this.prisma.company.findUnique({
            where: companyWhereUniqueInput,
        });
        if (!company) {
            throw new companyNotFound_exception_1.CompanyNotFound();
        }
        return company;
    }
    async companies() {
        try {
            return await this.prisma.company.findMany();
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('CompanyService', error.message, 'companies');
        }
    }
    async updateDynamicCode() {
        const companies = await this.prisma.company.findMany();
        for (const company of companies) {
            const dynamicCode = this.securityService.generateRandomDynamicCode();
            await this.prisma.company.update({
                data: {
                    dynamic_code_return: dynamicCode,
                },
                where: {
                    id: company.id,
                },
            });
        }
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = CompanyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        security_service_1.SecurityService])
], CompanyService);
//# sourceMappingURL=company.service.js.map