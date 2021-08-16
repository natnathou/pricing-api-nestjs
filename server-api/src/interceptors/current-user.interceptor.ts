import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { JwtPayload, verify } from 'jsonwebtoken';
import { secret } from 'src/secrets';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userId, userToken } = request.session;

    try {
      const tokenVerify = verify(userToken, secret.jwtSecret) as JwtPayload;
      if (tokenVerify.id === userId) {
        request.currentUser = await this.userService.findOne(userId);
      }
      console.log('token Verify', tokenVerify);
    } catch (e) {}
    return next.handle();
  }
}
