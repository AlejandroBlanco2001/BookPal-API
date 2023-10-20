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
exports.HistoryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const history_service_1 = require("./history.service");
const company_guard_1 = require("../company/company.guard");
let HistoryController = class HistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    getHistory() {
        return this.historyService.history();
    }
};
exports.HistoryController = HistoryController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all history' }),
    (0, common_1.UseGuards)(company_guard_1.CompanyGuard),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HistoryController.prototype, "getHistory", null);
exports.HistoryController = HistoryController = __decorate([
    (0, swagger_1.ApiTags)('history'),
    (0, common_1.Controller)('history'),
    __metadata("design:paramtypes", [history_service_1.HistoryService])
], HistoryController);
//# sourceMappingURL=history.controller.js.map