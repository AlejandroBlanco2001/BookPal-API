import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhyiscalBookController } from './physicalBook/physicalBook.controller';
import { PhysicalBookService } from './physicalBook/physicalBook.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PhysicalBookModule } from './physicalBook/physicalBook.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-guard.guard';
import { SecurityModule } from './utils/security/security.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    PrismaModule,
    PhysicalBookModule,
    UserModule,
    AuthModule,
    SecurityModule,
    ConfigModule.forRoot(),
    CompanyModule,
  ],
  controllers: [AppController, PhyiscalBookController, UserController],
  providers: [
    AppService,
    PhysicalBookService,
    UserService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
