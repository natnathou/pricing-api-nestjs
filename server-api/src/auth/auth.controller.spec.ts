import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsersDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { AuthController } from './auth.controller';
import { IAuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeAuthService: Partial<IAuthService>;

  beforeEach(async () => {
    const user = {
      id: 1,
      email: 'eede@ede.com',
      password: '1212',
    } as User;

    fakeAuthService = {
      signup: () => Promise.resolve(user),
      signin: () => Promise.resolve(user),
      logout: () => Promise.resolve(user),
      logoutAllDevices: () => Promise.resolve(user),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: 'IAuthService', useValue: fakeAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('AuthController is defined', () => {
    expect(controller).toBeDefined();
  });
});
