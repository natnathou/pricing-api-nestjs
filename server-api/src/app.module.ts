import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { secret } from './secrets';
import { QueueModule } from './queue/queue.module';
import * as session from 'express-session';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: process.env.PGHOST,
          port: parseInt(process.env.PGPORT),
          username: process.env.PGUSER,
          password: process.env.PGPASSWORD,
          database: config.get<string>('PG_DATABASE'),
          entities: [User],
          synchronize: true,
        };
      },
    }),
    AuthModule,
    UsersModule,
    QueueModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: secret.session,
          resave: false,
          saveUninitialized: false,
        }),
      )
      .forRoutes('*');
  }
}
