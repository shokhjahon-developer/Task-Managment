import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.history.findMany({
      include: {
        user: true,
        todo: true,
      },
    });
  }

  async findOne(id: string) {
    const history = await this.prisma.history.findFirst({
      where: { id: id },
      include: { user: true, todo: true },
    });
    if (!history) {
      throw new NotFoundException(`History with id #${id} not found`);
    }
    return history;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.history.delete({ where: { id: id } });
    return `History with id #${id} has been deleted`;
  }
}
