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
const book_controller_1 = require("./book/book.controller");
const book_service_1 = require("./book/book.service");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_module_1 = require("./prisma/prisma.module");
const book_module_1 = require("./book/book.module");
const user_module_1 = require("./user/user.module");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, book_module_1.BookModule, user_module_1.UserModule],
        controllers: [app_controller_1.AppController, book_controller_1.BookController, user_controller_1.UserController],
        providers: [app_service_1.AppService, book_service_1.BookService, user_service_1.UserService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map