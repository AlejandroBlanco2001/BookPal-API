"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceNotFound = void 0;
const common_1 = require("@nestjs/common");
class ReferenceNotFound extends common_1.HttpException {
    constructor(filter) {
        super(`Reference not found with the specified criteria ${filter?.id ?? ''}`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.ReferenceNotFound = ReferenceNotFound;
//# sourceMappingURL=referenceNotFound.exception.js.map