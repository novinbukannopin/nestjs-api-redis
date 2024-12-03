import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from "@nestjs/config"; // Menggunakan default import dari 'ioredis'

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor(
    private readonly configService: ConfigService,
  ) {
    const redisHost = this.configService.get<string>('redis.host') || '127.0.0.1';
    const redisPort = this.configService.get<number>('redis.port') || 6379;

    this.redisClient = new Redis({
      host: redisHost,
      port: redisPort,
    });

    console.log('Redis connected', redisHost, redisPort);
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string, expiry: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', expiry);
  }
}
