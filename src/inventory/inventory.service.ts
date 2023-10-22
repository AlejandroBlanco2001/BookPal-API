import { Injectable } from '@nestjs/common';
import { GenericError } from '../exceptions/genericError.exception';
import { PrismaService } from '../prisma/prisma.service';
import { Inventory, Prisma } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async inventory(): Promise<Inventory[]> {
    try {
      return this.prisma.inventory.findMany();
    } catch (error: any) {
      throw new GenericError('InventoryService', error.message, 'inventory');
    }
  }

  async inventoryByPhyiscalBookId(
    physicalBookId: string,
  ): Promise<Inventory[]> {
    try {
      return this.prisma.inventory.findMany({
        where: {
          physical_book_barcode: physicalBookId,
        },
      });
    } catch (error: any) {
      throw new GenericError(
        'InventoryService',
        error.message,
        'inventoryByPhyiscalBookId',
      );
    }
  }

  async createInventory(data: Prisma.InventoryCreateInput): Promise<Inventory> {
    try {
      return this.prisma.inventory.create({
        data,
      });
    } catch (error: any) {
      throw new GenericError(
        'InventoryService',
        error.message,
        'createInventory',
      );
    }
  }

  async updateInventory(params: {
    where: Prisma.InventoryWhereUniqueInput;
    data: Prisma.InventoryUpdateInput;
  }): Promise<Inventory> {
    const { where, data } = params;
    try {
      return this.prisma.inventory.update({
        data,
        where,
      });
    } catch (error: any) {
      throw new GenericError(
        'InventoryService',
        error.message,
        'updateInventory',
      );
    }
  }

  async isPhysicalBookAvailable(where: {
    physical_book_barcode: string;
  }): Promise<boolean> {
    try {
      const inventory = await this.prisma.inventory.findFirst({
        where,
      });
      return (
        inventory!.quantity > 0 &&
        inventory!.quantity > inventory!.minimum_quantity
      );
    } catch (error: any) {
      throw new GenericError(
        'InventoryService',
        error.message,
        'isPhysicalBookAvailable',
      );
    }
  }
}
