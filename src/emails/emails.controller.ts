import { Body, Controller, Get, Post } from '@nestjs/common';
import { queue, users } from '@prisma/client';
// import { createTransport } from 'nodemailer';
import * as nodemailer from 'nodemailer';
import { PrismaService } from 'src/common/prisma.service';
import { NewEmailRequest } from '../model/Email';
@Controller('emails')
export class EmailsController {
  constructor(private prisma: PrismaService) {}

  private async createTx({ user, pass }): Promise<nodemailer.createTransport> {
    const txOpt = {
      host: 'localhost',
      port: 2525,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: user,
        pass: pass,
      },
      tls: { rejectUnauthorized: false },
    };

    const tx = nodemailer.createTransport(txOpt);
    await tx.verify();
    return tx;
  }

  @Get('/health')
  async health() {
    const tx = await this.createTx({
      user: process.env.SMTP_USERNAME || '',
      pass: process.env.SMTP_PASSWORD || '',
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

  // get all image stored to db processed by queue
  @Get()
  async user(): Promise<queue[]> {
    return this.prisma.queue.findMany();
  }

  // post new email store using queue
  @Post()
  async storeEmail(@Body() request: NewEmailRequest) {
    const tx = await this.createTx({
      user: request.username,
      pass: request.password,
    });

    try {
      await tx.sendMail({
        from: request.from,
        to: request.to,
        cc: request.cc,
        bcc: request.bcc,
        subject: request.text,
        text: request.text,
        html: request.html,
      });

      return { success: true, message: 'send email successfully' };
    } catch (error) {
      throw error;
    }
  }
}
