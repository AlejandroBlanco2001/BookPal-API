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
    if (!user) {
      return null;
    }
    const isPasswordValid = await this.securityService.verifyPassword(
      password,
      user?.password ?? '',
    );
    if (isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<any> {
    const payload = {
      id: user.id,
      email: user.email,
      is_admin: user.is_admin,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image: user.profile_image,
    };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
