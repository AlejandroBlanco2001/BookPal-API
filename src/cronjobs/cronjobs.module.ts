import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { LoanModule } from '../loan/loan.module';
import { FineModule } from '../fine/fine.module';
import { NotificationModule } from '../notification/notification.module';
import { CompanyModule } from 'src/company/company.module';
import { SecurityModule } from 'src/utils/security/security.module';

@Module({
  imports: [
    LoanModule,
    FineModule,
    NotificationModule,
    CompanyModule,
    SecurityModule,
  ],
  providers: [CronjobsService],
})
export class CronjobsModule {}
