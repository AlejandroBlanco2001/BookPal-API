import { Controller, Get, Param, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { PhysicalBook as PhysicalBookModel, Prisma } from '@prisma/client';

@Controller('book')
export class BookController {
  constructor(private readonly physicalBookService: BookService) {}

  @Get(':barcode')
  getBook(
    @Param('barcode') barcode: string,
  ): Promise<PhysicalBookModel | null> {
    return this.physicalBookService.physicalBook({ barcode: barcode });
  }

  @Get()
  getBooks(
    @Query() query: Prisma.PhysicalBookFindManyArgs,
  ): Promise<PhysicalBookModel[]> {
    return this.physicalBookService.physicalBooks(query);
  }
}
