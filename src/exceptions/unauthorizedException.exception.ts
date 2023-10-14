import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super(
      `User not found with the specified criteria`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
