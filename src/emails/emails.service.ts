import { Injectable } from '@nestjs/common';
import { queue } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class EmailsService {
  constructor(private prisma: PrismaService) {}

  async getEmails(): Promise<queue[]> {
    return await this.prisma.queue.findMany();
  }
}
