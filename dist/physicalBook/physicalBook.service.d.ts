import { PrismaService } from '../prisma/prisma.service';
import { PhysicalBook, Prisma, Rating } from '@prisma/client';
import { RatingService } from '../rating/rating.service';
interface PhyiscalBookWithRatings extends PhysicalBook {
    rating: number;
    ratings?: Rating[];
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
    getTopRatedBooks(items?: number): Promise<{
        rating: number;
        ratings?: {
            id: number;
            rating: number;
            physical_book_barcode: string;
            user_id: number;
            email: string;
            created_at: Date | null;
        }[] | undefined;
        id?: number | undefined;
        serial_number?: string | undefined;
        barcode?: string | undefined;
        reference_id?: number | undefined;
        collection_id?: number | undefined;
        author?: string | undefined;
        book_cover?: string | undefined;
        title?: string | undefined;
        edition?: string | null | undefined;
        dewey_code?: string | undefined;
        creation_date?: Date | undefined;
        isbn?: string | null | undefined;
        isbn13?: string | null | undefined;
        publisher?: string | null | undefined;
        publish_date?: Date | null | undefined;
        language?: string | null | undefined;
        status?: import(".prisma/client").$Enums.BookStatus | undefined;
        bibliographic_gps?: string | null | undefined;
    }[]>;
}
export {};
