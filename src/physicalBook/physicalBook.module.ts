import { Module } from '@nestjs/common';
import { PhysicalBookService } from './physicalBook.service';
import { PhyiscalBookController } from './physicalBook.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RatingModule } from 'src/rating/rating.module';

@Module({
  controllers: [PhyiscalBookController],
  providers: [PhysicalBookService],
  imports: [PrismaModule, RatingModule],
  exports: [PhysicalBookService],
})
export class PhysicalBookModule {}
