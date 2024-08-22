import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUserJWT } from 'interfaces/auth';
import { UserService } from 'modules/user/user.service';
import { AppError } from 'common/constants/errors';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('secret_jwt'),
    });
  }

  async validate(payload: IUserJWT): Promise<IUserJWT> {
    const user = await this.userService
      .getUserByEmailOrId(payload.id)
      .catch((error) => {
        this.logger.error(`${AppError.ERROR_JWT}: ${error.message}`);
        return null;
      });
    if (!user) throw new UnauthorizedException(AppError.USER_NOT_FOUND);
    return { ...payload };
  }
}
