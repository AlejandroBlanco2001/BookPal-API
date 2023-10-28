import { HttpException, HttpStatus } from '@nestjs/common';

export class FineNotFound extends HttpException {
  constructor() {
    super(`Fine not found with the specified criteria`, HttpStatus.NOT_FOUND);
  }
}
