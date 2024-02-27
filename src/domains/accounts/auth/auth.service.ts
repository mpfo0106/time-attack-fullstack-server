import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaService } from 'src/db/prisma/prisma.service';
import generateRandomId from 'src/utils/generateRandomId';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async signUp(dto: AuthDto) {
    const { email, password } = dto;
    const data: Prisma.UserCreateInput = {
      id: generateRandomId(),
      email,
      encryptedPassword: await hash(password, 12),
    };
    const user = await this.prismaService.user.create({
      data,
      select: { id: true, email: true },
    });
    const accessToken = this.generateAccessToken(user);
    return accessToken;
  }

  async logIn(dto: AuthDto) {
    const { email, password } = dto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        encryptedPassword: true,
      },
    });
    if (!user) throw new NotFoundException('No user found');
    const isCorrectPassword = compare(user.encryptedPassword, password);
    if (!isCorrectPassword) throw new ForbiddenException('Incorrect password');
    const accessToken = this.generateAccessToken(user);
    return accessToken;
  }

  async generateAccessToken(user: Pick<User, 'id' | 'email'>) {
    const { id: subject, email } = user;
    const secretKey = this.configService.getOrThrow<string>('JWT_SECRET_KEY');
    const accessToken = sign({ email }, secretKey, {
      subject,
      expiresIn: '2h',
    });
    return accessToken;
  }
}
