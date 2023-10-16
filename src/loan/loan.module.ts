import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FineModule } from '../fine/fine.module';
import { PhysicalBookService } from '../physicalBook/physicalBook.service';
import { ReferenceService } from '../reference/reference.service';

@Module({
  imports: [PrismaModule, FineModule],
  controllers: [LoanController],
  providers: [LoanService, PhysicalBookService, ReferenceService],
  exports: [LoanService],
})
export class LoanModule {}
