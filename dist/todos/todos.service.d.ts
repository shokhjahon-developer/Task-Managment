import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TodosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create({ title, description, deadline, priority, status, categoryId, }: CreateTodoDto, user: any): Promise<{
        id: string;
        title: string;
        description: string;
        deadline: string;
        priority: import(".prisma/client").$Enums.Priority;
        status: import(".prisma/client").$Enums.Status;
        categoryId: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        title: string;
        description: string;
        deadline: string;
        priority: import(".prisma/client").$Enums.Priority;
        status: import(".prisma/client").$Enums.Status;
        categoryId: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        deadline: string;
        priority: import(".prisma/client").$Enums.Priority;
        status: import(".prisma/client").$Enums.Status;
        categoryId: string;
        createdAt: Date;
    }>;
    getByPriority(priority: string): Promise<{
        id: string;
        title: string;
        description: string;
        deadline: string;
        priority: import(".prisma/client").$Enums.Priority;
        status: import(".prisma/client").$Enums.Status;
        categoryId: string;
        createdAt: Date;
    }[]>;
    getByStatus(status: string): Promise<{
        id: string;
        title: string;
        description: string;
        deadline: string;
        priority: import(".prisma/client").$Enums.Priority;
        status: import(".prisma/client").$Enums.Status;
        categoryId: string;
        createdAt: Date;
    }[]>;
    getByCategory(category: string): Promise<({
        todos: {
            id: string;
            title: string;
            description: string;
            deadline: string;
            priority: import(".prisma/client").$Enums.Priority;
            status: import(".prisma/client").$Enums.Status;
            categoryId: string;
            createdAt: Date;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
    })[]>;
    getByDeadline(): Promise<{
        id: string;
        title: string;
        description: string;
        deadline: string;
        priority: import(".prisma/client").$Enums.Priority;
        status: import(".prisma/client").$Enums.Status;
        categoryId: string;
        createdAt: Date;
    }[]>;
    update(id: string, { title, description, deadline, priority, status, categoryId, }: UpdateTodoDto, user: any): Promise<{
        id: string;
        title: string;
        description: string;
        deadline: string;
        priority: import(".prisma/client").$Enums.Priority;
        status: import(".prisma/client").$Enums.Status;
        categoryId: string;
        createdAt: Date;
    }>;
    remove(id: string, user: any): Promise<string>;
}
