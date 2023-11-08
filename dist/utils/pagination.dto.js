"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedOutputDto = void 0;
const openapi = require("@nestjs/swagger");
class PaginatedOutputDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true }, meta: { required: true, type: () => ({ total: { required: true, type: () => Number }, lastPage: { required: true, type: () => Number }, currentPage: { required: true, type: () => Number }, perPage: { required: true, type: () => Number }, prev: { required: true, type: () => Number, nullable: true }, next: { required: true, type: () => Number, nullable: true } }) } };
    }
}
exports.PaginatedOutputDto = PaginatedOutputDto;
//# sourceMappingURL=pagination.dto.js.map