import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ReferenceService } from '../reference/reference.service';
import { InventoryService } from '../inventory/inventory.service';
import { NotificationModule } from '../notification/notification.module';
import { FineModule } from '../fine/fine.module';
import { PhysicalBookModule } from 'src/physicalBook/physicalBook.module';

@Module({
  imports: [PrismaModule, NotificationModule, FineModule, PhysicalBookModule],
  controllers: [LoanController],
  providers: [LoanService, ReferenceService, InventoryService],
  exports: [LoanService],
})
export class LoanModule {}
