import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { QueueService } from './queue.service';
import { EmailServer } from './smtp-server.service';

@Global()
@Module({
  providers: [PrismaService, QueueService, EmailServer],
  exports: [PrismaService],
})
export class CommonModule {}
