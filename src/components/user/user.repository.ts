import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialDto } from '@dto/.';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@entities/user.entity';
import { PG_UNIQUE_VIOLATION } from '@drdgvhbh/postgres-error-codes';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { username, password } = authCredentialDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === PG_UNIQUE_VIOLATION) {
                throw new ConflictException('Username already exist');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(authCredentialDto: AuthCredentialDto): Promise<string> {
        const { username, password } = authCredentialDto;
        const user = await this.findOne({ username });

        if (user && (await user.validatePassword(password))) {
            return user.username;
        } else {
            return null;
        }
    }
}
