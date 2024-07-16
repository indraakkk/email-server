import { SMTPServer } from 'smtp-server';
import { MailParser } from 'mailparser';
import { PrismaService } from './common/prisma.service';
import { Prisma } from '@prisma/client';

export const smtpServer = new SMTPServer({
  secure: false,
  onAuth(auth, session, callback) {
    if (auth.username !== 'abc' || auth.password !== 'def') {
      return callback(new Error('Invalid username or password'));
    }

    callback(null, { user: 123 }); // where 123 is the user id or similar property
  },

  onData(stream, session, callback) {
    let subject: unknown, data: unknown;
    var mailparser = new MailParser();

    mailparser.on('headers', (headers) => {
      subject = headers.get('subject');
    });

    mailparser.on('data', (data) => {
      if (data.type === 'text') {
        data = data;
      }
    });

    mailparser.on('end', async () => {
      console.log(subject);

      console.log(data);

      // store data in queue
      // const prismaService = new PrismaService();
      // const result = await prismaService.$queryRaw(
      //   Prisma.sql`
      //   SELECT version()
      //   `,
      // );

      // const users = await prismaService.users.findMany();
      // console.log(users);
    });

    stream.pipe(mailparser);

    stream.on('end', () => {
      let err: any;
      if (stream.sizeExceeded) {
        err = new Error('Message exceeds fixed maximum message size');
        err.responseCode = 552;
        return callback(err);
      }
      callback(null);
    });
  },
});
