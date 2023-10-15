"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUnpaidFines = void 0;
const common_1 = require("@nestjs/common");
class UserUnpaidFines extends common_1.HttpException {
    constructor() {
        super(`The user has unpaid fines and cannot borrow books until they are paid`, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UserUnpaidFines = UserUnpaidFines;
//# sourceMappingURL=userUnpaidFines.exception.js.map