import { PrismaService } from '../prisma/prisma.service';
import { Inventory, Prisma } from '@prisma/client';
export declare class InventoryService {
    private prisma;
    constructor(prisma: PrismaService);
    inventory(): Promise<Inventory[]>;
    inventoryByPhyiscalBookId(physicalBookId: string): Promise<Inventory[]>;
    createInventory(data: Prisma.InventoryCreateInput): Promise<Inventory>;
    updateInventory(params: {
        where: Prisma.InventoryWhereUniqueInput;
        data: Prisma.InventoryUpdateInput;
    }): Promise<Inventory>;
    isPhysicalBookAvailable(where: {
        physical_book_serial_number: string;
    }): Promise<boolean>;
    inventoryByPhyiscalSerialNumber(where: {
        physical_book_serial_number: string;
    }): Promise<Inventory | null>;
}
