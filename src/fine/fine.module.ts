import { Module } from '@nestjs/common';
import { FineService } from './fine.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LoanService } from '../loan/loan.service';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';
import { ReferenceService } from '../reference/reference.service';
import { InventoryService } from '../inventory/inventory.service';
import { NotificationModule } from '../notification/notification.module';
@Module({
  imports: [PrismaModule, NotificationModule],
  providers: [
    FineService,
    LoanService,
    PhysicalBookService,
    ReferenceService,
    InventoryService,
  ],
  exports: [FineService],
})
export class FineModule {}
