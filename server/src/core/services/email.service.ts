import { injectable } from 'inversify';
import nodemailer from 'nodemailer';
import { env } from '../../utils/env.scheme';

@injectable()
class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: true,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivateEmail(email: string, link: string): Promise<void> {
    await this.transporter.sendMail({
      from: env.SMTP_USER,
      to: email,
      subject: 'Account activate',
      text: '',
      html: `
              <div>Your registration is successful.<a href="${link}">Click here!</a> to activate account.</div>
            `,
    });
  }
}

export default EmailService;
