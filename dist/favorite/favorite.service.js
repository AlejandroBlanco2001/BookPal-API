"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FavoriteService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const genericError_exception_1 = require("../exceptions/genericError.exception");
const physicalBook_service_1 = require("../physicalBook/physicalBook.service");
let FavoriteService = FavoriteService_1 = class FavoriteService {
    constructor(prisma, physicalBookService) {
        this.prisma = prisma;
        this.physicalBookService = physicalBookService;
        this.logger = new common_1.Logger(FavoriteService_1.name);
    }
    async favorite(favoriteWhereUniqueInput) {
        try {
            const favorite = this.prisma.userFavoritePhyiscalBook.findUnique({
                where: favoriteWhereUniqueInput,
            });
            if (!favorite) {
                throw new genericError_exception_1.GenericError('FavoriteService', 'Favorite not found', 'favorite');
            }
            return favorite;
        }
        catch (error) {
            this.logger.error(error);
            throw new genericError_exception_1.GenericError('FavoriteService', error.message, 'favorite');
        }
    }
    async getAllFavorites(numberItems, filter = {}) {
        try {
            const favorites = await this.prisma.userFavoritePhyiscalBook.findMany({
                where: filter,
                take: numberItems,
                orderBy: {
                    created_at: 'desc',
                },
            });
            return favorites;
        }
        catch (error) {
            this.logger.error(error);
            throw new genericError_exception_1.GenericError('FavoriteService', error.message, 'getAllFavorites');
        }
    }
    async favorites(params) {
        try {
            const { where, take } = params;
            const favorites = await this.prisma.userFavoritePhyiscalBook.findMany({
                where,
                take,
                orderBy: {
                    created_at: 'desc',
                },
            });
            return favorites;
        }
        catch (error) {
            this.logger.error(error);
            throw new genericError_exception_1.GenericError('FavoriteService', error.message, 'favorites');
        }
    }
    async bookmarkFavorite(data) {
        try {
            return await this.prisma.userFavoritePhyiscalBook.create({ data });
        }
        catch (error) {
            this.logger.error(error);
            throw new genericError_exception_1.GenericError('FavoriteService', error.message, 'bookmarkFavorite');
        }
    }
    async unbookmarkFavorite(favoriteWhereUniqueInput) {
        try {
            return await this.prisma.userFavoritePhyiscalBook.delete({
                where: favoriteWhereUniqueInput,
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new genericError_exception_1.GenericError('FavoriteService', error.message, 'unbookmarkFavorite');
        }
    }
    async mostFavoritePhysicalBooks() {
        try {
            const groupedData = await this.prisma.userFavoritePhyiscalBook.groupBy({
                by: ['physical_book_barcode'],
                _count: {
                    physical_book_barcode: true,
                },
                orderBy: {
                    _count: {
                        physical_book_barcode: 'desc',
                    },
                },
                take: 10,
            });
            const barcodes = groupedData.map((item) => item.physical_book_barcode);
            const physicalBooks = await this.physicalBookService.physicalBooks({
                where: {
                    barcode: {
                        in: barcodes,
                    },
                },
            });
            return physicalBooks;
        }
        catch (error) {
            this.logger.error(error);
            throw new genericError_exception_1.GenericError('FavoriteService', error.message, 'mostFavoritePhysicalBooks');
        }
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = FavoriteService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        physicalBook_service_1.PhysicalBookService])
], FavoriteService);
//# sourceMappingURL=favorite.service.js.map