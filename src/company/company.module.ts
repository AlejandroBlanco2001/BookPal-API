import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HistoryService } from '../history/history.service';
import { SecurityModule } from 'src/utils/security/security.module';

@Module({
  imports: [PrismaModule, SecurityModule],
  controllers: [CompanyController],
  providers: [CompanyService, HistoryService],
  exports: [CompanyService],
})
export class CompanyModule {}
