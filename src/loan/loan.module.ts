import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FineModule } from 'src/fine/fine.module';

@Module({
  imports: [PrismaModule, FineModule],
  controllers: [LoanController],
  providers: [LoanService],
  exports: [LoanService],
})
export class LoanModule {}
