import { HttpException, HttpStatus } from '@nestjs/common';

export class CompanyDynamicCodeNotValid extends HttpException {
  constructor() {
    super(`The dynamic code is invalid for that company`, HttpStatus.NOT_FOUND);
  }
}
