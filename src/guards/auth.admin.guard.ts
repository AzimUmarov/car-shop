import { CanActivate, ExecutionContext } from '@nestjs/common';
const ADMIN_MAIL = "theazimjon@gmail.com"

export class AuthAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        return request.session.user === ADMIN_MAIL;
    }
}
