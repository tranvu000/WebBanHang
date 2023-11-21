import { createTransport } from "nodemailer";
import path from 'path';
import { renderFile } from "ejs";

class EmailService {
  constructor() {
    this.transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }

  async sendMailWithTemplate(
    receiver,
    subject,
    template,
    templateParams
  ) {
    this.transporter.sendMail({
      from: "tranvietvu0218@gmail.com", 
      to: receiver,
      subject, 
      html: await renderFile(path.resolve('./views/' + template), templateParams)
    })
  }
};

export default EmailService