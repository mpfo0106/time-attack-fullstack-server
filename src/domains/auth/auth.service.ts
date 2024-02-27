import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Prisma, PrismaClient, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import generateRandomId from 'src/utils/generateRandomId';
import { LogInDto, SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly configService: ConfigService,
  ) {}

  async signUp(dto: SignUpDto) {
    const { email, password } = dto;
    const data: Prisma.UserCreateInput = {
      id: generateRandomId(),
      email,
      encryptedPassword: await hash(password, 12),
    };

    const user = await this.prismaClient.user.create({
      data,
      select: { id: true, email: true },
    });
    const accessToken = this.generateAccessToken(user);

    return accessToken;
  }

  async logIn(dto: LogInDto) {
    const { email, password } = dto;

    const user = await this.prismaClient.user.findUnique({
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
