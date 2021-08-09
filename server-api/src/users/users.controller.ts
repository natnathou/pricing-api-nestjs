import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  FinAll() {}

  @Get('/:id')
  FindOne() {}

  @Post()
  Create(@Body() body: UsersDto) {
    return this.usersService.Create(body);
  }

  @Patch()
  UpdateOne() {}

  @Delete()
  DeleteOne() {}
}
