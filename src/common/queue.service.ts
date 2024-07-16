import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class QueueService {
  constructor(private prisma: PrismaService) {}

  async storeQueue(payload: unknown) {
    const store = this.prisma.$queryRaw(Prisma.sql`
      INSERT
    `);
  }
}
