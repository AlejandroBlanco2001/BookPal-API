import { Module } from '@nestjs/common';
import { PhysicalBookService } from './physicalBook.service';
import { PhyiscalBookController } from './physicalBook.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RatingModule } from '../rating/rating.module';
import { InventoryService } from '../inventory/inventory.service';

@Module({
  controllers: [PhyiscalBookController],
  providers: [PhysicalBookService, InventoryService],
  imports: [PrismaModule, RatingModule],
  exports: [PhysicalBookService],
})
export class PhysicalBookModule {}
