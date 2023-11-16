import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GenericError } from 'src/exceptions/genericError.exception';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async rating(ratingWhereUniqueInput: Prisma.RatingWhereUniqueInput) {
    try {
      return await this.prisma.rating.findUnique({
        where: ratingWhereUniqueInput,
      });
    } catch (error: any) {
      throw new GenericError('RatingService', error.message, 'rating');
    }
  }

  async ratings(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RatingWhereUniqueInput;
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByWithAggregationInput;
  }) {
    try {
      return await this.prisma.rating.findMany(params);
    } catch (error: any) {
      throw new GenericError('RatingService', error.message, 'ratings');
    }
  }

  async createRating(data: Prisma.RatingCreateInput) {
    console.log(data);
    try {
      return await this.prisma.rating.create({
        data,
      });
    } catch (error: any) {
      console.error(error);
      throw new GenericError('RatingService', error.message, 'createRating');
    }
  }

  async updateRating(params: {
    where: Prisma.RatingWhereUniqueInput;
    data: Prisma.RatingUpdateInput;
  }) {
    try {
      return await this.prisma.rating.update(params);
    } catch (error: any) {
      throw new GenericError('RatingService', error.message, 'updateRating');
    }
  }
}
