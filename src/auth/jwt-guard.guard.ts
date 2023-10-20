import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../utils/custom_decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // FIX ME: - this is a hack to allow the API to be called from the frontend, just change it to an AND when deploy please
    if (
      isPublic ||
      context.getArgs()[0].headers['x-api-key'] === process.env.API_KEY
    ) {
      return true;
    }
    return super.canActivate(context);
  }
}
