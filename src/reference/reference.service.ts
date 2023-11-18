import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GenericError } from '../exceptions/genericError.exception';
import { ReferenceNotFound } from '../exceptions/referenceNotFound.exception';
@Injectable()
export class ReferenceService {
  constructor(private prisma: PrismaService) {}
  async reference(referenceWhereUniqueInput: Prisma.ReferenceWhereUniqueInput) {
    let reference;
    try {
      reference = await this.prisma.reference.findUnique({
        where: referenceWhereUniqueInput,
      });
    } catch (error: any) {
      throw new GenericError('ReferenceService', error.message, 'reference');
    }
    if (!reference) {
      throw new ReferenceNotFound(referenceWhereUniqueInput);
    }
    return reference;
  }
}
