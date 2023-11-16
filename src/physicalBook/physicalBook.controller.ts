import { Controller, Get, Param, Query } from '@nestjs/common';
import { PhysicalBookService } from './physicalBook.service';
import { PhysicalBook as PhysicalBookModel, Prisma } from '@prisma/client';
import { Public } from '../utils/custom_decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('physical-book')
@Controller('physical-book')
export class PhyiscalBookController {
  constructor(private readonly physicalBookService: PhysicalBookService) {}

  @Public()
  @Get('barcode/:barcode')
  @ApiOperation({ summary: 'Get a physical book by barcode' })
  getPhysicalBookByBarcode(
    @Param('barcode') barcode: string,
  ): Promise<PhysicalBookModel | null> {
    return this.physicalBookService.physicalBook({ barcode: barcode });
  }

  @Public()
  @Get('id/:id')
  @ApiOperation({ summary: 'Get a physical book by ID' })
  getPhysicalBookByID(
    @Param('id') id: string,
  ): Promise<PhysicalBookModel | null> {
    return this.physicalBookService.physicalBook({ id: Number(id) });
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all physical books' })
  getPhysicalBooks(
    @Query() query: Prisma.PhysicalBookFindManyArgs,
  ): Promise<PhysicalBookModel[]> {
    return this.physicalBookService.physicalBooks(query);
  }

  @Public()
  @Get('/recent')
  @ApiOperation({ summary: 'Get all physical books' })
  getRecentPhysicalBooks(): Promise<PhysicalBookModel[]> {
    return this.physicalBookService.physicalBooks({
      orderBy: {
        creation_date: 'desc',
      },
      take: 10,
    });
  }
}
