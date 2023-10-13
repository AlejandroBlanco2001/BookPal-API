import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { SecurityService } from '../utils/security/security.service';
export declare class UserController {
    private readonly userService;
    private securityService;
    constructor(userService: UserService, securityService: SecurityService);
    createUser(data: Prisma.UserCreateInput): Promise<any>;
    getUserByID(id: number): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    getUserProfile(req: any): Promise<UserModel | null>;
    updateUserByID(data: Prisma.UserUpdateInput, id: number): Promise<UserModel>;
    updateUserByEmail(data: Prisma.UserUpdateInput, email: string): Promise<UserModel>;
}
