import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";

@Module({
  imports: [RedisModule, WeatherModule, ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
    envFilePath: ['.env', '.env.development'],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
