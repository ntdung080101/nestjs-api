import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Array<Role>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();

    if (!req.headers.info) {
      return false;
    }

    return requiredRoles.some((role) =>
      req.headers.info.roleLogin.toString().includes(role),
    );
  }
}
