import * as Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthRedisRepository {
    private readonly redisClient: Redis.Redis;

    constructor(private readonly redisService: RedisService, private configService: ConfigService) {
        this.redisClient = redisService.getClient();
    }

    public async addRefreshToken(email: string, token: string): Promise<void> {
        await this.redisClient.set(email, token, 'EX', +this.configService.get('JWT_REFRESH_EXP'));
    }

    public getToken(key: string): Promise<string | null> {
        return this.redisClient.get(key);
    }

    public removeToken(key: string): Promise<number> {
        return this.redisClient.del(key);
    }

    public removeAllTokens(): Promise<string> {
        return this.redisClient.flushall();
    }
}
