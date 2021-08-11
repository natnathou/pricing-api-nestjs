import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { User } from 'src/entities/user.entities';
import { UsersDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async FinAll() {
    return (await this.usersService.finAll()) as UsersDto[];
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  FindOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  Create(@Body() body: UsersDto): Promise<User> {
    return this.usersService.create(body);
  }

  @Patch('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  UpdateOne(@Param('id') id: string, @Body() body: Partial<UsersDto>) {
    return this.usersService.updateOne(parseInt(id), body);
  }

  @Delete('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  DeleteOne(@Param('id') id: string) {
    return this.usersService.deleteOne(parseInt(id));
  }
}
