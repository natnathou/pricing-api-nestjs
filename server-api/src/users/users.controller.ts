import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  FinAll() {}

  @Get('/:id')
  FindOne() {}

  @Post()
  Create() {}

  @Patch()
  UpdateOne() {}

  @Delete()
  DeleteOne() {}
}
