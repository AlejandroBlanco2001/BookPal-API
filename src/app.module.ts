import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
@Module({
  imports: [PrismaModule, BookModule],
  controllers: [AppController, BookController],
  providers: [AppService, BookService, PrismaService],
})
export class AppModule {}
