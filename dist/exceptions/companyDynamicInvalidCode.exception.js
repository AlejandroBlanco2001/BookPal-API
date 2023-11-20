"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyDynamicCodeNotValid = void 0;
const common_1 = require("@nestjs/common");
class CompanyDynamicCodeNotValid extends common_1.HttpException {
    constructor() {
        super(`The dynamic code is invalid for that company`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.CompanyDynamicCodeNotValid = CompanyDynamicCodeNotValid;
//# sourceMappingURL=companyDynamicInvalidCode.exception.js.map