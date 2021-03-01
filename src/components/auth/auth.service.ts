import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@components/user/user.repository';
import { ConfigService } from '@nestjs/config';
import AuthRedisRepository from './auth-redis.repository';
import { SignInDto } from '@dto/auth';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private authRedisRepository: AuthRedisRepository,
        private configService: ConfigService
    ) {}

    async signUp(authCredentialDto: SignInDto): Promise<void> {
        return this.userRepository.signUp(authCredentialDto);
    }

    async signIn(authCredentialDto: SignInDto): Promise<{ accessToken: string; refreshToken: string }> {
        const { id, username } = await this.userRepository.validateUserPassword(authCredentialDto);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: Number(this.configService.get('JWT_ACCESS_EXP')),
            secret: this.configService.get('JWT_ACCESS_SECRET'),
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: Number(this.configService.get('JWT_REFRESH_EXP')),
            secret: this.configService.get('JWT_REFRESH'),
        });

        await this.authRedisRepository.addRefreshToken(payload.username, refreshToken);

        return { accessToken, refreshToken };
    }

    async getRefreshTokenByEmail(email: string): Promise<string | null> {
        return this.authRedisRepository.getToken(email);
    }

    async deleteTokenByEmail(email: string): Promise<number> {
        return this.authRedisRepository.removeToken(email);
    }

    async deleteAllTokens(): Promise<string> {
        return this.authRedisRepository.removeAllTokens();
    }

    async verifyEmailVerToken(token: string, secret: string) {
        return this.jwtService.verifyAsync(token, { secret });
    }
}
