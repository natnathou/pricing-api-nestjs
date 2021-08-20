import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { secret } from 'src/secrets';
import { User } from 'src/users/user.entity';
import { IUsersService } from 'src/users/users.service';

declare module 'express' {
  interface Request {
    currentUser?: User;
  }
}

declare module 'express-session' {
  interface Session {
    userId: number;
    userToken: string;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    @Inject('IUsersService') private readonly userService: IUsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId, userToken } = req.session;
    try {
      const tokenVerify = verify(userToken, secret.jwtSecret) as JwtPayload;
      if (tokenVerify.id === userId) {
        const user = await this.userService.findOne(userId);
        if (user.tokens.some((t) => t === userToken)) req.currentUser = user;
        else throw new Error();
      }
    } catch (e) {
      req.currentUser = null;
      req.session.userId = null;
      req.session.userToken = null;
    }
    next();
  }
}
