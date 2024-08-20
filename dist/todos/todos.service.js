"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let TodosService = class TodosService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ title, description, deadline, priority, status, categoryId, }, user) {
        const category = await this.prisma.category.findFirst({
            where: { id: categoryId },
        });
        if (!category)
            throw new common_1.BadRequestException('Invalid category provided!');
        const deadlineDate = new Date(deadline);
        const nowDate = new Date();
        if (deadlineDate <= nowDate) {
            throw new common_1.BadRequestException('Deadline cannot be in the past!');
        }
        const newTodo = await this.prisma.todo.create({
            data: {
                title,
                description,
                deadline,
                priority,
                status,
                categoryId,
            },
        });
        await this.prisma.history.create({
            data: {
                userId: user.id,
                todoId: newTodo.id,
                operation: 'add',
            },
        });
        return newTodo;
    }
    async findAll() {
        return await this.prisma.todo.findMany();
    }
    async findOne(id) {
        const todo = await this.prisma.todo.findFirst({ where: { id: id } });
        if (!todo)
            throw new common_1.BadRequestException('Invalid id provided!');
        return todo;
    }
    async getByPriority(priority) {
        if (!Object.values(client_1.Priority).includes(priority)) {
            throw new common_1.BadRequestException(`Invalid priority value, it must be one of them: 'high', 'low', 'medium'`);
        }
        const todos = await this.prisma.todo.findMany({
            where: { priority: priority },
        });
        return todos;
    }
    async getByStatus(status) {
        if (!Object.values(client_1.Status).includes(status)) {
            throw new common_1.BadRequestException(`Invalid status value, it must be one of them: 'toDo', 'inProgress', 'completed`);
        }
        const todos = await this.prisma.todo.findMany({
            where: { status: status },
        });
        return todos;
    }
    async getByCategory(category) {
        category = category.toLowerCase();
        const todos = await this.prisma.category.findMany({
            where: { name: category },
            include: {
                todos: true,
            },
        });
        if (!todos.length) {
            throw new common_1.BadRequestException('Invalid category provided!');
        }
        return todos;
    }
    async getByDeadline() {
        const todos = await this.prisma.todo.findMany({
            orderBy: {
                deadline: 'asc',
            },
        });
        return todos;
    }
    async update(id, { title, description, deadline, priority, status, categoryId, }, user) {
        await this.findOne(id);
        const category = await this.prisma.category.findFirst({
            where: { id: categoryId },
        });
        await this.prisma.history.create({
            data: {
                userId: user.id,
                todoId: id,
                operation: 'update',
            },
        });
        if (!category)
            throw new common_1.BadRequestException('Invalid category provided!');
        const updatedTodo = await this.prisma.todo.update({
            where: { id: id },
            data: {
                title: title,
                description: description,
                deadline: deadline,
                priority: priority,
                status: status,
                categoryId: categoryId,
            },
        });
        return updatedTodo;
    }
    async remove(id, user) {
        await this.findOne(id);
        await this.prisma.history.create({
            data: {
                userId: user.id,
                todoId: id,
                operation: 'remove',
            },
        });
        await this.prisma.todo.delete({ where: { id: id } });
        return 'Todo deleted successfully';
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TodosService);
//# sourceMappingURL=todos.service.js.map