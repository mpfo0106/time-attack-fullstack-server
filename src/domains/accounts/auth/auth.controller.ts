import { Body, Controller, Post } from '@nestjs/common';

import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 회원가입
   */
  @Post('sign-up')
  async signUp(@Body() dto: AuthDto) {
    const accessToken = await this.authService.signUp(dto);
    return { accessToken };
  }

  /**
   * 로그인
   */

  @Post('log-in')
  async logIn(@Body() dto: AuthDto) {
    const accessToken = await this.authService.logIn(dto);
    return { accessToken };
  }
}
