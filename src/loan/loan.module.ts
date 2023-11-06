import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';
import { ReferenceService } from '../reference/reference.service';
import { InventoryService } from '../inventory/inventory.service';
import { NotificationModule } from '../notification/notification.module';
import { FineModule } from '../fine/fine.module';

@Module({
  imports: [PrismaModule, NotificationModule, FineModule],
  controllers: [LoanController],
  providers: [
    LoanService,
    PhysicalBookService,
    ReferenceService,
    InventoryService,
  ],
  exports: [LoanService],
})
export class LoanModule {}
