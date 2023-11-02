"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalBookNotAvailable = void 0;
const common_1 = require("@nestjs/common");
class PhysicalBookNotAvailable extends common_1.HttpException {
    constructor(physicalBookBarcode) {
        super(`The book with barcode ${physicalBookBarcode} is not available for loan due capacity issues.`, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.PhysicalBookNotAvailable = PhysicalBookNotAvailable;
//# sourceMappingURL=physicalBookNotAvailable.exception.js.map