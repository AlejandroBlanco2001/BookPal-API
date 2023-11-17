import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PhysicalBook, Prisma, Rating } from '@prisma/client';
import { PhysicalBookNotFound } from '../exceptions/physicalBookNotFound.exception';
import { GenericError } from '../exceptions/genericError.exception';
import { RatingService } from '../rating/rating.service';
import { InventoryService } from '../inventory/inventory.service';

export interface PhyiscalBookWithRatings extends PhysicalBook {
  rating: number;
  ratings?: Rating[];
  available?: number;
}

@Injectable()
export class PhysicalBookService {
  private readonly logger = new Logger(PhysicalBookService.name);

  constructor(
    private prisma: PrismaService,
    private ratingService: RatingService,
    private invetoryService: InventoryService,
  ) {}

  async createPhysicalBook(
    data: Prisma.PhysicalBookCreateInput,
  ): Promise<PhysicalBook> {
    try {
      return this.prisma.physicalBook.create({
        data,
      });
    } catch (error: any) {
      throw new GenericError(
        'PhysicalBookService',
        error.message,
        'createPhysicalBook',
      );
    }
  }

  async updatePhysicalBook(params: {
    where: Prisma.PhysicalBookWhereUniqueInput;
    data: Prisma.PhysicalBookUpdateInput;
  }): Promise<PhysicalBook> {
    const { where, data } = params;
    try {
      return this.prisma.physicalBook.update({
        data,
        where,
      });
    } catch (error: any) {
      throw new GenericError(
        'PhysicalBookService',
        error.message,
        'updatePhysicalBook',
      );
    }
  }

  async physicalBook(
    physicalBookWhereUniqueInput: Prisma.PhysicalBookWhereUniqueInput,
  ): Promise<PhyiscalBookWithRatings> {
    try {
      const physicalBook = await this.prisma.physicalBook.findUnique({
        where: physicalBookWhereUniqueInput,
      });

      if (!physicalBook)
        throw new PhysicalBookNotFound(physicalBookWhereUniqueInput);

      const average_rating = await this.ratingService.getBooksAverageRating(
        physicalBook.barcode,
      );

      const ratings = await this.ratingService.ratings({
        where: {
          physical_book_barcode: physicalBook.barcode,
        },
      });

      const inventory = await this.invetoryService.inventoryByPhyiscalBookId(
        physicalBook.serial_number,
      );

      if (inventory.length === 0) {
        this.logger.error(
          `Inventory not found with serial number ${physicalBook.serial_number}`,
        );
        throw new GenericError(
          'PhysicalBookService',
          'Inventory not found',
          'physicalBook',
        );
      }

      const inventoryCount =
        inventory[0].quantity - inventory[0].minimum_quantity;

      return {
        ...physicalBook,
        rating: average_rating._avg.rating || 0,
        ratings: ratings,
        available: inventoryCount,
      };
    } catch (error) {
      throw new PhysicalBookNotFound(physicalBookWhereUniqueInput);
    }
  }

  async physicalBooks(
    params: Prisma.PhysicalBookFindManyArgs,
  ): Promise<PhyiscalBookWithRatings[]> {
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

      const books_with_rating = await Promise.all(
        books.map(async (book) => {
          const average_rating = await this.ratingService.getBooksAverageRating(
            book.barcode,
          );

          const ratings = await this.ratingService.ratings({
            where: {
              physical_book_barcode: book.barcode,
            },
          });

          const inventory =
            await this.invetoryService.inventoryByPhyiscalBookId(
              book.serial_number,
            );

          if (inventory.length === 0) {
            this.logger.error(
              `Inventory not found with serial number ${book.serial_number}`,
            );
            throw new GenericError(
              'PhysicalBookService',
              'Inventory not found',
              'physicalBook',
            );
          }

          const inventoryCount =
            inventory[0].quantity - inventory[0].minimum_quantity;

          return {
            ...book,
            rating: average_rating._avg.rating || 0,
            ratings: ratings,
            available: inventoryCount,
          };
        }),
      );

      return books_with_rating;
    } catch (error: any) {
      throw new GenericError(
        'PhysicalBookService',
        error.message,
        'physicalBooks',
      );
    }
  }

  async getTopRatedBooks(items?: number): Promise<PhyiscalBookWithRatings[]> {
    try {
      const groupedData: any = await this.prisma.rating.groupBy({
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

      const barcodes = groupedData.map(
        (rating: any) => rating.physical_book_barcode,
      ) as string[];

      const booksWithRatings: PhyiscalBookWithRatings[] = await Promise.all(
        barcodes.map(async (barcode: string) => {
          return await this.physicalBook({ barcode: barcode });
        }),
      );

      const sortedBooks = booksWithRatings.sort(
        (a, b) => b?.rating - a?.rating,
      );

      return sortedBooks as PhyiscalBookWithRatings[];
    } catch (error) {
      throw error;
    }
  }
}
