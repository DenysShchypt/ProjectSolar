import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'modules/prisma/prisma.service';
import { UserService } from 'modules/user/user.service';
import { TokenService } from './token.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
      property: 'user',
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('secret_jwt'),
        signOptions: {
          expiresIn: configService.get<string>('expire_jwt'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    TokenService,
    JwtService,
    PrismaService,
    UserService,
    ConfigService,
  ],
  exports: [TokenService],
})
export class TokenModule {}
