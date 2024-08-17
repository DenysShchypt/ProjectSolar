import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'modules/prisma/prisma.service';
import { RegisterDTO } from './dto';

@Injectable()
export class AuthService {
  private client: OAuth2Client;
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.client = new OAuth2Client(
      this.configService.get<string>('google_client_id'),
    );
  }

  async registerUser(dto: RegisterDTO, agent: string) {}
}
