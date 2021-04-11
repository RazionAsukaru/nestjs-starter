import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { SignInDto } from '@dto/auth';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@entities/user.entity';
import { PG_UNIQUE_VIOLATION } from '@drdgvhbh/postgres-error-codes';
import { isEmail } from 'class-validator';
import { CreateUserDto } from '@dto/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(CreateUserDto: CreateUserDto): Promise<void> {
        const { username, password, email, name } = CreateUserDto;

        const user = new User();
        user.username = username;
        user.email = email;
        user.name = name;
        user.salt = await bcrypt.genSalt();
        user.verified = false;
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === PG_UNIQUE_VIOLATION) {
                throw new ConflictException('Username or Email already exist');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(authCredentialDto: SignInDto): Promise<User> {
        const { username, password } = authCredentialDto;
        const user = isEmail(username) ? await this.findOne({ email: username }) : await this.findOne({ username });

        if (user && (await user.validatePassword(password))) {
            return user;
        } else {
            return null;
        }
    }
}
