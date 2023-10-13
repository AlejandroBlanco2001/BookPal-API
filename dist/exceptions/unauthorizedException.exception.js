"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
class UnauthorizedException extends Error {
    constructor() {
        super(`User not found with the specified criteria`);
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=unauthorizedException.exception.js.map