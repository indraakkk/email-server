import { SMTPServer } from 'smtp-server';
import { MailParser } from 'mailparser';
import { Injectable } from '@nestjs/common';
import { QueueService } from './queue.service';

@Injectable()
export class EmailServer {
  private server: SMTPServer;

  constructor() {
    this.server = new SMTPServer({
      secure: false,
      onAuth(auth, session, callback) {
        const username = process.env.SMTP_USERNAME;
        const password = process.env.SMTP_PASSWORD;

        if (auth.username !== username || auth.password !== password) {
          return callback(new Error('Invalid username or password'));
        }

        callback(null, { user: 123 }); // where 123 is the user id or similar property
      },

      onData(stream, session, callback) {
        let payload = {};
        const mailparser = new MailParser();

        mailparser.on('headers', (headers) => {
          payload = {
            ...payload,
            subject: headers.get('subject'),
            from: headers.get('from'),
            to: headers.get('to'),
            cc: headers.get('cc'),
            bcc: headers.get('bcc'),
            date: headers.get('date'),
          };
        });

        mailparser.on('data', (data) => {
          payload = {
            ...payload,
            text: data.text,
            html: data.html,
          };
        });

        mailparser.on('end', async () => {
          const queue = new QueueService();

          const dataToIns = {
            payload: payload,
          };

          await queue.addToQueue(dataToIns);
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
  }

  async start() {
    const port = process.env.SMTP_PORT || 2525;
    this.server.listen(port, () => {
      console.log(`SMTP server listening on port ${port}`);
    });
  }
}
