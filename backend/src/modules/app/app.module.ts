import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configurations from 'configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
  ],
})
export class AppModule {}
