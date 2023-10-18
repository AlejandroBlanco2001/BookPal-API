import { HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
export declare class LoanNotFound extends HttpException {
    constructor(filter: Prisma.LoanWhereUniqueInput);
}
