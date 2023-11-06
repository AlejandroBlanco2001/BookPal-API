import { Fine, Prisma } from '@prisma/client';
export interface FineServiceInterface {
    getFinesByUserID(data: Prisma.FineWhereUniqueInput, user_id: number): Promise<Fine[]>;
    getFine(where: Prisma.FineWhereUniqueInput): Promise<Fine>;
    fine(data: Prisma.FineCreateInput): Promise<Fine>;
}
