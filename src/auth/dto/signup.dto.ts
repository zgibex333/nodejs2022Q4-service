import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
