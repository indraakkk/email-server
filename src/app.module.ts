import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { CommonModule } from './common/common.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot(), EmailsModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
