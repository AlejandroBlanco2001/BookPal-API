import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { LoanModule } from 'src/loan/loan.module';
import { FineModule } from 'src/fine/fine.module';

@Module({
  imports: [LoanModule, FineModule],
  providers: [CronjobsService],
})
export class CronjobsModule {}
