import { IsEmail, IsString } from 'class-validator';

export class UsersDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
