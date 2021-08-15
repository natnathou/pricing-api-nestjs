import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUsersDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;
}
