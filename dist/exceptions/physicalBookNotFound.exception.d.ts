import { HttpException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
export declare class PhysicalBookNotFound extends HttpException {
    constructor(filter: Prisma.PhysicalBookWhereUniqueInput);
}
