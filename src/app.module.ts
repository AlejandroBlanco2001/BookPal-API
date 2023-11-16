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
import { LoanModule } from './loan/loan.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsModule } from './cronjobs/cronjobs.module';
import { FineModule } from './fine/fine.module';
import { ReferenceService } from './reference/reference.service';
import { HistoryController } from './history/history.controller';
import { HistoryService } from './history/history.service';
import { InventoryService } from './inventory/inventory.service';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { RatingModule } from './rating/rating.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    PrismaModule,
    PhysicalBookModule,
    UserModule,
    AuthModule,
    SecurityModule,
    CompanyModule,
    LoanModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    CronjobsModule,
    FineModule,
    NotificationModule,
    RatingModule,
    FavoriteModule,
  ],
  controllers: [
    AppController,
    PhyiscalBookController,
    UserController,
    HistoryController,
    NotificationController,
  ],
  providers: [
    AppService,
    PhysicalBookService,
    UserService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ReferenceService,
    HistoryService,
    InventoryService,
    NotificationService,
  ],
})
export class AppModule {}
