import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
@Module({
  imports: [PrismaModule, BookModule, UserModule],
  controllers: [AppController, BookController, UserController],
  providers: [AppService, BookService, UserService, PrismaService],
})
export class AppModule {}
