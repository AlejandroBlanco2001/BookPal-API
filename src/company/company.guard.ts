import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CompanyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (!context.switchToHttp().getRequest().user) return true;
    return true;
    // FIXME - Uncomment this line to enable the guard
    /*
    return context.switchToHttp().getRequest().user.is_admin;
    */
  }
}
