import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'modules/prisma/prisma.service';
import { STRTAGIES } from 'strategy';
import { TokenModule } from 'modules/token/token.module';
import { UserService } from 'modules/user/user.service';

@Module({
  imports: [TokenModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, ...STRTAGIES],
})
export class AuthModule {}
