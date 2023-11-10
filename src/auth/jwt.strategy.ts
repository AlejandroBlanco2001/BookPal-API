import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // TODO: Add validation for user
    return {
      id: payload.id,
      email: payload.email,
      is_admin: payload.is_admin,
      first_name: payload.first_name,
      last_name: payload.last_name,
      profile_image: payload.profile_image,
    };
  }
}
