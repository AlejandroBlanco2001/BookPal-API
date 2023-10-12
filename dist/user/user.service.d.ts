import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    updateUser(data: Prisma.UserUpdateInput, filter: Prisma.UserWhereUniqueInput): Promise<User>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
}
