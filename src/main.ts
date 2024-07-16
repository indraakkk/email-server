import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// start smtp server together with app server
// import { SMTPServer } from 'smtp-server';
// import { smtpServer } from './smtp-server';
import { EmailServer } from './common/smtp-server.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SMTP server
  const smtpServer = new EmailServer();
  await smtpServer.start();

  await app.listen(3000);
}
bootstrap();
