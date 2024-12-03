import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { RedisModule } from '../redis/redis.module';
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [HttpModule, RedisModule, ConfigModule],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
