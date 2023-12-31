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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const userNotFound_exception_1 = require("../exceptions/userNotFound.exception");
const genericError_exception_1 = require("../exceptions/genericError.exception");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async user(userWhereUniqueInput) {
        const user = await this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
        if (!user) {
            throw new userNotFound_exception_1.UserNotFoundException(userWhereUniqueInput);
        }
        return user;
    }
    async updateUser(data, filter) {
        try {
            return await this.prisma.user.update({
                data,
                where: filter,
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new userNotFound_exception_1.UserNotFoundException(filter);
                }
            }
            throw error;
        }
    }
    async createUser(data) {
        try {
            const user = await this.prisma.user.create({
                data,
            });
            return user;
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('UserService', error, 'createUser');
        }
    }
    async deleteUser(where) {
        try {
            return await this.prisma.user.delete({
                where,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('UserService', error, 'deleteUser');
        }
    }
    async softDeleteUser(where) {
        try {
            return await this.prisma.user.update({
                data: {
                    deleted_at: new Date(),
                    is_deleted: true,
                },
                where,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('UserService', error, 'softDeleteUser');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map