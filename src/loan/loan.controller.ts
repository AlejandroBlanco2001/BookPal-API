import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan-dto';
import { LoanStatus } from '@prisma/client';
import { ReferenceService } from '../reference/reference.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InventoryService } from '../inventory/inventory.service';
import { PhysicalBookNotAvailable } from '../exceptions/physicalBookNotAvailable.exception';

@ApiTags('loan')
@Controller('loan')
export class LoanController {
  constructor(
    public readonly loanService: LoanService,
    public readonly referenceService: ReferenceService,
    public readonly inventoryService: InventoryService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a loan by ID' })
  getLoanByID(@Param('id') id: string) {
    return this.loanService.loan({ id: Number(id) });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new loan' })
  async createLoan(@Request() req: any, @Body() createLoanDto: CreateLoanDto) {
    const is_book_available =
      await this.inventoryService.isPhysicalBookAvailable({
        physical_book_barcode: createLoanDto.physical_book_barcode,
      });
    if (!is_book_available) {
      throw new PhysicalBookNotAvailable(createLoanDto.physical_book_barcode);
    }
    const due_date = await this.referenceService.getDueDate({
      reference_name: createLoanDto.physical_book_collection_name,
    });
    const data = {
      status: LoanStatus.active,
      start_date: new Date(),
      due_date: due_date,
      user: {
        connect: {
          id: req.user.id,
        },
      },
      user_id: req.user.id,
      physical_book: {
        connect: {
          barcode: createLoanDto.physical_book_barcode,
        },
      },
      physical_book_barcode: createLoanDto.physical_book_barcode,
    };
    return await this.loanService.createLoan(req.user.id, data);
  }

  @Put('return/:id')
  @ApiOperation({ summary: 'Return a loan' })
  returnLoan(@Param('id') id: string) {
    return this.loanService.updateLoan({
      where: { id: Number(id) },
      data: {
        return_date: new Date(),
        status: LoanStatus.returned,
      },
    });
  }
}
