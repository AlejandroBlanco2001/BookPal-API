"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class UserNotFoundException extends common_1.HttpException {
    constructor(userWhereUniqueInput) {
        super(`User not found with the specified criteria: ${JSON.stringify(userWhereUniqueInput)}`, common_1.HttpStatus.NOT_FOUND);
        this.name = 'UserNotFoundException';
    }
}
exports.UserNotFoundException = UserNotFoundException;
//# sourceMappingURL=userNotFound.exception.js.map