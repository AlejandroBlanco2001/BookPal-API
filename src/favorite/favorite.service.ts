import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  UserFavoritePhyiscalBook as Favorite,
  PhysicalBook,
} from '@prisma/client';
import { GenericError } from '../exceptions/genericError.exception';
import {
  PhyiscalBookWithRatings,
  PhysicalBookService,
} from '../physicalBook/physicalBook.service';

export interface FavoriteWithPhysicalBook extends Favorite {
  physical_book: PhyiscalBookWithRatings | PhyiscalBookWithRatings[] | null;
}
@Injectable()
export class FavoriteService {
  private readonly logger = new Logger(FavoriteService.name);

  constructor(
    private prisma: PrismaService,
    private physicalBookService: PhysicalBookService,
  ) {}

  async favorite(
    favoriteWhereUniqueInput: Prisma.UserFavoritePhyiscalBookWhereUniqueInput,
  ): Promise<FavoriteWithPhysicalBook | null> {
    try {
      const favorite = await this.prisma.userFavoritePhyiscalBook.findUnique({
        where: favoriteWhereUniqueInput,
      });

      if (!favorite) {
        throw new GenericError(
          'FavoriteService',
          'Favorite not found',
          'favorite',
        );
      }

      const physicalBook = await this.physicalBookService.physicalBook({
        barcode: favorite.physical_book_barcode,
      });

      return {
        ...favorite,
        physical_book: physicalBook,
      };
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
  }): Promise<FavoriteWithPhysicalBook[] | []> {
    try {
      const { where, take } = params;
      const favorites = await this.prisma.userFavoritePhyiscalBook.findMany({
        where,
        take,
        orderBy: {
          created_at: 'desc',
        },
      });
      const favoritesWithBooks = await Promise.all(
        favorites.map(async (favorite) => {
          const physicalBook = await this.physicalBookService.physicalBook({
            barcode: favorite.physical_book_barcode,
          });
          return {
            ...favorite,
            physical_book: physicalBook,
          };
        }),
      );
      return favoritesWithBooks;
    } catch (error: any) {
      this.logger.error(error);
      throw new GenericError('FavoriteService', error.message, 'favorites');
    }
  }

  async bookmarkFavorite(
    data: Prisma.UserFavoritePhyiscalBookCreateInput,
  ): Promise<Favorite> {
    try {
      const favorite = await this.prisma.userFavoritePhyiscalBook.findMany({
        where: {
          user_id: data?.user?.connect?.id,
          physical_book_barcode: data?.physical_book?.connect?.barcode,
        },
      });
      if (favorite.length === 1) {
        return await this.unbookmarkFavorite({
          id: favorite[0].id,
        });
      }
      return await this.prisma.userFavoritePhyiscalBook.create({ data });
    } catch (error: any) {
      this.logger.error(error);
      if (error instanceof GenericError) {
        throw new GenericError(
          'FavoriteService',
          error.message,
          'bookmarkFavorite',
        );
      }
      throw error;
    }
  }

  async unbookmarkFavorite(
    favoriteWhereUniqueInput: Prisma.UserFavoritePhyiscalBookWhereUniqueInput,
  ): Promise<Favorite> {
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
