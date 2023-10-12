import { BookService } from './book.service';
import { PhysicalBook as PhysicalBookModel, Prisma } from '@prisma/client';
export declare class BookController {
    private readonly physicalBookService;
    constructor(physicalBookService: BookService);
    getBook(barcode: string): Promise<PhysicalBookModel | null>;
    getBooks(params: Prisma.PhysicalBookFindManyArgs): Promise<PhysicalBookModel[]>;
}
