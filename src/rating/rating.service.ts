import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GenericError } from 'src/exceptions/genericError.exception';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async rating(ratingWhereUniqueInput: Prisma.RatingWhereUniqueInput) {
    try {
      return await this.prisma.rating.findUnique({
        where: ratingWhereUniqueInput,
      });
    } catch (error: any) {
      throw new GenericError('RatingService', error.message, 'rating');
    }
  }

  async ratings(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RatingWhereUniqueInput;
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByWithAggregationInput;
  }) {
    try {
      return await this.prisma.rating.findMany(params);
    } catch (error: any) {
      throw new GenericError('RatingService', error.message, 'ratings');
    }
  }

  async createRating(data: Prisma.RatingCreateInput) {
    console.log(data);
    try {
      return await this.prisma.rating.create({
        data,
      });
    } catch (error: any) {
      console.error(error);
      throw new GenericError('RatingService', error.message, 'createRating');
    }
  }

  async updateRating(params: {
    where: Prisma.RatingWhereUniqueInput;
    data: Prisma.RatingUpdateInput;
  }) {
    try {
      return await this.prisma.rating.update(params);
    } catch (error: any) {
      throw new GenericError('RatingService', error.message, 'updateRating');
    }
  }

  async getBooksAverageRating(barcodes: string[] | string, items: number = 10) {
    let filter = {
      physical_book_barcode: {
        in: barcodes as any,
      },
    };
    if (typeof barcodes === 'string') {
      filter = {
        physical_book_barcode: barcodes as any,
      };
    }

    return await this.prisma.rating.aggregate({
      where: filter,
      _avg: {
        rating: true,
      },
      take: items,
    });
  }

  async getTopBooksAverageRating(items: number = 10) {
    try {
      const getBooksThatHaveRatings =
        await this.prisma.userFavoritePhyiscalBook.findMany({
          select: {
            physical_book_barcode: true,
          },
          distinct: ['physical_book_barcode'],
        });
      const barcodes = getBooksThatHaveRatings.map(
        (item) => item.physical_book_barcode,
      );
      return await this.getBooksAverageRating(barcodes, items);
    } catch (error: any) {
      throw new GenericError(
        'RatingService',
        error.message,
        'getTopBooksAverageRating',
      );
    }
  }
}
