import { CreateUserDto } from '@dto/user';
import { IUser } from '@models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto extends CreateUserDto {}

export class SignInDto {
    @ApiProperty({ type: String, required: false, default: 'admin' }) // default for development only
    @IsString()
    @IsEmail()
    email?: string;

    @ApiProperty({ type: String, required: false, default: 'admin', minLength: 4, maxLength: 20 }) // default for development only
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username?: string;

    @ApiProperty({ type: String, required: false, default: 'Sadev123' }) // default for development only
    @IsString()
    @MinLength(8, { message: 'Password must have minimum length of 8 character' })
    @MaxLength(20, { message: 'Password must have maximum length of 20 character' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak! password must have at least 1 uppercase and 1 symbol!',
    })
    password: string;
}
