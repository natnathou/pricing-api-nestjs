import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/auth/interceptor/current-user.interceptor';
import { User } from 'src/users/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    { provide: 'IUsersService', useClass: UsersService },
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
    { provide: 'IAuthGuard', useClass: AuthGuard },
  ],
  exports: [{ provide: 'IUsersService', useClass: UsersService }],
})
export class UsersModule {}
