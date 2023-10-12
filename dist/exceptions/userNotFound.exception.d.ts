import { Prisma } from '@prisma/client';
export declare class UserNotFoundException extends Error {
    constructor(userWhereUniqueInput: Prisma.UserWhereUniqueInput);
}
