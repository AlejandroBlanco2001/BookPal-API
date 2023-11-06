import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { SecurityService } from '../utils/security/security.service';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdateUserDTO } from './dto/update-user-dto';
export declare class UserController {
    private readonly userService;
    private securityService;
    private readonly logger;
    constructor(userService: UserService, securityService: SecurityService);
    createUser(data: CreateUserDTO): Promise<any>;
    getUserByID(id: number): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    getUserProfile(req: any): Promise<UserModel | null>;
    updateUserByID(data: UpdateUserDTO, id: number): Promise<UserModel>;
    updateUserByEmail(data: Prisma.UserUpdateInput, email: string): Promise<UserModel>;
    deleteUserByEmail(email: string): Promise<UserModel>;
    softDeleteUserByID(id: number): Promise<UserModel>;
}
