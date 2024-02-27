// export type SignUpDto = {
//   email: string;
//   password: string;
// };
// export type LogInDto = {
//   email: string;
//   password: string;
// };
import { IsEmail, IsString, MinLength } from 'class-validator';
const MIN_LENGTH = 8;

export class AuthDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(MIN_LENGTH)
  password: string;
}
