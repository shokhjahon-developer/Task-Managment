import { Priority, Status } from '@prisma/client';
export declare class CreateTodoDto {
    title: string;
    categoryId: string;
    description: string;
    deadline: string;
    priority: Priority;
    status: Status;
}
