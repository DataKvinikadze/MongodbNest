import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class HasUserIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers["user-id"]
    if (!userId || !isValidObjectId(userId)) {
      throw new ForbiddenException('User ID is required.');
    }

    request.userId = userId

    return true;
  }
}
