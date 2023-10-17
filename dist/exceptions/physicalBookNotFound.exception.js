"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalBookNotFound = void 0;
const common_1 = require("@nestjs/common");
class PhysicalBookNotFound extends common_1.HttpException {
    constructor(filter) {
        super(`Physical Book not found with the specified criteria ${filter}`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.PhysicalBookNotFound = PhysicalBookNotFound;
//# sourceMappingURL=physicalBookNotFound.exception.js.map