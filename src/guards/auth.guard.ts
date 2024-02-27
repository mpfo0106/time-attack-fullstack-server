import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import { PrismaService } from './../db/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accountTypeInDecorator = this.reflector.getAllAndOverride<'user'>(
      'accountType',
      [context.getHandler(), context.getClass()],
    );

    if (!accountTypeInDecorator) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = this.extractTokenFromHeader(request);
    if (!accessToken) throw new UnauthorizedException();

    try {
      const secret = this.configService.getOrThrow<string>('JWT_SECRET_KEY');
      const { sub: id } = verify(accessToken, secret) as JwtPayload; // 제네릭이 없어서 이렇게 타입 지정

      //accessToken 이 유효하다

      if (accountTypeInDecorator === 'user') {
        const user = await this.prismaService.user.findUniqueOrThrow({
          where: { id },
        });
        request.user = user;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []; // 만약에 null 이면 빈 배열
    return type === 'Bearer' ? token : undefined;
  }
}
