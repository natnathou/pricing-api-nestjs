import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
