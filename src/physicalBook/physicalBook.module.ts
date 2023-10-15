import { Module } from '@nestjs/common';
import { PhysicalBookService } from './physicalBook.service';
import { PhyiscalBookController } from './physicalBook.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [PhyiscalBookController],
  providers: [PhysicalBookService],
  imports: [PrismaModule],
})
export class PhysicalBookModule {}
