import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Todos')
@Controller({ version: '1', path: 'todos' })
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @GetUser() user) {
    return this.todosService.create(createTodoDto, user);
  }

  @Get(':priority/priority')
  getByPriority(@Param('priority') priority: string) {
    return this.todosService.getByPriority(priority);
  }

  @Get(':status/status')
  getByStatus(@Param('status') status: string) {
    return this.todosService.getByStatus(status);
  }

  @Get(':category/category')
  getByCategory(@Param('category') category: string) {
    return this.todosService.getByCategory(category);
  }

  @Get('deadline')
  getByDeadline() {
    return this.todosService.getByDeadline();
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @GetUser() user,
  ) {
    return this.todosService.update(id, updateTodoDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user) {
    return this.todosService.remove(id, user);
  }
}
