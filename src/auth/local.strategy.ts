import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '../exceptions/unauthorizedException.exception';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common/services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(PassportStrategy.name);

  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      this.logger.error(
        'User not found with email: ' + username + ' and password: ' + password,
      );
      throw new UnauthorizedException();
    }
    return user;
  }
}
