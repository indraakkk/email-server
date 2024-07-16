import { Controller, Get } from '@nestjs/common';
import { createTransport } from 'nodemailer';
@Controller('emails')
export class EmailsController {
  @Get()
  async health() {
    const tx = createTransport({
      host: 'localhost',
      port: 2525,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'abc',
        pass: 'def',
      },
      // === add this === //
      tls: { rejectUnauthorized: false },
    });

    const info = await tx.sendMail({
      from: '"indra" <maddison53@example.com>', // sender address
      to: 'in@example.com, dra@example.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
  }
}
