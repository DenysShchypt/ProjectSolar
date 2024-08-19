import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurations from 'configurations';
import { AuthModule } from 'modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
