import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto';
import { UserAgent } from '../../../libs/decorators/userAgent.decorator';

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
);
const REFRESH_TOKEN = 'free-cookie';
@ApiTags('API')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiResponse({ status: 201 })
  @Post('register')
  async register(
    @Body() dto: RegisterDTO,
    @UserAgent() agent: string,
    @Res() res: Response,
  ): Promise<void> {
    const newUser = await this.authService.registerUser(dto, agent);
    res.status(HttpStatus.OK);
  }
}
