import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from '@dto/.';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private configService: ConfigService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string, refreshToken: string }> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post('/')
    @UseGuards(AuthGuard())
    me() {
        return 'hello'
    }
    // @Get('verify/:token')
    // async verifyUser(@Param('token') token: string): Promise<any | never> {
    //     const { id } = await this.authService.verifyEmailVerToken(token, this.configService.get('JWT_ACCESS_SECRET'));
    //     const foundUser = await this.authService.getById(id, false);

    //     if (!foundUser) {
    //         throw new NotFoundException('The user does not exist');
    //     }

    //     return this.authService.update(foundUser.id, { verified: true });
    // }
}
