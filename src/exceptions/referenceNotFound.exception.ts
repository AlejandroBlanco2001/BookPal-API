import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class ReferenceNotFound extends HttpException {
  constructor(filter: Prisma.ReferenceWhereUniqueInput) {
    super(
      `Reference not found with the specified criteria ${filter?.id ?? ''}`,
      HttpStatus.NOT_FOUND,
    );
  }
}
