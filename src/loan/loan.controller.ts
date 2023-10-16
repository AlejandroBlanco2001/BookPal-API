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
import { ReferenceService } from 'src/reference/reference.service';
@Controller('loan')
export class LoanController {
  constructor(
    public readonly loanService: LoanService,
    public readonly referenceService: ReferenceService,
  ) {}

  @Get(':id')
  getLoanByID(@Param('id') id: string) {
    return this.loanService.loan({ id: Number(id) });
  }

  @Post()
  async createLoan(@Request() req: any, @Body() createLoanDto: CreateLoanDto) {
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
          id: createLoanDto.physical_book_barcode,
        },
      },
      physical_book_barcode: createLoanDto.physical_book_barcode,
    };
    return await this.loanService.createLoan(req.user.id, data);
  }

  @Put('return/:id')
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
