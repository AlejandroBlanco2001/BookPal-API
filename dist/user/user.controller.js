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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const client_1 = require("@prisma/client");
const custom_decorators_1 = require("../utils/custom_decorators");
const security_service_1 = require("../utils/security/security.service");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user-dto");
const update_user_dto_1 = require("./dto/update-user-dto");
const unauthorizedException_exception_1 = require("../exceptions/unauthorizedException.exception");
let UserController = UserController_1 = class UserController {
    constructor(userService, securityService) {
        this.userService = userService;
        this.securityService = securityService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async createUser(data) {
        const hashed_password = await this.securityService.hashPassword(data.password);
        const { company_id, ...rest } = data;
        const user = await this.userService.createUser({
            ...rest,
            company: {
                connect: {
                    id: company_id,
                },
            },
            password: hashed_password,
        });
        return user;
    }
    async getUserByID(id) {
        return await this.userService.user({ id: id });
    }
    async getUserByEmail(email) {
        return await this.userService.user({ email: email });
    }
    getUserProfile(req) {
        return req.user;
    }
    async updateUserByID(data, id) {
        const { password, ...user_info } = data;
        if (password) {
            if (user_info) {
                throw new unauthorizedException_exception_1.UnauthorizedException();
            }
            const hashed_password = await this.securityService.hashPassword(password);
            return await this.userService.updateUser({
                password: hashed_password,
            }, { id: id });
        }
        return await this.userService.updateUser({
            ...user_info,
        }, { id: id });
    }
    async updateUserByEmail(data, email) {
        return await this.userService.updateUser(data, { email: email });
    }
    async deleteUserByEmail(email) {
        return await this.userService.deleteUser({ email: email });
    }
    async softDeleteUserByID(id) {
        return await this.userService.softDeleteUser({ id: id });
    }
};
exports.UserController = UserController;
__decorate([
    (0, custom_decorators_1.Public)(),
    (0, common_1.Post)('/'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The user has been successfully created.',
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by ID' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByID", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by email' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByEmail", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the profile of the current logged user',
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Put)('id/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user by ID' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDTO, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserByID", null);
__decorate([
    (0, common_1.Put)('email/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user by email' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserByEmail", null);
__decorate([
    (0, common_1.Delete)('email/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user by email' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserByEmail", null);
__decorate([
    (0, common_1.Put)('soft-delete/id/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a user by ID' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "softDeleteUserByID", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        security_service_1.SecurityService])
], UserController);
//# sourceMappingURL=user.controller.js.map