import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UsersDto } from './dtos/users.dto';

@Controller('users')
export class UsersController {
  @Get()
  FinAll() {}

  @Get('/:id')
  FindOne() {}

  @Post()
  Create(@Body() body: UsersDto) {}

  @Patch()
  UpdateOne() {}

  @Delete()
  DeleteOne() {}
}
