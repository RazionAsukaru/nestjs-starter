import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decoretor';
import { User } from 'src/user/user.entity';
import { DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<DeleteResult> {
        return this.tasksService.deleteTask(id, user);
    }

    @Patch(':id')
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body('title') title: string,
        @Body('description') description: string,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.updateTask(id, title, description, user);
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}
