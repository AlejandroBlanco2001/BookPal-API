import { PhysicalBookService } from './physicalBook.service';
import { PhysicalBook as PhysicalBookModel, Prisma } from '@prisma/client';
export declare class PhyiscalBookController {
    private readonly physicalBookService;
    constructor(physicalBookService: PhysicalBookService);
    getPhysicalBookByBarcode(barcode: string): Promise<PhysicalBookModel | null>;
    getPhysicalBookByID(id: string): Promise<PhysicalBookModel | null>;
    getPhysicalBooks(query: Prisma.PhysicalBookFindManyArgs): Promise<PhysicalBookModel[]>;
}
