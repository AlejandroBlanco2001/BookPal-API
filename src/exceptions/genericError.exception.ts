import { HttpException, HttpStatus } from '@nestjs/common';

export class GenericError extends HttpException {
  constructor(place: string, error: string, operation: string) {
    super(
      `ERROR: ${error} \n PLACE: ${place} \n OPERATION: ${operation}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
