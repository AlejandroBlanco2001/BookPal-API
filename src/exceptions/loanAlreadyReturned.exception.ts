import { HttpException, HttpStatus } from '@nestjs/common';

export class LoanAlreadyReturned extends HttpException {
  constructor() {
    super(`ERROR: Loan has already been returned.`, HttpStatus.BAD_REQUEST);
  }
}
