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
exports.RatingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rating_service_1 = require("./rating.service");
const create_rating_dto_1 = require("./dto/create-rating.dto");
const update_rating_dto_1 = require("./dto/update-rating.dto");
let RatingController = class RatingController {
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    async getRatingByID(id) {
        return await this.ratingService.rating({ id: id });
    }
    async getRatings() {
        return await this.ratingService.ratings({});
    }
    async getRatingsForBook(book_id) {
        return await this.ratingService.ratings({
            where: {
                physical_book_barcode: book_id,
            },
        });
    }
    async getRatingsForUser(user_id) {
        return await this.ratingService.ratings({
            where: {
                user_id: user_id,
            },
        });
    }
    async createRating(req, data) {
        return await this.ratingService.createRating({
            rating: data.rating,
            user: {
                connect: {
                    id: Number(req.user.id),
                },
            },
            email: req.user.email,
            phyiscal_book: {
                connect: {
                    barcode: data.physical_book_barcode,
                },
            },
        });
    }
    async updateRating(req, data, id) {
        return await this.ratingService.updateRating({
            where: {
                user_id: Number(req.user.id),
                id: Number(id),
            },
            data: {
                rating: data.rating,
            },
        });
    }
};
exports.RatingController = RatingController;
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a rating by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The rating has been successfully retrieved.',
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "getRatingByID", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all ratings' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The ratings have been successfully retrieved.',
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "getRatings", null);
__decorate([
    (0, common_1.Get)('/book/:book_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all ratings for a book' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The ratings have been successfully retrieved.',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('book_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "getRatingsForBook", null);
__decorate([
    (0, common_1.Get)('/user/:user_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all ratings for a user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The ratings have been successfully retrieved.',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "getRatingsForUser", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new rating' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The rating has been successfully created.',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
    })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_rating_dto_1.default]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "createRating", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a rating' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The rating has been successfully updated.',
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
    })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_rating_dto_1.default, Number]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "updateRating", null);
exports.RatingController = RatingController = __decorate([
    (0, swagger_1.ApiTags)('rating'),
    (0, common_1.Controller)('rating'),
    __metadata("design:paramtypes", [rating_service_1.RatingService])
], RatingController);
//# sourceMappingURL=rating.controller.js.map