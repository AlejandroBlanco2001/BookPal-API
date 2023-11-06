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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const security_service_1 = require("../utils/security/security.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, securityService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.securityService = securityService;
    }
    async validateUser(email, password) {
        const user = await this.userService.user({ email });
        const isPasswordValid = await this.securityService.verifyPassword(password, user?.password ?? '');
        if (user && isPasswordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = {
            id: user.id,
            email: user.email,
            is_admin: user.is_admin,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_image: user.profile_image,
        };
        return {
            access_token: await this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        security_service_1.SecurityService])
], AuthService);
//# sourceMappingURL=auth.service.js.map