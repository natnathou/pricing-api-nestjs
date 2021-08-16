import {
  Body,
  Controller,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUsersDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
@Serialize(AuthDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: CreateUsersDto) {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: CreateUsersDto, @Session() session: any) {
    const user = await this.authService.signin(body, session);

    return user;
  }
}
