"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyNotFound = void 0;
const common_1 = require("@nestjs/common");
class CompanyNotFound extends common_1.HttpException {
    constructor() {
        super(`Company not found with the specified criteria`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.CompanyNotFound = CompanyNotFound;
//# sourceMappingURL=companyNotFound.exception.js.map