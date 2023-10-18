import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class LoanNotFound extends HttpException {
  constructor(filter: Prisma.LoanWhereUniqueInput) {
    super(
      `Loan not found with the specified criteria ${
        filter.id ? filter.id : ''
      }`,
      HttpStatus.NOT_FOUND,
    );
  }
}
