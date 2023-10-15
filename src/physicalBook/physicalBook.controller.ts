import { Controller, Get, Param, Query } from '@nestjs/common';
import { PhysicalBookService } from './physicalBook.service';
import { PhysicalBook as PhysicalBookModel, Prisma } from '@prisma/client';
import { Public } from '../utils/custom_decorators';

@Controller('physical-book')
export class PhyiscalBookController {
  constructor(private readonly physicalBookService: PhysicalBookService) {}

  @Public()
  @Get(':barcode')
  getPhysicalBookByBarcode(
    @Param('barcode') barcode: string,
  ): Promise<PhysicalBookModel | null> {
    return this.physicalBookService.physicalBook({ barcode: barcode });
  }

  @Public()
  @Get(':id')
  getPhysicalBookByID(
    @Param('id') id: string,
  ): Promise<PhysicalBookModel | null> {
    return this.physicalBookService.physicalBook({ id: Number(id) });
  }

  @Public()
  @Get()
  getPhysicalBooks(
    @Query() query: Prisma.PhysicalBookFindManyArgs,
  ): Promise<PhysicalBookModel[]> {
    return this.physicalBookService.physicalBooks(query);
  }
}
