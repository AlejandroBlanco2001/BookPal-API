import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserFavoritePhyiscalBook as Favorite, PhysicalBook } from '@prisma/client';
import { PhyiscalBookWithRatings, PhysicalBookService } from '../physicalBook/physicalBook.service';
export interface FavoriteWithPhysicalBook extends Favorite {
    physical_book: PhyiscalBookWithRatings | PhyiscalBookWithRatings[] | null;
}
export declare class FavoriteService {
    private prisma;
    private physicalBookService;
    private readonly logger;
    constructor(prisma: PrismaService, physicalBookService: PhysicalBookService);
    favorite(favoriteWhereUniqueInput: Prisma.UserFavoritePhyiscalBookWhereUniqueInput): Promise<FavoriteWithPhysicalBook | null>;
    getAllFavorites(numberItems: number, filter?: Prisma.UserFavoritePhyiscalBookWhereInput): Promise<Favorite[]>;
    favorites(params: {
        where: Prisma.UserFavoritePhyiscalBookWhereInput;
        take?: number;
    }): Promise<FavoriteWithPhysicalBook[] | []>;
    bookmarkFavorite(data: Prisma.UserFavoritePhyiscalBookCreateInput): Promise<Favorite>;
    unbookmarkFavorite(favoriteWhereUniqueInput: Prisma.UserFavoritePhyiscalBookWhereUniqueInput): Promise<Favorite>;
    mostFavoritePhysicalBooks(): Promise<PhysicalBook[] | []>;
}
