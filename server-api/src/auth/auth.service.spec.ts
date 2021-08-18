import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsersDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { IUsersService } from 'src/users/users.service';
import { AuthService, IAuthService } from './auth.service';

describe('AuthService', () => {
  let fakeUsersService: Partial<IUsersService>;
  let service: IAuthService;

  beforeEach(async () => {
    let users = [] as User[];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: ({ email, password }: { email: string; password: string }) => {
        users.push({
          id: Math.floor(Math.random() * 9999),
          email,
          password,
          tokens: [],
        } as User);

        return Promise.resolve(users[users.length - 1]);
      },

      updateOne: (id: number, data: Partial<User>) => {
        let user = users.filter((u) => u.id === id)[0];
        users = users.filter((u) => u.id !== id);
        Object.assign(user, data);

        return Promise.resolve(user);
      },
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
    const users = await service.signup({
      email: 'alice@elipo.com',
      password: '123',
    });
    expect(users.email).toEqual('alice@elipo.com');
    const session = { userId: '', userToken: '' };

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
    const users = await service.signup({
      email: 'alice@elipo.com',
      password: '123',
    });
    const session = { userId: '', userToken: '' };

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
    const session = { userId: '', userToken: '' };

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
