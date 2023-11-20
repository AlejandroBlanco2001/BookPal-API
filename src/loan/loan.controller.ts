import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { LoanService, LoanWithPhysicalBook } from './loan.service';
import { CreateLoanDto } from './dto/create-loan-dto';
import { Loan, LoanStatus } from '@prisma/client';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReturnLoanDto } from './dto/return-loan-dto';

@ApiTags('loan')
@Controller('loan')
export class LoanController {
  constructor(public readonly loanService: LoanService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a loan by ID' })
  async getLoanByID(
    @Param('id') id: string,
  ): Promise<LoanWithPhysicalBook | null> {
    return await this.loanService.loan({ id: Number(id) });
  }

  @Get('/user/:id')
  @ApiOperation({ summary: 'Get a user loans' })
  async getUserLoans(@Param('id') id: string): Promise<LoanWithPhysicalBook[]> {
    return await this.loanService.getLoanByUserID({ user_id: Number(id) });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new loan' })
  async createLoan(
    @Request() req: any,
    @Body() createLoanDto: CreateLoanDto,
  ): Promise<Loan> {
    const data = {
      status: LoanStatus.active,
      start_date: new Date(),
      user: {
        connect: {
          id: req.user.id,
        },
      },
      physical_book: {
        connect: {
          barcode: createLoanDto.physical_book_barcode,
        },
      },
    };
    return await this.loanService.createLoan(req.user.id, data as any);
  }

  @Put('return/:id')
  @ApiOperation({ summary: 'Return a loan' })
  returnLoan(
    @Param('id') id: string,
    @Request() req: any,
    @Body() returnLoanDto: ReturnLoanDto,
  ) {
    return this.loanService.returnLoan(
      Number(id),
      req.user.company_id,
      returnLoanDto.dynamic_code,
    );
  }
}
