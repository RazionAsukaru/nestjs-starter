import { CreateUserDto } from '@dto/user';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {  } from "@dto/user";
import { IUser } from '@models/user.model';

export class SignInDto implements IUser {
    @ApiProperty({
        type: String,
        required: false,
        default: 'admin',
        minLength: 4,
        maxLength: 20,
        description: 'insert username or emailF',
    }) // default for development only
    @IsString()
    @IsOptional()
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
