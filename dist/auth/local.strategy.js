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
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const unauthorizedException_exception_1 = require("../exceptions/unauthorizedException.exception");
const auth_service_1 = require("./auth.service");
const services_1 = require("@nestjs/common/services");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
        this.authService = authService;
        this.logger = new services_1.Logger(passport_1.PassportStrategy.name);
    }
    async validate(username, password) {
        const user = await this.authService.validateUser(username, password);
        this.logger.log(`An user is trying to login with ${username} and ${password}`);
        if (!user) {
            this.logger.error('User not found with email: ' + username + ' and password: ' + password);
            throw new unauthorizedException_exception_1.UnauthorizedException();
        }
        this.logger.log('User found: ' + JSON.stringify(user));
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LocalStrategy);
//# sourceMappingURL=local.strategy.js.map