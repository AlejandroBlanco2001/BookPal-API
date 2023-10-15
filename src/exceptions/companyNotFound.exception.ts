import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyNotFound extends HttpException {
  constructor() {
    super(
      `Company not found with the specified criteria`,
      HttpStatus.NOT_FOUND,
    );
  }
}
