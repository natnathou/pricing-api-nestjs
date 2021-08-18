import { Body, Injectable, BadRequestException, Inject } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { CreateUsersDto } from 'src/users/dtos/create-user.dto';
import { IUsersService, UsersService } from 'src/users/users.service';
import { promisify } from 'util';
import { sign } from 'jsonwebtoken';
import { secret } from '../secrets';
import { User } from 'src/users/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUsersService') private readonly userService: IUsersService,
  ) {}

  async signup({ email, password }: CreateUsersDto): Promise<User> {
    const userStored = await this.userService.find(email);

    if (userStored.length) throw new BadRequestException('User already exist');

    const salt = randomBytes(16);
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const user = await this.userService.create({
      email,
      password: `${hash.toString('hex')}.${salt.toString('hex')}`,
    });

    return user;
  }
  async signin(
    { email, password }: CreateUsersDto,
    session: Record<string, any>,
  ): Promise<User> {
    const [user] = await this.userService.find(email);

    if (!user) throw new BadRequestException('wrong credential');

    const [hashStore, salt] = user.password.split('.');
    const hash = (await scrypt(
      password,
      Buffer.from(salt, 'hex'),
      32,
    )) as Buffer;

    if (hashStore !== hash.toString('hex'))
      throw new BadRequestException('wrong credential');
    else {
      const token = sign({ id: user.id }, secret.jwtSecret, {
        expiresIn: 60,
      });
      user.tokens.push(token);

      session.userId = user.id;
      session.userToken = token;
      await this.userService.updateOne(user.id, user);

      return user;
    }
  }

  async logout(session: Record<string, any>): Promise<User> {
    const user = await this.userService.findOne(session.userId);

    user.tokens = user.tokens.filter((t) => t !== session.userToken);
    await this.userService.updateOne(session.userId, user);

    return user;
  }

  async logoutAllDevices(session: Record<string, any>): Promise<User> {
    const user = await this.userService.findOne(session.userId);

    user.tokens = [];
    await this.userService.updateOne(session.userId, user);

    return user;
  }
}

export interface IAuthService {
  signup({ email, password }: CreateUsersDto): Promise<User>;
  signin(
    { email, password }: CreateUsersDto,
    session: Record<string, any>,
  ): Promise<User>;
  logout(session: Record<string, any>): Promise<User>;
  logoutAllDevices(session: Record<string, any>): Promise<User>;
}
