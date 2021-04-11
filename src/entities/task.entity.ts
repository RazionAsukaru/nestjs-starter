import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ITask } from '@models/task.model';
import { TaskStatus } from '@enum/task-status.enum';
import { User } from './user.entity';

@Entity()
export class Task extends BaseEntity implements ITask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description?: string;

    @Column()
    status: TaskStatus;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user: User;
}
