import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialDto } from 'src/auth/dto/auth.credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { PG_UNIQUE_VIOLATION } from "@drdgvhbh/postgres-error-codes";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { username, password } = authCredentialDto;

        const user = new User();
        user.username = username;
        user.password = password;

        try {
            await user.save();
        } catch (error) {
            if (error.code === PG_UNIQUE_VIOLATION) {
                throw new ConflictException('Username already exist')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }
}
