import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '@entities/task.entity';
import { IsEmail } from 'class-validator';
import { IUser } from '@models/user.model';

@Entity()
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column({
        unique: true,
    })
    username: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({default: false})
    verified?: boolean;

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[];


    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
