import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '@enum/.';
import { ApiProperty } from '@nestjs/swagger';

export class GetTasksFilterDto {
    @ApiProperty({ type: String, required: false })
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.OPEN, TaskStatus.IN_PROGRESS])
    status?: TaskStatus;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    search?: string;
}
