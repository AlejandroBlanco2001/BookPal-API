import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { LoanModule } from '../loan/loan.module';
import { FineModule } from '../fine/fine.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [LoanModule, FineModule, NotificationModule],
  providers: [CronjobsService],
})
export class CronjobsModule {}
