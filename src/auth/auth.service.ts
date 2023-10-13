import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { SecurityService } from '../utils/security/security.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private securityService: SecurityService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.user({ email });
    const isPasswordValid = await this.securityService.verifyPassword(
      password,
      user?.password ?? '',
    );
    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
