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
exports.CompanyController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const company_service_1 = require("./company.service");
const company_guard_1 = require("./company.guard");
const swagger_1 = require("@nestjs/swagger");
const update_company_dto_1 = require("./dto/update-company-dto");
const history_service_1 = require("../history/history.service");
let CompanyController = class CompanyController {
    constructor(companyService, history) {
        this.companyService = companyService;
        this.history = history;
    }
    async updateCompany(req, id, updateCompanyDto) {
        const company = await this.companyService.updateCompany({
            where: { id: id },
            data: updateCompanyDto,
        });
        this.history.createHistoryPoint({
            action: 'update',
            model_name: 'company',
            model_id: company.id,
            user: req.user.id,
            date: new Date(),
            data: JSON.stringify(updateCompanyDto),
        });
        return company;
    }
    getCompany(id) {
        return this.companyService.company({ id: id });
    }
    getCompanies() {
        return this.companyService.companies();
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.UseGuards)(company_guard_1.CompanyGuard),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a company' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_company_dto_1.UpdateCompanyDTO]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a company by ID' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "getCompany", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all companies' }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "getCompanies", null);
exports.CompanyController = CompanyController = __decorate([
    (0, swagger_1.ApiTags)('company'),
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService,
        history_service_1.HistoryService])
], CompanyController);
//# sourceMappingURL=company.controller.js.map