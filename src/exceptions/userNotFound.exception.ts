import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class UserNotFoundException extends HttpException {
  constructor(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    super(
      `User not found with the specified criteria: ${JSON.stringify(
        userWhereUniqueInput,
      )}`,
      HttpStatus.NOT_FOUND,
    );
    this.name = 'UserNotFoundException'; // Set the name property for clarity
  }
}
