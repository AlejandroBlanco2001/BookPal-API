import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UserNotFoundException } from '../exceptions/userNotFound.exception';
import { GenericError } from 'src/exceptions/genericError.exception';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    if (!user) {
      throw new UserNotFoundException(userWhereUniqueInput);
    }
    return user;
  }

  async updateUser(
    data: Prisma.UserUpdateInput,
    filter: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    try {
      return await this.prisma.user.update({
        data,
        where: filter,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new UserNotFoundException(filter);
        }
      }
      throw error;
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data,
      });
      return user;
    } catch (error) {
      throw new GenericError('UserService', error, 'createUser');
    }
  }
}
