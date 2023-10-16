"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const physicalBook_controller_1 = require("./physicalBook/physicalBook.controller");
const physicalBook_service_1 = require("./physicalBook/physicalBook.service");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_module_1 = require("./prisma/prisma.module");
const physicalBook_module_1 = require("./physicalBook/physicalBook.module");
const user_module_1 = require("./user/user.module");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_guard_guard_1 = require("./auth/jwt-guard.guard");
const security_module_1 = require("./utils/security/security.module");
const config_1 = require("@nestjs/config");
const company_module_1 = require("./company/company.module");
const loan_module_1 = require("./loan/loan.module");
const schedule_1 = require("@nestjs/schedule");
const cronjobs_module_1 = require("./cronjobs/cronjobs.module");
const fine_module_1 = require("./fine/fine.module");
const reference_service_1 = require("./reference/reference.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            physicalBook_module_1.PhysicalBookModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            security_module_1.SecurityModule,
            company_module_1.CompanyModule,
            loan_module_1.LoanModule,
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot(),
            cronjobs_module_1.CronjobsModule,
            fine_module_1.FineModule,
        ],
        controllers: [app_controller_1.AppController, physicalBook_controller_1.PhyiscalBookController, user_controller_1.UserController],
        providers: [
            app_service_1.AppService,
            physicalBook_service_1.PhysicalBookService,
            user_service_1.UserService,
            prisma_service_1.PrismaService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_guard_1.JwtAuthGuard,
            },
            reference_service_1.ReferenceService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map