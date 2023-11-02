"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FineNotFound = void 0;
const common_1 = require("@nestjs/common");
class FineNotFound extends common_1.HttpException {
    constructor() {
        super(`Fine not found with the specified criteria`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.FineNotFound = FineNotFound;
//# sourceMappingURL=fineNotFound.exception.js.map