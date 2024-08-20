import { HistoryService } from './history.service';
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    findAll(): Promise<({
        todo: {
            id: string;
            title: string;
            description: string;
            deadline: string;
            priority: import(".prisma/client").$Enums.Priority;
            status: import(".prisma/client").$Enums.Status;
            categoryId: string;
            createdAt: Date;
        };
        user: {
            id: string;
            name: string;
            email: string;
            password: string;
            createdAt: Date;
        };
    } & {
        id: string;
        todoId: string;
        userId: string;
        operation: import(".prisma/client").$Enums.Operation;
        createdAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        todo: {
            id: string;
            title: string;
            description: string;
            deadline: string;
            priority: import(".prisma/client").$Enums.Priority;
            status: import(".prisma/client").$Enums.Status;
            categoryId: string;
            createdAt: Date;
        };
        user: {
            id: string;
            name: string;
            email: string;
            password: string;
            createdAt: Date;
        };
    } & {
        id: string;
        todoId: string;
        userId: string;
        operation: import(".prisma/client").$Enums.Operation;
        createdAt: Date;
    }>;
    remove(id: string): Promise<string>;
}
