import { Module } from '@nestjs/common';
import { FineService } from './fine.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LoanService } from '../loan/loan.service';
import { ReferenceService } from '../reference/reference.service';
import { InventoryService } from '../inventory/inventory.service';
import { NotificationModule } from '../notification/notification.module';
import { PhysicalBookModule } from 'src/physicalBook/physicalBook.module';
@Module({
  imports: [PrismaModule, NotificationModule, PhysicalBookModule],
  providers: [FineService, LoanService, ReferenceService, InventoryService],
  exports: [FineService],
})
export class FineModule {}
