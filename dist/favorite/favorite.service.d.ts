import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserFavoritePhyiscalBook as Favorite, PhysicalBook } from '@prisma/client';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';
export declare class FavoriteService {
    private prisma;
    private physicalBookService;
    private readonly logger;
    constructor(prisma: PrismaService, physicalBookService: PhysicalBookService);
    favorite(favoriteWhereUniqueInput: Prisma.UserFavoritePhyiscalBookWhereUniqueInput): Promise<Favorite | null>;
    getAllFavorites(numberItems: number, filter?: Prisma.UserFavoritePhyiscalBookWhereInput): Promise<Favorite[]>;
    favorites(params: {
        where: Prisma.UserFavoritePhyiscalBookWhereInput;
        take?: number;
    }): Promise<Favorite[] | []>;
    bookmarkFavorite(data: Prisma.UserFavoritePhyiscalBookCreateInput): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        created_at: Date | null;
    }>;
    unbookmarkFavorite(favoriteWhereUniqueInput: Prisma.UserFavoritePhyiscalBookWhereUniqueInput): Promise<{
        id: number;
        user_id: number;
        physical_book_barcode: string;
        created_at: Date | null;
    }>;
    mostFavoritePhysicalBooks(): Promise<PhysicalBook[] | []>;
}
