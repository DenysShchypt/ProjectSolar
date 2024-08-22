import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppError } from 'common/constants/errors';
import { add } from 'date-fns';
import { IUserJWT } from 'interfaces/auth';
import { PrismaService } from 'modules/prisma/prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async generateTokens(user: IUserJWT, agent: string) {
    const payload = { user };

    const accuseToken =
      'Bearer ' +
      this.jwtService.sign(payload, {
        secret: this.configService.get('secret_jwt'),
        expiresIn: this.configService.get('expire_jwt'),
      });
    const refreshToken = await this.generateRefreshToken(user.id, agent);
    return { accuseToken, refreshToken };
  }

  private async generateRefreshToken(userId: string, agent: string) {
    const _token = await this.prismaService.token
      .findFirst({
        where: {
          userId,
        },
      })
      .catch((error) => {
        this.logger.error(`${AppError.TOKEN_NOT_FOUND}:${error.message}`);
        return null;
      });

    const token = _token?.token ?? '';

    return this.prismaService.token.upsert({
      where: { token },
      update: { token: v4(), exp: add(new Date(), { months: 1 }) },
      create: {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId,
        userAgent: agent,
      },
    });
  }
}
