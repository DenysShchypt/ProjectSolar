import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'modules/prisma/prisma.service';
import { UserService } from 'modules/user/user.service';
import { TokenService } from 'modules/token/token.service';
import { AppError } from 'common/constants/errors';
import * as bcryptjs from 'bcryptjs';
import { LoginDTO, RegisterDTO } from './dto';
import {
  ResponseLogin,
  ResponseRegister,
  ResponseRegisterVerify,
} from './responses';
import { USER_SELECT_FIELDS } from 'common/constants/select-return';

@Injectable()
export class AuthService {
  private client: OAuth2Client;
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
    this.client = new OAuth2Client(
      this.configService.get<string>('google_client_id'),
    );
  }

  async registerUser(
    dto: RegisterDTO,
    agent: string,
  ): Promise<ResponseRegister> {
    const newUser = await this.userService.createUser(dto);

    const payload = {
      email: dto.email,
      firstName: dto?.firstName,
      lastName: dto.lastName,
      id: newUser.id,
      roles: newUser.roles,
    };

    const token = await this.tokenService.generateTokens(payload, agent);
    delete token.refreshToken;

    return { ...newUser, token };
  }

  async verifyUser(id: string, agent: string): Promise<ResponseRegisterVerify> {
    const noneVerifyUser = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!noneVerifyUser)
      throw new BadRequestException(AppError.VERIFY_TOKEN_NOT_FOUND);

    const verifyUser = await this.prismaService.user.update({
      where: { id: noneVerifyUser.id },
      data: { verifyLink: true },
      select: USER_SELECT_FIELDS,
    });

    const payload = {
      email: verifyUser.email,
      firstName: verifyUser.firstName,
      lastName: verifyUser?.lastName,
      id: verifyUser.id,
      roles: verifyUser.roles,
    };

    const token = await this.tokenService.generateTokens(payload, agent);

    return { ...verifyUser, token };
  }

  async login(dto: LoginDTO, agent: string): Promise<ResponseLogin> {
    const user = await this.prismaService.user
      .findFirst({
        where: {
          email: dto.email,
        },
      })
      .catch((error) => {
        this.logger.error(`${AppError.ERROR_LOGIN_USER}:${error.message}`);
      });

    if (!user) throw new BadRequestException(AppError.USER_NOT_FOUND);
    if (!user.verifyLink)
      throw new BadRequestException(AppError.VERIFY_DOES_NOT_VERIFY);
    const isPasswordValid = await bcryptjs.compare(dto.password, user.password);
    if (!isPasswordValid) throw new BadRequestException(AppError.WRONG_DATA);

    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user?.lastName,
      id: user.id,
      roles: user.roles,
    };

    const token = await this.tokenService.generateTokens(payload, agent);

    return { ...user, token };
  }
}
