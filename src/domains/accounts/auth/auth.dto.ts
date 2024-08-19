import { IsEmail, IsString, MinLength } from 'class-validator';
const MIN_LENGTH = 8;

export class AuthDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(MIN_LENGTH)
  password: string;
}
