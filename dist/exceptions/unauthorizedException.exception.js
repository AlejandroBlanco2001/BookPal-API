"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const common_1 = require("@nestjs/common");
class UnauthorizedException extends common_1.HttpException {
    constructor() {
        super(`User not found with the specified criteria`, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=unauthorizedException.exception.js.map