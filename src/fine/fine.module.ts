import { Module } from '@nestjs/common';
import { FineService } from './fine.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LoanService } from '../loan/loan.service';
import { ReferenceService } from '../reference/reference.service';
import { InventoryService } from '../inventory/inventory.service';
import { NotificationModule } from '../notification/notification.module';
import { PhysicalBookModule } from 'src/physicalBook/physicalBook.module';
import { CompanyService } from '../company/company.service';
import { SecurityModule } from '../utils/security/security.module';
@Module({
  imports: [
    PrismaModule,
    NotificationModule,
    PhysicalBookModule,
    SecurityModule,
  ],
  providers: [
    FineService,
    LoanService,
    ReferenceService,
    InventoryService,
    CompanyService,
  ],
  exports: [FineService],
})
export class FineModule {}
