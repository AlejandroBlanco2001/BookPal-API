import { Module } from '@nestjs/common';
import { FineService } from './fine.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LoanService } from '../loan/loan.service';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';
import { ReferenceService } from '../reference/reference.service';
@Module({
  imports: [PrismaModule],
  providers: [FineService, LoanService, PhysicalBookService, ReferenceService],
  exports: [FineService],
})
export class FineModule {}
