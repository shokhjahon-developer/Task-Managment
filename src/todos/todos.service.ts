import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Priority, Status } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    {
      title,
      description,
      deadline,
      priority,
      status,
      categoryId,
    }: CreateTodoDto,
    user,
  ) {
    const category = await this.prisma.category.findFirst({
      where: { id: categoryId },
    });
    if (!category) throw new BadRequestException('Invalid category provided!');

    const deadlineDate = new Date(deadline);
    const nowDate = new Date();

    if (deadlineDate <= nowDate) {
      throw new BadRequestException('Deadline cannot be in the past!');
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

  async findOne(id: string) {
    const todo = await this.prisma.todo.findFirst({ where: { id: id } });
    if (!todo) throw new BadRequestException('Invalid id provided!');
    return todo;
  }

  async getByPriority(priority: string) {
    if (!Object.values(Priority).includes(priority as Priority)) {
      throw new BadRequestException(
        `Invalid priority value, it must be one of them: 'high', 'low', 'medium'`,
      );
    }

    const todos = await this.prisma.todo.findMany({
      where: { priority: priority as Priority },
    });

    return todos;
  }

  async getByStatus(status: string) {
    if (!Object.values(Status).includes(status as Status)) {
      throw new BadRequestException(
        `Invalid status value, it must be one of them: 'toDo', 'inProgress', 'completed`,
      );
    }
    const todos = await this.prisma.todo.findMany({
      where: { status: status as Status },
    });
    return todos;
  }

  async getByCategory(category: string) {
    category = category.toLowerCase();
    const todos = await this.prisma.category.findMany({
      where: { name: category },
      include: {
        todos: true,
      },
    });
    if (!todos.length) {
      throw new BadRequestException('Invalid category provided!');
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

  async update(
    id: string,
    {
      title,
      description,
      deadline,
      priority,
      status,
      categoryId,
    }: UpdateTodoDto,
    user,
  ) {
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

    if (!category) throw new BadRequestException('Invalid category provided!');
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

  async remove(id: string, user) {
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
}
