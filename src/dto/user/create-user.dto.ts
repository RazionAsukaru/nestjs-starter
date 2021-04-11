import { IUser } from '@models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto implements IUser {
    @ApiProperty({ type: String, required: false, default: 'admin@admin.com' }) // default for development only
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, required: false, default: 'admin' }) // default for development only
    @IsString()
    @MinLength(4, { message: 'Password must have minimum length of 4 character' })
    @MaxLength(20, { message: 'Password must have maximum length of 20 character' })
    username: string;

    @ApiProperty({ type: String, required: false, default: 'admin' }) // default for development only
    @IsString()
    name: string;

    @ApiProperty({ type: String, required: false, default: 'Sadev123' }) // default for development only
    @IsString()
    @MinLength(8, { message: 'Password must have minimum length of 8 character' })
    @MaxLength(20, { message: 'Password must have maximum length of 20 character' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak! password must have at least 1 uppercase and 1 symbol!',
    })
    password: string;
}
