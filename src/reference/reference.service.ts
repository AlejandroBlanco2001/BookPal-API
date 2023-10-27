import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReferenceService {
  constructor(private prisma: PrismaService) {}

  async reference(referenceWhereUniqueInput: Prisma.ReferenceWhereUniqueInput) {
    return this.prisma.reference.findUnique({
      where: referenceWhereUniqueInput,
    });
  }

  async getDueDate(
    referenceWhereUniqueInput: Prisma.ReferenceWhereUniqueInput,
  ) {
    const reference = await this.prisma.reference.findUnique({
      where: referenceWhereUniqueInput,
    });
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
