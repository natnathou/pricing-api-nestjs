import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async finAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async find(email: string): Promise<User[]> {
    // return await this.usersRepository.query(
    //   `
    // select * from public.user
    // where email = $1
    // `,
    //   [email],
    // );
    return await this.usersRepository.find({ email });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.findOne(id);
  }

  async create(userData: CreateUsersDto): Promise<User> {
    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);

    return user;
  }

  async updateOne(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.save({ ...user, ...data });
  }

  async deleteOne(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.remove(user);
  }

  async deleteAll(): Promise<void> {
    const user = await this.finAll();
    if (!user.length) throw new NotFoundException('Users not found');

    user.forEach((u) => this.usersRepository.remove(u));
  }
}

export interface IUsersService {
  finAll(): Promise<User[]>;
  find(email: string): Promise<User[]>;
  findOne(id: number): Promise<User>;
  create(userData: CreateUsersDto): Promise<User>;
  updateOne(id: number, data: Partial<User>): Promise<User>;
  deleteOne(id: number): Promise<User>;
  deleteAll(): Promise<void>;
}
