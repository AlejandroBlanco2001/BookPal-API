import { Module } from '@nestjs/common';
import { FineService } from './fine.service';
import { PrismaModule } from '../prisma/prisma.module';
import { LoanService } from '../loan/loan.service';
@Module({
  imports: [PrismaModule],
  providers: [FineService, LoanService],
  exports: [FineService],
})
export class FineModule {}
