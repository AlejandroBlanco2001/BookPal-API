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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const favorite_service_1 = require("./favorite.service");
const swagger_1 = require("@nestjs/swagger");
const create_favorite_dto_1 = require("./dto/create-favorite.dto");
let FavoriteController = class FavoriteController {
    constructor(favoriteService) {
        this.favoriteService = favoriteService;
    }
    async getFavorites(items) {
        return await this.favoriteService.getAllFavorites(items);
    }
    async getFavoritesFromUser(req) {
        return await this.favoriteService.favorites({
            where: {
                user_id: req.user.id,
            },
        });
    }
    async getFavoritesFromBook(barcode) {
        return await this.favoriteService.favorites({
            where: {
                physical_book_barcode: barcode,
            },
        });
    }
    async getMostFavorites() {
        return await this.favoriteService.mostFavoritePhysicalBooks();
    }
    async createFavorite(req, data) {
        return await this.favoriteService.bookmarkFavorite({
            user: {
                connect: {
                    id: req.user.id,
                },
            },
            physical_book: {
                connect: {
                    barcode: data.physical_book_barcode,
                },
            },
        });
    }
    async deleteFavorite(req, id) {
        return await this.favoriteService.unbookmarkFavorite({
            user_id: req.user.id,
            id: Number(id),
        });
    }
};
exports.FavoriteController = FavoriteController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Get all favorites' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('items')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all favorites of a user' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "getFavoritesFromUser", null);
__decorate([
    (0, common_1.Get)('/book/:barcode'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all favorites of a book' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('barcode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "getFavoritesFromBook", null);
__decorate([
    (0, common_1.Get)('/favorites'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all favorites of a book' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "getMostFavorites", null);
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new favorite' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_favorite_dto_1.CreateFavoriteDto]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "createFavorite", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a favorite' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "deleteFavorite", null);
exports.FavoriteController = FavoriteController = __decorate([
    (0, swagger_1.ApiTags)('favorite'),
    (0, common_1.Controller)('favorite'),
    __metadata("design:paramtypes", [favorite_service_1.FavoriteService])
], FavoriteController);
//# sourceMappingURL=favorite.controller.js.map