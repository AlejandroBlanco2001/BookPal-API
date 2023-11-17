"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanAlreadyReturned = void 0;
const common_1 = require("@nestjs/common");
class LoanAlreadyReturned extends common_1.HttpException {
    constructor() {
        super(`ERROR: Loan has already been returned.`, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.LoanAlreadyReturned = LoanAlreadyReturned;
//# sourceMappingURL=loanAlreadyReturned.exception.js.map