import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';
import { Priority, Status } from '@prisma/client';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Complete homework',
    description: 'The title of the todo task',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'b4087156-d8df-45a7-822f-9d173e3fdc98',
    description: 'The id of the category this todo task belongs to',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    example: 'Finish the math assignment by Friday',
    description: 'A brief description of the todo task',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '2024-08-30',
    description: 'The deadline for completing the  task',
  })
  @IsDateString()
  deadline: string;

  @ApiProperty({
    example: 'high',
    description: 'The importance level of the task.',
  })
  @IsEnum(Priority)
  @IsNotEmpty()
  priority: Priority;

  @ApiProperty({
    example: 'toDo',
    description: 'Whether the todo task has been completed',
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
