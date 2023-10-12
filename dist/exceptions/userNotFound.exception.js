"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
class UserNotFoundException extends Error {
    constructor(userWhereUniqueInput) {
        super(`User not found with the specified criteria: ${JSON.stringify(userWhereUniqueInput)}`);
        this.name = 'UserNotFoundException';
    }
}
exports.UserNotFoundException = UserNotFoundException;
//# sourceMappingURL=userNotFound.exception.js.map