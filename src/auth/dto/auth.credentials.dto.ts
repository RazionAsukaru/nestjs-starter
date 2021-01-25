import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak! password must have at least 1 uppercase and 1 symbol!',
    })
    password: string;

    // email

    // firstname

    // lastname
}
