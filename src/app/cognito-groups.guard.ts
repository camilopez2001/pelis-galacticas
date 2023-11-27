import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth/auth.service';


@Injectable()
export class CognitoGroupsGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly authService: AuthService
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const groups = this.reflector.get<string[]>('groups', context.getHandler());

        if (!groups) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        try {
            const authorizationInfo = this.authService.authorization() as { success: boolean; groups: string[] };
            const userGroups = authorizationInfo.groups;

            const requiredGroups = Reflect.getMetadata('groups', context.getHandler());
            if (!requiredGroups || requiredGroups.some((group) => userGroups.includes(group))) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
