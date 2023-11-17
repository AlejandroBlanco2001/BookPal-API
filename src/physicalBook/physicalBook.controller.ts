import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  PhyiscalBookWithRatings,
  PhysicalBookService,
} from './physicalBook.service';
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
  ): Promise<PhyiscalBookWithRatings | null> {
    return this.physicalBookService.physicalBook({ barcode: barcode });
  }

  @Public()
  @Get('id/:id')
  @ApiOperation({ summary: 'Get a physical book by ID' })
  getPhysicalBookByID(
    @Param('id') id: string,
  ): Promise<PhyiscalBookWithRatings | null> {
    return this.physicalBookService.physicalBook({ id: Number(id) });
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all physical books' })
  getPhysicalBooks(
    @Query('title') title: string,
  ): Promise<PhyiscalBookWithRatings[]> {
    return this.physicalBookService.physicalBooks({
      where: {
        title: {
          contains: title.replace(/["']/g, ''),
          mode: 'insensitive',
        },
      },
    });
  }

  @Public()
  @Get('/recent')
  @ApiOperation({ summary: 'Get all physical books' })
  getRecentPhysicalBooks(): Promise<PhyiscalBookWithRatings[]> {
    return this.physicalBookService.physicalBooks({
      orderBy: {
        creation_date: 'desc',
      },
      take: 10,
    });
  }

  @Public()
  @Get('/top-rated-books')
  @ApiOperation({ summary: 'Get top rated books' })
  async getTopRatedBooks(
    @Query('items') items?: number,
  ): Promise<PhyiscalBookWithRatings[]> {
    return await this.physicalBookService.getTopRatedBooks(Number(items));
  }
}
