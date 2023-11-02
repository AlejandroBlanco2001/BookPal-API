import { HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
export declare class ReferenceNotFound extends HttpException {
    constructor(filter: Prisma.ReferenceWhereUniqueInput);
}
