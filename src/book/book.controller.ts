import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(params: any) {
    return {
      items: this.bookService.findAll(params),
      status: 'success',
      message: 'Books retrieved successfully',
    };
  }
}
