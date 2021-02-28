import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@dto/.';
import { User } from '@entities/user.entity';
// import UsersRepository from './users.repository';

@Injectable()
export class UserService {
    // constructor(private readonly usersRepository: UsersRepository) {}

    // async remove(id: number) {
    //     return `This action removes a #${id} user`;
    // }

    // // async findByEmail(email: string, verified = true): Promise<User | null> {
    // //     return this.usersRepository.getByEmail(email, verified);
    // // }

    // async findById(id: number, verified = true): Promise<User | null> {
    //     const found = await this.usersRepository.findOne({ where: { id, verified } });

    //     if (!found) {
    //         throw new NotFoundException(`User with ID"${id}" not found`);
    //     }

    //     return found;
    // }

    // async findByEmail(email: string, verified = true): Promise<User | null> {
    //     const found = await this.usersRepository.findOne({ where: { email, verified } });

    //     if (!found) {
    //         throw new NotFoundException(`User with EMAIL"${email}" not found`);
    //     }

    //     return found;
    // }

    // // async update(id: number, data: UpdateUserDto): Promise<UpdateResult> {
    // //     return this.usersRepository.updateById(id, data);
    // // }

    // async findAll(verified = true): Promise<User[] | []> {
    //     return this.usersRepository.find({ take: 2 });
    //     // return this.usersRepository.getAll(verified);
    // }
}
