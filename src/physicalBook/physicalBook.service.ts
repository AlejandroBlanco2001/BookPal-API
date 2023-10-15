import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PhysicalBook, Prisma } from '@prisma/client';
@Injectable()
export class PhysicalBookService {
  constructor(private prisma: PrismaService) {}

  async createPhysicalBook(
    data: Prisma.PhysicalBookCreateInput,
  ): Promise<PhysicalBook> {
    return this.prisma.physicalBook.create({
      data,
    });
  }

  async updatePhysicalBook(params: {
    where: Prisma.PhysicalBookWhereUniqueInput;
    data: Prisma.PhysicalBookUpdateInput;
  }): Promise<PhysicalBook> {
    const { where, data } = params;
    return this.prisma.physicalBook.update({
      data,
      where,
    });
  }

  async physicalBook(
    physicalBookWhereUniqueInput: Prisma.PhysicalBookWhereUniqueInput,
  ): Promise<PhysicalBook | null> {
    return this.prisma.physicalBook.findUnique({
      where: physicalBookWhereUniqueInput,
    });
  }

  async physicalBooks(
    params: Prisma.PhysicalBookFindManyArgs,
  ): Promise<PhysicalBook[]> {
    const { where, skip, take, orderBy } = params;
    return this.prisma.physicalBook.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }
}
