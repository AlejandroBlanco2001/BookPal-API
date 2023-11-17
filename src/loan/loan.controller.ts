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
import { LoanStatus } from '@prisma/client';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

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
  ): Promise<LoanWithPhysicalBook> {
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
    return await this.loanService.createLoan(
      req.user.id,
      createLoanDto.phone_token,
      data as any,
    );
  }

  @Put('return/:id')
  @ApiOperation({ summary: 'Return a loan' })
  returnLoan(@Param('id') id: string) {
    return this.loanService.returnLoan(Number(id));
  }
}
