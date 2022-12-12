import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Unique } from 'typeorm';
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
