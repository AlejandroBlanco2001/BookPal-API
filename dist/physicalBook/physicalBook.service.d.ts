import { PrismaService } from '../prisma/prisma.service';
import { PhysicalBook, Prisma, Rating } from '@prisma/client';
import { RatingService } from '../rating/rating.service';
interface PhyiscalBookWithRatings extends PhysicalBook {
    rating: number;
    ratings: Rating[];
}
export declare class PhysicalBookService {
    private prisma;
    private ratingService;
    constructor(prisma: PrismaService, ratingService: RatingService);
    createPhysicalBook(data: Prisma.PhysicalBookCreateInput): Promise<PhysicalBook>;
    updatePhysicalBook(params: {
        where: Prisma.PhysicalBookWhereUniqueInput;
        data: Prisma.PhysicalBookUpdateInput;
    }): Promise<PhysicalBook>;
    physicalBook(physicalBookWhereUniqueInput: Prisma.PhysicalBookWhereUniqueInput): Promise<PhyiscalBookWithRatings | null>;
    physicalBooks(params: Prisma.PhysicalBookFindManyArgs): Promise<PhysicalBook[]>;
}
export {};
