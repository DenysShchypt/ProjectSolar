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
    AuthModule,
  ],
})
export class AppModule {}
