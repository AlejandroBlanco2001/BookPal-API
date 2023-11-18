import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ReferenceService {
    private prisma;
    constructor(prisma: PrismaService);
    reference(referenceWhereUniqueInput: Prisma.ReferenceWhereUniqueInput): Promise<{
        id: number;
        reference_name: string;
        limit_of_books_per_user: number;
        amount_of_days_per_loan: number;
        amount_of_money_per_day: number;
    }>;
}
