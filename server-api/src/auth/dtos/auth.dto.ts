import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  tokens: string[];
}
