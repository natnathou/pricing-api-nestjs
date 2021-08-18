import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsersDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { IUsersService } from 'src/users/users.service';
import { AuthService, IAuthService } from './auth.service';

describe('AuthService', () => {
  let fakeUsersService: Partial<IUsersService>;
  let service: IAuthService;

  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) =>
        Promise.resolve([{ id: 1, email, password: '122' }] as User[]),
      create: ({ email, password }: { email: string; password: string }) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: 'IAuthService', useClass: AuthService },
        { provide: 'IUsersService', useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get<IAuthService>('IAuthService');
  });

  it('UsersService is defined', () => {
    expect(fakeUsersService).toBeDefined();
  });

  it('AuthService cannot register user that already exist', (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'alice@elipo.com', password: '122' },
      ] as User[]);

    const signup = async () => {
      try {
        const user = await service.signup({
          email: 'alice@elipo.com',
          password: '123',
        });
      } catch (error) {
        done();
      }
    };

    signup();
  });

  it('AuthService is login correctly', async () => {
    fakeUsersService.find = () => Promise.resolve([] as User[]);

    const users = await service.signup({
      email: 'alice@elipo.com',
      password: '123',
    });
    expect(users.email).toEqual('alice@elipo.com');
    const session = { userId: '', userToken: '' };

    fakeUsersService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email: 'alice@elipo.com',
          password: users.password,
          tokens: [],
        },
      ] as User[]);

    fakeUsersService.updateOne = () => Promise.resolve({} as User);

    const user = await service.signin(
      {
        email: 'alice@elipo.com',
        password: '123',
      },
      session,
    );

    expect(user.id).toEqual(session.userId);
    expect(user.tokens[user.tokens.length - 1]).toEqual(session.userToken);
  });

  it('AuthService login failed if wrong password', async () => {
    fakeUsersService.find = () => Promise.resolve([] as User[]);

    const users = await service.signup({
      email: 'alice@elipo.com',
      password: '123',
    });
    expect(users.email).toEqual('alice@elipo.com');
    const session = { userId: '', userToken: '' };

    fakeUsersService.find = () =>
      Promise.resolve([
        {
          id: 1,
          email: users.email,
          password: users.password,
          tokens: [],
        },
      ] as User[]);

    fakeUsersService.updateOne = () => Promise.resolve({} as User);
    try {
      const user = await service.signin(
        {
          email: 'alice@elipo.com',
          password: '1ww23',
        },
        session,
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("AuthService login failed if user doesn't exist", async () => {
    fakeUsersService.find = () => Promise.resolve([] as User[]);

    const session = {};
    try {
      const user = await service.signin(
        {
          email: 'alice@elipo.com',
          password: '123',
        },
        session,
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
