import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserByID(id: string): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    updateUserByID(data: Prisma.UserUpdateInput, id: string): Promise<UserModel>;
    updateUserByEmail(data: Prisma.UserUpdateInput, email: string): Promise<UserModel>;
}
