import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';
import { UsersDto } from './dtos/users.dto';

@Injectable()
export class UsersService {
  private readonly name = 'UsersService';
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  FinAll() {}

  FindOne() {}

  async Create(userData: UsersDto): Promise<User> {
    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);

    this.logger.debug(`user ${JSON.stringify(user)} is created`);
    return user;
  }

  UpdateOne() {}

  DeleteOne() {}
}
