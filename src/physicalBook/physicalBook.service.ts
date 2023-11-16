import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PhysicalBook, Prisma, Rating } from '@prisma/client';
import { PhysicalBookNotFound } from '../exceptions/physicalBookNotFound.exception';
import { GenericError } from '../exceptions/genericError.exception';
import { RatingService } from '../rating/rating.service';

interface PhyiscalBookWithRatings extends PhysicalBook {
  rating: number;
  ratings?: Rating[];
}
@Injectable()
export class PhysicalBookService {
  constructor(
    private prisma: PrismaService,
    private ratingService: RatingService,
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
  ): Promise<PhyiscalBookWithRatings | null> {
    try {
      const physicalBook = await this.prisma.physicalBook.findUnique({
        where: physicalBookWhereUniqueInput,
      });
      if (!physicalBook)
        throw new PhysicalBookNotFound(physicalBookWhereUniqueInput);
      const average_rating = await this.ratingService.getBooksAverageRating(
        physicalBook.barcode,
      );
      return {
        ...physicalBook,
        rating: average_rating._avg.rating || 0,
        ratings: await this.ratingService.ratings({
          where: {
            physical_book_barcode: physicalBook.barcode,
          },
        }),
      };
    } catch (error) {
      throw new PhysicalBookNotFound(physicalBookWhereUniqueInput);
    }
  }

  async physicalBooks(
    params: Prisma.PhysicalBookFindManyArgs,
  ): Promise<PhysicalBook[]> {
    let { skip, take } = params;
    const { where, orderBy } = params;
    skip = Number(skip) || 0;
    take = Number(take) || 10;
    try {
      return this.prisma.physicalBook.findMany({
        where,
        skip,
        take,
        orderBy,
      });
    } catch (error: any) {
      throw new GenericError(
        'PhysicalBookService',
        error.message,
        'physicalBooks',
      );
    }
  }

  async getTopRatedBooks(items: number = 10) {
    try {
      const groupedData: any =
        await this.prisma.userFavoritePhyiscalBook.groupBy({
          by: ['physical_book_barcode'],
          _count: {
            physical_book_barcode: true,
          },
          orderBy: {
            _count: {
              physical_book_barcode: 'desc',
            },
          },
          take: items,
        });

      const barcodes = groupedData.map(
        (rating: any) => rating.physical_book_barcode,
      ) as string[];

      const booksWithRatings = await Promise.all(
        barcodes.map(async (barcode: string) => {
          const rating =
            await this.ratingService.getBooksAverageRating(barcode);
          const physicalBook = await this.physicalBook({ barcode: barcode });
          return {
            ...physicalBook,
            rating: rating._avg.rating || 0,
          };
        }),
      );
      const sortedBooks = booksWithRatings.sort((a, b) => b.rating - a.rating);

      return sortedBooks;
    } catch (error) {
      throw error;
    }
  }
}
