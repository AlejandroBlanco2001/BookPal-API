import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Book, Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prsima: PrismaService) {}

  async findAll(params: Prisma.BookFindManyArgs): Promise<Book[]> {
    return this.prsima.book.findMany(params);
  }
}
