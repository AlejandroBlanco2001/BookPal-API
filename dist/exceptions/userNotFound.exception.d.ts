import { HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
export declare class UserNotFoundException extends HttpException {
    constructor(userWhereUniqueInput: Prisma.UserWhereUniqueInput);
}
