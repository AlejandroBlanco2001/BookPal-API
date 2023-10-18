"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanNotFound = void 0;
const common_1 = require("@nestjs/common");
class LoanNotFound extends common_1.HttpException {
    constructor(filter) {
        super(`Loan not found with the specified criteria ${filter.id ? filter.id : ''}`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.LoanNotFound = LoanNotFound;
//# sourceMappingURL=loanNotFound.exceptions.js.map