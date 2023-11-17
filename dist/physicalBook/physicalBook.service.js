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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalBookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const physicalBookNotFound_exception_1 = require("../exceptions/physicalBookNotFound.exception");
const genericError_exception_1 = require("../exceptions/genericError.exception");
const rating_service_1 = require("../rating/rating.service");
let PhysicalBookService = class PhysicalBookService {
    constructor(prisma, ratingService) {
        this.prisma = prisma;
        this.ratingService = ratingService;
    }
    async createPhysicalBook(data) {
        try {
            return this.prisma.physicalBook.create({
                data,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('PhysicalBookService', error.message, 'createPhysicalBook');
        }
    }
    async updatePhysicalBook(params) {
        const { where, data } = params;
        try {
            return this.prisma.physicalBook.update({
                data,
                where,
            });
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('PhysicalBookService', error.message, 'updatePhysicalBook');
        }
    }
    async physicalBook(physicalBookWhereUniqueInput) {
        try {
            const physicalBook = await this.prisma.physicalBook.findUnique({
                where: physicalBookWhereUniqueInput,
            });
            if (!physicalBook)
                throw new physicalBookNotFound_exception_1.PhysicalBookNotFound(physicalBookWhereUniqueInput);
            const average_rating = await this.ratingService.getBooksAverageRating(physicalBook.barcode);
            const ratings = await this.ratingService.ratings({
                where: {
                    physical_book_barcode: physicalBook.barcode,
                },
            });
            return {
                ...physicalBook,
                rating: average_rating._avg.rating || 0,
                ratings: ratings,
            };
        }
        catch (error) {
            throw new physicalBookNotFound_exception_1.PhysicalBookNotFound(physicalBookWhereUniqueInput);
        }
    }
    async physicalBooks(params) {
        const { skip = 0, take = 10, where, orderBy } = params;
        const numericSkip = Number(skip);
        const numericTake = Number(take);
        try {
            const books = await this.prisma.physicalBook.findMany({
                where,
                skip: numericSkip,
                take: numericTake,
                orderBy,
            });
            const books_with_rating = await Promise.all(books.map(async (book) => {
                const average_rating = await this.ratingService.getBooksAverageRating(book.barcode);
                const ratings = await this.ratingService.ratings({
                    where: {
                        physical_book_barcode: book.barcode,
                    },
                });
                return {
                    ...book,
                    rating: average_rating._avg.rating || 0,
                    ratings: ratings,
                };
            }));
            return books_with_rating;
        }
        catch (error) {
            throw new genericError_exception_1.GenericError('PhysicalBookService', error.message, 'physicalBooks');
        }
    }
    async getTopRatedBooks(items) {
        try {
            const groupedData = await this.prisma.rating.groupBy({
                by: ['physical_book_barcode'],
                _avg: {
                    rating: true,
                },
                orderBy: {
                    _avg: {
                        rating: 'desc',
                    },
                },
                take: items || 10,
            });
            const barcodes = groupedData.map((rating) => rating.physical_book_barcode);
            const booksWithRatings = await Promise.all(barcodes.map(async (barcode) => {
                const rating = await this.ratingService.getBooksAverageRating(barcode);
                const physicalBook = await this.physicalBook({ barcode: barcode });
                return {
                    ...physicalBook,
                    rating: rating._avg.rating || 0,
                };
            }));
            const sortedBooks = booksWithRatings.sort((a, b) => b.rating - a.rating);
            return sortedBooks;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.PhysicalBookService = PhysicalBookService;
exports.PhysicalBookService = PhysicalBookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        rating_service_1.RatingService])
], PhysicalBookService);
//# sourceMappingURL=physicalBook.service.js.map