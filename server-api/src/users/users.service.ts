import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async finAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.findOne(id);
  }

  async create(userData: CreateUsersDto): Promise<User> {
    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);

    return user;
  }

  async updateOne(id: number, data: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.save({ ...user, ...data });
  }

  async deleteOne(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return this.usersRepository.remove(user);
  }

  async deleteAll() {
    const user = await this.finAll();
    if (!user.length) throw new NotFoundException('Users not found');

    user.forEach((u) => this.usersRepository.remove(u));
  }
}
