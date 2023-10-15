import { HttpException, HttpStatus } from '@nestjs/common';

export class UserUnpaidFines extends HttpException {
  constructor() {
    super(
      `The user has unpaid fines and cannot borrow books until they are paid`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
