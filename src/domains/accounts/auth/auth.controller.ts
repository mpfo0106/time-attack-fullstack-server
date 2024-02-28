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
  async signUp(
    @Body() dto: AuthDto,
    // @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.signUp(dto);
    return accessToken;
  }

  /**
   * 로그인
   */
  @Post('log-in')
  async logIn(
    @Body() dto: AuthDto,
    // @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.logIn(dto);
    return accessToken;
  }

  /**
   * 로그아웃
   */
  // @Post('log-out')
  // async logOut(@Res({ passthrough: true }) response: Response) {
  //   return this.authService.logOut(response);
  // }
  /**
   * 리프레쉬 토큰
   */
  // @Get('refresh-token')
  // @Private('user')
  // async refreshToken(
  //   @Req() request: Request,
  //   @DUser() user: User,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   await this.authService.refreshAccessToken(user, response);
  // }
}
