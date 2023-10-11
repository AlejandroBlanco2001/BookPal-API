import { Prisma } from '@prisma/client';

export class UserNotFoundException extends Error {
  constructor(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    super(
      `User not found with the specified criteria: ${JSON.stringify(
        userWhereUniqueInput,
      )}`,
    );
    this.name = 'UserNotFoundException'; // Set the name property for clarity
  }
}
