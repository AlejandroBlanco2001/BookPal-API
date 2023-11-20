"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
let SecurityService = class SecurityService {
    async hashPassword(password) {
        return await argon2.hash(password);
    }
    async verifyPassword(password, hash) {
        return await argon2.verify(hash, password);
    }
    generateRandomDynamicCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = __decorate([
    (0, common_1.Injectable)()
], SecurityService);
//# sourceMappingURL=security.service.js.map