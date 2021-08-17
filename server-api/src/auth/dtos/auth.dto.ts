import { Expose } from 'class-transformer';

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
