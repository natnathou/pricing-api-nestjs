import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUsersDto } from './dtos/create-user.dto';
import { UpdateUsersDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { IUsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
@Serialize(UserDto)
export class UsersController {
  constructor(
    @Inject('IUsersService') private readonly usersService: IUsersService,
  ) {}

  @Get()
  async finAll() {
    return (await this.usersService.finAll()) as CreateUsersDto[];
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updateOne(@Param('id') id: string, @Body() body: UpdateUsersDto) {
    return this.usersService.updateOne(parseInt(id), body);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.usersService.deleteOne(parseInt(id));
  }

  @Delete()
  deleteAll() {
    this.usersService.deleteAll();
  }
}
