import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
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
  ResponseRefreshTokenAndUser,
  ResponseRegisterVerify,
} from './responses';
import { IUserAndTokens } from 'interfaces/auth';
import { Cookies } from '../../../libs/decorators/cookies.decorator';
import { TokenService } from 'modules/token/token.service';
import { OAuth2Client } from 'google-auth-library';
import { Provider } from '@prisma/client';

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
);
@ApiTags('API')
@Controller('auth')
export class AuthController {
  private static readonly REFRESH_TOKEN = 'free-cookie';

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'User registered successfully, no content returned',
  })
  @Post('register')
  async register(
    @Body() dto: RegisterDTO,
    @UserAgent() agent: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.registerUser(dto, agent);
    // delete newUser.token; ???
    // res.status(HttpStatus.OK).json({ ...newUser }); ???
    res.sendStatus(HttpStatus.CREATED);
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
  @ApiResponse({
    status: 200,
    type: ResponseLogin,
    description: 'User logged in successfully',
  })
  @Post('login')
  async login(
    @Body() dto: LoginDTO,
    @UserAgent() agent: string,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.authService.login(dto, agent);

    this.setRefreshTokenToCookies(user, res);
  }

  @ApiResponse({
    status: 200,
    type: ResponseLogin,
    description: 'User logged in successfully',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully, no content returned',
  })
  @Post('google')
  async google(
    @Body('token') token: string,
    @UserAgent() agent: string,
    @Res() res: Response,
  ) {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: this.configService.get('google_client_id'),
    });

    const payload = ticket.getPayload();

    const dataUserFromGoogle = {
      id: payload.sub,
      email: payload.email,
      lastName: payload.family_name,
      firstName: payload.given_name,
      picture: payload.picture,
      providerId: payload.sub,
      provider: Provider.GOOGLE,
    };

    const userRegisterFromGoogle = await this.authService.registerUser(
      dataUserFromGoogle,
      agent,
    );

    if (userRegisterFromGoogle.verifyLink) {
      this.setRefreshTokenToCookies(userRegisterFromGoogle, res);
    } else {
      res.sendStatus(HttpStatus.CREATED);
    }
  }

  @ApiResponse({
    status: 200,
    type: ResponseRefreshTokenAndUser,
    description: 'User refreshed in successfully',
  })
  @Post('refresh-token')
  async refreshToken(
    @Cookies(AuthController.REFRESH_TOKEN) refreshToken: string,
    @UserAgent()
    agent: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!refreshToken) throw new UnauthorizedException();
    const user = await this.tokenService.refreshToken(refreshToken, agent);

    this.setRefreshTokenToCookies(user, res);
  }

  @ApiResponse({
    status: 200,
    description: 'User logout successfully',
  })
  @Get('logout')
  async logout(
    @Res() res: Response,
    @Req() req,
    @Cookies(AuthController.REFRESH_TOKEN) refreshToken: string,
  ): Promise<void> {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }
    await this.authService.logout(refreshToken);

    res.cookie(AuthController.REFRESH_TOKEN, '', {
      expires: new Date(),
      httpOnly: true,
      // secure: true,
      sameSite: 'lax',
      path: '/login',
    });
    res.sendStatus(HttpStatus.OK);
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
        // secure: true,
        sameSite: 'lax',
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
        // secure: true,
        sameSite: 'lax',
        path: '/',
      },
    );
    res.status(HttpStatus.OK).json({ ...userAndToken });
  }
}
