import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PhysicalBook, Prisma } from '@prisma/client';
import { PhysicalBookNotFound } from '../exceptions/physicalBookNotFound.exception';
import { GenericError } from '../exceptions/genericError.exception';
@Injectable()
export class PhysicalBookService {
  constructor(private prisma: PrismaService) {}

  async createPhysicalBook(
    data: Prisma.PhysicalBookCreateInput,
  ): Promise<PhysicalBook> {
    try {
      return this.prisma.physicalBook.create({
        data,
      });
    } catch (error: any) {
      throw new GenericError(
        'PhysicalBookService',
        error.message,
        'createPhysicalBook',
      );
    }
  }

  async updatePhysicalBook(params: {
    where: Prisma.PhysicalBookWhereUniqueInput;
    data: Prisma.PhysicalBookUpdateInput;
  }): Promise<PhysicalBook> {
    const { where, data } = params;
    try {
      return this.prisma.physicalBook.update({
        data,
        where,
      });
    } catch (error: any) {
      throw new GenericError(
        'PhysicalBookService',
        error.message,
        'updatePhysicalBook',
      );
    }
  }

  async physicalBook(
    physicalBookWhereUniqueInput: Prisma.PhysicalBookWhereUniqueInput,
  ): Promise<PhysicalBook | null> {
    try {
      return this.prisma.physicalBook.findUnique({
        where: physicalBookWhereUniqueInput,
      });
    } catch (error) {
      throw new PhysicalBookNotFound(physicalBookWhereUniqueInput);
    }
  }

  async physicalBooks(
    params: Prisma.PhysicalBookFindManyArgs,
  ): Promise<PhysicalBook[]> {
    const { where, skip, take, orderBy } = params;
    try {
      return this.prisma.physicalBook.findMany({
        where,
        skip,
        take,
        orderBy,
      });
    } catch (error: any) {
      throw new GenericError(
        'PhysicalBookService',
        error.message,
        'physicalBooks',
      );
    }
  }
}
