import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class RatingService {
    private prisma;
    constructor(prisma: PrismaService);
    rating(ratingWhereUniqueInput: Prisma.RatingWhereUniqueInput): Promise<{
        id: number;
        rating: number;
        physical_book_barcode: string;
        user_id: number;
        email: string;
        created_at: Date | null;
    } | null>;
    ratings(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.RatingWhereUniqueInput;
        where?: Prisma.RatingWhereInput;
        orderBy?: Prisma.RatingOrderByWithAggregationInput;
    }): Promise<{
        id: number;
        rating: number;
        physical_book_barcode: string;
        user_id: number;
        email: string;
        created_at: Date | null;
    }[]>;
    createRating(data: Prisma.RatingCreateInput): Promise<{
        id: number;
        rating: number;
        physical_book_barcode: string;
        user_id: number;
        email: string;
        created_at: Date | null;
    }>;
    updateRating(params: {
        where: Prisma.RatingWhereUniqueInput;
        data: Prisma.RatingUpdateInput;
    }): Promise<{
        id: number;
        rating: number;
        physical_book_barcode: string;
        user_id: number;
        email: string;
        created_at: Date | null;
    }>;
    getBooksAverageRating(barcodes: string[] | string, items?: number): Promise<Prisma.GetRatingAggregateType<{
        where: {
            physical_book_barcode: {
                in: any;
            };
        };
        _avg: {
            rating: true;
        };
        take: number;
    }>>;
    getTopBooksAverageRating(items?: number): Promise<Prisma.GetRatingAggregateType<{
        where: {
            physical_book_barcode: {
                in: any;
            };
        };
        _avg: {
            rating: true;
        };
        take: number;
    }>>;
}
