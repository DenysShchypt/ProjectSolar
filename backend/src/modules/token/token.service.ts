import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppError } from 'common/constants/errors';
import { add } from 'date-fns';
import { IUserJWT } from 'interfaces/auth';
import { IRefreshToken } from 'interfaces/tokens';
import { PrismaService } from 'modules/prisma/prisma.service';
import { UserService } from 'modules/user/user.service';
import { v4 } from 'uuid';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
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

  async refreshToken(refreshToken: string, agent: string) {
    const currentToken: IRefreshToken | null = await this.prismaService.token
      .findUnique({
        where: {
          token: refreshToken,
        },
      })
      .catch((error) => {
        this.logger.error(`${AppError.ERROR_DB}:${error.message}`);
        return null;
      });

    if (!currentToken || new Date(currentToken.exp) < new Date())
      throw new UnauthorizedException();

    const user = await this.userService.getUserByEmailOrId(
      currentToken.userId,
      true,
    );
    const tokens = await this.generateTokens(user, agent);
    return { ...user, token: tokens };
  }

  private async generateRefreshToken(userId: string, agent: string) {
    const _token = await this.prismaService.token
      .findFirst({
        where: {
          userId,
        },
      })
      .catch((error) => {
        this.logger.error(`${AppError.ERROR_DB}:${error.message}`);
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
