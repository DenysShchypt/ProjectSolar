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
    // CacheModule.registerAsync({
    //   useFactory: () => ({ ttl: 900, isGlobal: true }),
    // }),
    CacheModule.register({
      ttl: 900,
      isGlobal: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
