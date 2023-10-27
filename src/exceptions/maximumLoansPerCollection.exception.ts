import { HttpException, HttpStatus } from '@nestjs/common';

export class MaximumLoansPerCollection extends HttpException {
  constructor() {
    super(
      `The user has reached the maximum number of loans for this collection`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
