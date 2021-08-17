import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { secret } from 'src/secrets';
import { User } from 'src/users/user.entity';
import { IUsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('IUsersService') private readonly usersService: IUsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { userId, userToken } = request.session;

    try {
      const tokenVerify = verify(userToken, secret.jwtSecret) as JwtPayload;
      if (tokenVerify.id === userId) {
        const user = (await this.usersService.findOne(userId)) as User;

        if (user.tokens.some((t) => t === userToken)) return true;
        else return false;
      }
    } catch (e) {
      return false;
    }
  }
}
