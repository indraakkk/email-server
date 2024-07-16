export class NewEmailRequest {
  username: string;
  password: string;
  from: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  text: string;
  html: string;
}
