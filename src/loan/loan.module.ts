import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ReferenceService } from '../reference/reference.service';
import { InventoryService } from '../inventory/inventory.service';
import { NotificationModule } from '../notification/notification.module';
import { FineModule } from '../fine/fine.module';
import { PhysicalBookModule } from '../physicalBook/physicalBook.module';
import { CompanyModule } from '../company/company.module';
import { SecurityModule } from '../utils/security/security.module';

@Module({
  imports: [
    PrismaModule,
    NotificationModule,
    FineModule,
    PhysicalBookModule,
    CompanyModule,
    SecurityModule,
  ],
  controllers: [LoanController],
  providers: [LoanService, ReferenceService, InventoryService],
  exports: [LoanService],
})
export class LoanModule {}
