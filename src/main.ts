import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// start smtp server together with app server
// import { SMTPServer } from 'smtp-server';
import { smtpServer } from './smtp-server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SMTP server
  smtpServer.listen(2525, () => {
    console.log('SMTP server listening on port 25');
  });

  await app.listen(3000);
}
bootstrap();
