import { PrismaService } from '../prisma/prisma.service';
import { Inventory, Prisma } from '@prisma/client';
export type BatchPayload = {
    count: number;
};
export declare class InventoryService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    inventory(): Promise<Inventory[]>;
    inventoryByPhyiscalBookId(physicalBookId: string): Promise<Inventory[]>;
    createInventory(data: Prisma.InventoryCreateInput): Promise<Inventory>;
    updateInventory(params: {
        where: Prisma.InventoryWhereUniqueInput;
        data: Prisma.InventoryUpdateInput;
    }): Promise<Inventory>;
    updateInventoryGivenSerialNumber(params: {
        where: Prisma.InventoryWhereInput;
        data: Prisma.InventoryUpdateInput;
    }): Promise<BatchPayload>;
    isPhysicalBookAvailable(where: {
        physical_book_serial_number: string;
    }): Promise<boolean>;
    inventoryByPhyiscalSerialNumber(where: {
        physical_book_serial_number: string;
    }): Promise<Inventory | null>;
}
