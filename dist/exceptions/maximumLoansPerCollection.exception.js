"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaximumLoansPerCollection = void 0;
const common_1 = require("@nestjs/common");
class MaximumLoansPerCollection extends common_1.HttpException {
    constructor() {
        super(`The user has reached the maximum number of loans for this collection`, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.MaximumLoansPerCollection = MaximumLoansPerCollection;
//# sourceMappingURL=maximumLoansPerCollection.exception.js.map