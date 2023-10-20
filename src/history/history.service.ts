import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HistoryService {
  constructor(private prismaService: PrismaService) {}

  async history() {
    return await this.prismaService.history.findMany();
  }

  async createHistoryPoint(data: Prisma.HistoryCreateInput) {
    await this.prismaService.history.create({ data });
  }
}
