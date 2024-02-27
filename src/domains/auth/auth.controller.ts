import { Body, Controller, Post } from '@nestjs/common';

import { LogInDto, SignUpDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    const accessToken = await this.authService.signUp(dto);
    return { accessToken };
  }

  @Post('log-in')
  async logIn(@Body() dto: LogInDto) {
    const accessToken = await this.authService.logIn(dto);
    return { accessToken };
  }
}
