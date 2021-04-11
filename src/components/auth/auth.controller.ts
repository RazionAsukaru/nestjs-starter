import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from '@dto/auth';
import { UserService } from '@components/user/user.service';
import { CreateUserDto } from '@dto/user';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private configService: ConfigService, private userService:UserService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) CreateUserDto: CreateUserDto): Promise<void> {
        return this.authService.signUp(CreateUserDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<{ accessToken: string; refreshToken: string }> {
        return this.authService.signIn(signInDto);
    }

    @Get('/verify/:token')
    async verifyUser(@Param('token') token: string): Promise<any | never> {
        const { id } = await this.authService.verifyEmailVerToken(token, this.configService.get('JWT_ACCESS_SECRET'));

        const foundUser = await this.userService.findById(+id, false);

        if (!foundUser) {
            throw new NotFoundException('The user does not exist');
        }

        return this.userService.updateVerified(foundUser.id, true);
    }
}
