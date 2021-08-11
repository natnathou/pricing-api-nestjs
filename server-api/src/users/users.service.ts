import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';
import { UsersDto } from './dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async finAll() {
    return await this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async create(userData: UsersDto): Promise<User> {
    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);
    return user;
  }

  async updateOne(id: number, data: Partial<User>) {
    const user = await this.findOne(id);

    let test = { ...user, ...data };
    return this.usersRepository.save(test);
  }

  async deleteOne(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  async deleteAll() {
    const user = await this.finAll();
    user.forEach((u) => this.usersRepository.remove(u));
  }
}
