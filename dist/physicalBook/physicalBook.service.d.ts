import { PrismaService } from '../prisma/prisma.service';
import { PhysicalBook, Prisma, Rating } from '@prisma/client';
import { InventoryService } from '../inventory/inventory.service';
export interface PhyiscalBookWithRatings extends PhysicalBook {
    [x: string]: any;
    rating: number;
    ratings?: Rating[];
    available?: number;
}
export declare class PhysicalBookService {
    private prisma;
    private invetoryService;
    private readonly logger;
    constructor(prisma: PrismaService, invetoryService: InventoryService);
    createPhysicalBook(data: Prisma.PhysicalBookCreateInput): Promise<PhysicalBook>;
    updatePhysicalBook(params: {
        where: Prisma.PhysicalBookWhereUniqueInput;
        data: Prisma.PhysicalBookUpdateInput;
    }): Promise<PhysicalBook>;
    physicalBook(physicalBookWhereUniqueInput: Prisma.PhysicalBookWhereUniqueInput, extra_include?: any): Promise<PhyiscalBookWithRatings>;
    physicalBooks(params: Prisma.PhysicalBookFindManyArgs): Promise<PhyiscalBookWithRatings[]>;
    getTopRatedBooks(items?: number): Promise<PhyiscalBookWithRatings[]>;
}
