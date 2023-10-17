"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericError = void 0;
const common_1 = require("@nestjs/common");
class GenericError extends common_1.HttpException {
    constructor(place, error, operation) {
        super(`ERROR: ${error} \n PLACE: ${place} \n OPERATION: ${operation}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.GenericError = GenericError;
//# sourceMappingURL=genericError.exception.js.map