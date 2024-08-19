import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'modules/prisma/prisma.service';
import { UserService } from 'modules/user/user.service';
import { RegisterDTO } from './dto';
import { TokenService } from 'modules/token/token.service';
import { ResponseRegister } from './responses';

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
    return { ...newUser, token };
  }
}
