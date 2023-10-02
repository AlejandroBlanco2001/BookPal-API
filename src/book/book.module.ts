import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [PrismaModule],
})
export class BookModule {}
