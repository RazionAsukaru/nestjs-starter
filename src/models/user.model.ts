import { ITask } from './task.model';

export interface IUser {
    id?: number;
    email?: string;
    username?: string;
    name?: string;
    password?: string;
    verified?: boolean;
    salt?: string;
    tasks?: ITask[];
}
