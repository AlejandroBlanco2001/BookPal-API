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

  async getDueDate(
    referenceWhereUniqueInput: Prisma.ReferenceWhereUniqueInput,
  ) {
    const reference = await this.reference(referenceWhereUniqueInput);
    const date = new Date();
    date.setDate(date.getDate() + reference!.amount_of_days_per_loan);
    return date;
  }

  async getMaxLoans(
    referenceWhereUniqueInput: Prisma.ReferenceWhereUniqueInput,
  ) {
    const reference = await this.prisma.reference.findUnique({
      where: referenceWhereUniqueInput,
    });
    return reference!.limit_of_books_per_user;
  }
}
