import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsersDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
