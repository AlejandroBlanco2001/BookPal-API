import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FineModule } from '../fine/fine.module';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';
import { ReferenceService } from '../reference/reference.service';
import { InventoryService } from '../inventory/inventory.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [PrismaModule, FineModule, NotificationModule],
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
