import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GenericError } from 'src/exceptions/genericError.exception';

@Injectable()
export class HistoryService {
  constructor(private prismaService: PrismaService) {}

  async history() {
    return await this.prismaService.history.findMany();
  }

  async createHistoryPoint(data: Prisma.HistoryCreateInput) {
    try {
      await this.prismaService.history.create({ data });
    } catch (error: any) {
      throw new GenericError(
        'HistoryService',
        error.message,
        'createHistoryPoint',
      );
    }
  }
}
