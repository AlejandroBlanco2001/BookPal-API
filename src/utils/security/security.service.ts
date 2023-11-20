import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class SecurityService {
  public async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  public async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  public generateRandomDynamicCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
