import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
// import { OAuth2Client } from 'google-auth-library';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { UserAgent } from '../../../libs/decorators/userAgent.decorator';
import {
  ResponseLogin,
  ResponseRegister,
  ResponseRegisterVerify,
} from './responses';
import { IUserAndTokens } from 'interfaces/auth';

// const oauth2Client = new OAuth2Client(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_SECRET,
// );
// const REFRESH_TOKEN = 'free-cookie';
@ApiTags('API')
@Controller('auth')
export class AuthController {
  private static readonly REFRESH_TOKEN = 'free-cookie';

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiResponse({ status: 201, type: ResponseRegister })
  @Post('register')
  async register(
    @Body() dto: RegisterDTO,
    @UserAgent() agent: string,
    @Res() res: Response,
  ): Promise<void> {
    const newUser = await this.authService.registerUser(dto, agent);

    res.status(HttpStatus.OK).json({ ...newUser });
  }

  @ApiResponse({ status: 200, type: ResponseRegisterVerify })
  @Get('verify/:id')
  async verifyUser(
    @Param('id') id: string,
    @UserAgent() agent: string,
    @Res() res: Response,
  ): Promise<void> {
    const addRefreshTokenToUser = await this.authService.verifyUser(id, agent);
    this.setRefreshTokenToCookiesAfterVerify(addRefreshTokenToUser, res);
  }
  @ApiResponse({ status: 200, type: ResponseLogin })
  @Post('login')
  async login(
    @Body() dto: LoginDTO,
    @UserAgent() agent: string,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.authService.login(dto, agent);

    this.setRefreshTokenToCookies(user, res);
  }

  private setRefreshTokenToCookiesAfterVerify(
    userAndToken: IUserAndTokens,
    res: Response,
  ): void {
    if (!userAndToken) throw new UnauthorizedException();
    res.cookie(
      AuthController.REFRESH_TOKEN,
      userAndToken.token.refreshToken.token,
      {
        expires: new Date(userAndToken.token.refreshToken.exp),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      },
    );
    res.redirect(this.configService.get('base_url_client'));
  }
  private setRefreshTokenToCookies(
    userAndToken: IUserAndTokens,
    res: Response,
  ): void {
    if (!userAndToken) throw new UnauthorizedException();
    res.cookie(
      AuthController.REFRESH_TOKEN,
      userAndToken.token.refreshToken.token,
      {
        expires: new Date(userAndToken.token.refreshToken.exp),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      },
    );
    res.status(HttpStatus.OK).json({ ...userAndToken });
  }
}
