import { Task } from '@entities/.';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto, GetTasksFilterDto } from '@dto/.';
import { TaskStatus } from '@enum/task-status.enum';
import { User } from '@entities/.';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask({ title, description }: CreateTaskDto, user: User): Promise<Task> {
        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user;
        return task;
    }

    async getTask({ status, search }: GetTasksFilterDto, user: User): Promise<Task[]> {
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {
                search: `%${search}%`,
            });
        }

        const tasks = await query.getMany();

        return tasks;
    }
}
