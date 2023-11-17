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
var PhysicalBookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalBookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const physicalBookNotFound_exception_1 = require("../exceptions/physicalBookNotFound.exception");
const genericError_exception_1 = require("../exceptions/genericError.exception");
const rating_service_1 = require("../rating/rating.service");
const inventory_service_1 = require("../inventory/inventory.service");
let PhysicalBookService = PhysicalBookService_1 = class PhysicalBookService {
    constructor(prisma, ratingService, invetoryService) {
        this.prisma = prisma;
        this.ratingService = ratingService;
        this.invetoryService = invetoryService;
        this.logger = new common_1.Logger(PhysicalBookService_1.name);
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
            const inventory = await this.invetoryService.inventoryByPhyiscalBookId(physicalBook.serial_number);
            if (inventory.length === 0) {
                this.logger.error(`Inventory not found with serial number ${physicalBook.serial_number}`);
                throw new genericError_exception_1.GenericError('PhysicalBookService', 'Inventory not found', 'physicalBook');
            }
            const inventoryCount = inventory[0].quantity - inventory[0].minimum_quantity;
            return {
                ...physicalBook,
                rating: average_rating._avg.rating || 0,
                ratings: ratings,
                available: inventoryCount > 0 ? inventoryCount : 0,
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
                const inventory = await this.invetoryService.inventoryByPhyiscalBookId(book.serial_number);
                if (inventory.length === 0) {
                    this.logger.error(`Inventory not found with serial number ${book.serial_number}`);
                    throw new genericError_exception_1.GenericError('PhysicalBookService', 'Inventory not found', 'physicalBook');
                }
                const inventoryCount = inventory[0].quantity - inventory[0].minimum_quantity;
                return {
                    ...book,
                    rating: average_rating._avg.rating || 0,
                    ratings: ratings,
                    available: inventoryCount > 0 ? inventoryCount : 0,
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
                return await this.physicalBook({ barcode: barcode });
            }));
            const sortedBooks = booksWithRatings.sort((a, b) => b?.rating - a?.rating);
            return sortedBooks;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.PhysicalBookService = PhysicalBookService;
exports.PhysicalBookService = PhysicalBookService = PhysicalBookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        rating_service_1.RatingService,
        inventory_service_1.InventoryService])
], PhysicalBookService);
//# sourceMappingURL=physicalBook.service.js.map