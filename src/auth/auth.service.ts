import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { AuthCredentialDto } from './dto/auth.credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.signUp(authCredentialDto);
    }
}
