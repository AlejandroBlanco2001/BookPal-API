import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  UserFavoritePhyiscalBook as Favorite,
  PhysicalBook,
} from '@prisma/client';
import { GenericError } from '../exceptions/genericError.exception';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';

@Injectable()
export class FavoriteService {
  private readonly logger = new Logger(FavoriteService.name);

  constructor(
    private prisma: PrismaService,
    private physicalBookService: PhysicalBookService,
  ) {}

  async favorite(
    favoriteWhereUniqueInput: Prisma.UserFavoritePhyiscalBookWhereUniqueInput,
  ): Promise<Favorite | null> {
    try {
      const favorite = this.prisma.userFavoritePhyiscalBook.findUnique({
        where: favoriteWhereUniqueInput,
      });
      if (!favorite) {
        throw new GenericError(
          'FavoriteService',
          'Favorite not found',
          'favorite',
        );
      }
      return favorite;
    } catch (error) {
      this.logger.error(error);
      throw new GenericError('FavoriteService', error.message, 'favorite');
    }
  }

  async getAllFavorites(
    numberItems: number,
    filter: Prisma.UserFavoritePhyiscalBookWhereInput = {},
  ): Promise<Favorite[]> {
    try {
      const favorites = await this.prisma.userFavoritePhyiscalBook.findMany({
        where: filter,
        take: numberItems,
        orderBy: {
          created_at: 'desc',
        },
      });
      return favorites;
    } catch (error: any) {
      this.logger.error(error);
      throw new GenericError(
        'FavoriteService',
        error.message,
        'getAllFavorites',
      );
    }
  }

  async favorites(params: {
    where: Prisma.UserFavoritePhyiscalBookWhereInput;
    take?: number;
  }): Promise<Favorite[] | []> {
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
    } catch (error: any) {
      this.logger.error(error);
      throw new GenericError('FavoriteService', error.message, 'favorites');
    }
  }

  async bookmarkFavorite(data: Prisma.UserFavoritePhyiscalBookCreateInput) {
    try {
      return await this.prisma.userFavoritePhyiscalBook.create({ data });
    } catch (error: any) {
      this.logger.error(error);
      throw new GenericError(
        'FavoriteService',
        error.message,
        'bookmarkFavorite',
      );
    }
  }

  async unbookmarkFavorite(
    favoriteWhereUniqueInput: Prisma.UserFavoritePhyiscalBookWhereUniqueInput,
  ) {
    try {
      return await this.prisma.userFavoritePhyiscalBook.delete({
        where: favoriteWhereUniqueInput,
      });
    } catch (error) {
      this.logger.error(error);
      throw new GenericError(
        'FavoriteService',
        error.message,
        'unbookmarkFavorite',
      );
    }
  }

  async mostFavoritePhysicalBooks(): Promise<PhysicalBook[] | []> {
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
    } catch (error: any) {
      this.logger.error(error);
      throw new GenericError(
        'FavoriteService',
        error.message,
        'mostFavoritePhysicalBooks',
      );
    }
  }
}
