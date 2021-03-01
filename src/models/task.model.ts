import { TaskStatus } from '@enum/task-status.enum';
import { IUser } from './user.model';

export interface ITask {
    id?: number;
    title: string;
    description?: string;
    status: TaskStatus;
    userId: number;
    user: IUser;
}
