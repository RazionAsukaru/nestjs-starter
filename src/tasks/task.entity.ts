import { User } from 'src/user/user.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from '../tasks/task-status.enum';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user: User;
}
