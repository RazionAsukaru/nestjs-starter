import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@dto/.';
import { User } from '@entities/user.entity';
import { UserRepository } from './user.repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
    constructor(private readonly usersRepository: UserRepository) {}
    async remove(id: number) {
        return `This action removes a #${id} user`;
    }
    // async findByEmail(email: string, verified = true): Promise<User | null> {
    //     return this.usersRepository.getByEmail(email, verified);
    // }
    async findById(id: number, verified = true): Promise<User | null> {
        const found = await this.usersRepository.findOne({ where: { id, verified } });
        if (!found) {
            throw new NotFoundException(`User with ID"${id}" not found`);
        }
        return found;
    }
    async findByEmail(email: string, verified = true): Promise<User | null> {
        const found = await this.usersRepository.findOne({ where: { email, verified } });
        if (!found) {
            throw new NotFoundException(`User with EMAIL"${email}" not found`);
        }
        return found;
    }
    // async update(id: number, data: UpdateUserDto): Promise<User> {
        // const user = await this.findById(id, false);
        // user = {...user, data}
        // user.verified = status;
        // await user.save();
        // return user;
        // return this.findById(id)
    // }
    async updateVerified(id: number, verified: boolean): Promise<UpdateResult> {
        return this.usersRepository.update(id, {verified})
        // const user = await this.findById(id, false);
        // return this.usersRepository.save({...user, verified});
    }
    // async findAll(verified = true): Promise<User[] | []> {
    //     return this.usersRepository.find({ take: 2 });
    //     // return this.usersRepository.getAll(verified);
    // }
}
