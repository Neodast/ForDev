import nodemailer from 'nodemailer';
class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: String(process.env.SMTP_HOST),
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: String(process.env.SMTP_USER),
        pass: String(process.env.SMTP_PASSWORD),
      },
    });
  }
  async sendActivateEmail(email: string, link: string) {
    await this.transporter.sendMail({
      from: String(process.env.SMTP_USER),
      to: email,
      subject: 'Account activate',
      text: '',
      html: `
              <div>Your registration is successful.<a href="${link}">Click here!</a> to activate account.</div>
            `,
    });
  }
}

export default new EmailService();
