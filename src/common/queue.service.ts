import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { queue } from '@prisma/client';

@Injectable()
export class QueueService {
  private queue: unknown[] = [];
  private readonly batchSize = 100;
  private streamActive = false;

  async addToQueue(data: unknown) {
    this.queue.push(data);
    if (this.queue.length >= this.batchSize || !this.streamActive) {
      await this.processQueue();
    }
  }

  async processQueue() {
    const emailsToInsert = this.queue.splice(
      0,
      Math.min(this.queue.length, this.batchSize),
    ); // Extract limited or all emails

    await this.insertEmails(emailsToInsert as queue[]);
  }

  private async insertEmails(emails: queue[]) {
    try {
      const prisma = new PrismaService();
      console.log('happen here');
      await prisma.queue.createMany({ data: emails });
      // await this.prisma.queue.findMany();
      console.log('Batch of emails inserted into database successfully!');
    } catch (error) {
      console.error('Error inserting email data:', error);
    }
  }

  setStreamActive(active: boolean) {
    console.log(active);
    this.streamActive = active;
  }
}
