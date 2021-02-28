import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@components/user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
// import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AuthRedisRepository from './auth-redis.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({}),
        // JwtModule.registerAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: async (configService: ConfigService) => {
        //         console.log('auth module:'+ configService.get<number>('JWT_SECRET'));
                
        //         return {
        //         secret: '095d402a6944aca7d8d3e08fd78177eb215c38b1e60eeadc04bffd538ba8108b',
        //         signOptions: {
        //             expiresIn: configService.get<number>('JWT_ACCESS_EXP'),
        //         },
        //     }},
        // }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AuthRedisRepository],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
