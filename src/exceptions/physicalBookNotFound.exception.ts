import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class PhysicalBookNotFound extends HttpException {
  constructor(filter: Prisma.PhysicalBookWhereUniqueInput) {
    super(
      `Physical Book not found with the specified criteria ${filter}`,
      HttpStatus.NOT_FOUND,
    );
  }
}
