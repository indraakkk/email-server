import { Global, Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { EmailServer } from './smtp-server.service';

@Global()
@Module({
  providers: [QueueService, EmailServer],
  exports: [],
})
export class CommonModule {}
