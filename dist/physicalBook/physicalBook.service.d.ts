import { PrismaService } from '../prisma/prisma.service';
import { PhysicalBook, Prisma } from '@prisma/client';
export declare class PhysicalBookService {
    private prisma;
    constructor(prisma: PrismaService);
    createPhysicalBook(data: Prisma.PhysicalBookCreateInput): Promise<PhysicalBook>;
    updatePhysicalBook(params: {
        where: Prisma.PhysicalBookWhereUniqueInput;
        data: Prisma.PhysicalBookUpdateInput;
    }): Promise<PhysicalBook>;
    physicalBook(physicalBookWhereUniqueInput: Prisma.PhysicalBookWhereUniqueInput): Promise<PhysicalBook | null>;
    physicalBooks(params: Prisma.PhysicalBookFindManyArgs): Promise<PhysicalBook[]>;
}
