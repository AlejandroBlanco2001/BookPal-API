import { PrismaService } from '../prisma/prisma.service';
import { Book, Prisma } from '@prisma/client';
export declare class BookService {
    private prsima;
    constructor(prsima: PrismaService);
    findAll(params: Prisma.BookFindManyArgs): Promise<Book[]>;
}
