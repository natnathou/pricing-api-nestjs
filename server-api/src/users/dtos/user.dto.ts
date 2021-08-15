import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  password: string;
}
