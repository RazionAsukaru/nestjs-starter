// import { User } from '@entities/user.entity';
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { EntityRepository, Repository, UpdateResult } from 'typeorm/index';
// // import SignUpDto from '@components/auth/dto/sign-up.dto';
// // import UpdateUserDto from '@components/users/dto/update-user.dto';
// // import User from './entities/user.entity';

// @EntityRepository(User)
// export default class UsersRepository extends Repository<User> {

// //   async getAll(): Promise<User[]> {
// //     const query = this.createQueryBuilder('task');
// //     query.where('task.userId = :userId', { userId: user.id });

// //     if (status) {
// //         query.andWhere('task.status = :status', { status });
// //     }

// //     if (search) {
// //         query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {
// //             search: `%${search}%`,
// //         });
// //     }

// //     const tasks = await query.getMany();

// //     return tasks;
// // }
// }
