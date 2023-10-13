import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { SecurityService } from '../utils/security/security.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private securityService;
    constructor(userService: UserService, jwtService: JwtService, securityService: SecurityService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: User): Promise<any>;
}
