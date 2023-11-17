import { PhyiscalBookWithRatings, PhysicalBookService } from './physicalBook.service';
export declare class PhyiscalBookController {
    private readonly physicalBookService;
    constructor(physicalBookService: PhysicalBookService);
    getPhysicalBookByBarcode(barcode: string): Promise<PhyiscalBookWithRatings | null>;
    getPhysicalBookByID(id: string): Promise<PhyiscalBookWithRatings | null>;
    getPhysicalBooks(title: string): Promise<PhyiscalBookWithRatings[]>;
    getRecentPhysicalBooks(): Promise<PhyiscalBookWithRatings[]>;
    getTopRatedBooks(items?: number): Promise<PhyiscalBookWithRatings[]>;
}
