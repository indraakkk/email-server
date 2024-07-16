import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [EmailsModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
