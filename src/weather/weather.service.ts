import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RedisService } from '../redis/redis.service';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class WeatherService {
  private API_URL: string;
  private API_KEY: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
  ) {
    this.API_URL = this.configService.get<string>('api.url');
    this.API_KEY = this.configService.get<string>('api.key');
  }

  async getWeather(city: string): Promise<any> {
    const cacheKey = `weather:${city}`;
    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
      console.log('Mengambil dari cache');
      return JSON.parse(cachedData);
    }

    const response$ = this.httpService.get(`${this.API_URL}?q=${city}&key=${this.API_KEY}`);
    const response = await firstValueFrom(response$);

    await this.redisService.set(cacheKey, JSON.stringify(response.data), 600);

    return response.data;
  }
}
