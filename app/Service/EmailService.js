import { createTransport } from "nodemailer";
import path from 'path';
import { renderFile } from "ejs";

class EmailService {
  static transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  })

  async sendMailWithTemplate(
    receiver,
    subject,
    // template,
    // templateParams
  ) {
    EmailService.transporter.sendMail({
      from: "tranvietvu0218@gmail.com", 
      to: "viettoan290696@gmail.com",
      subject: 'test1', 
      // html: await renderFile(path.resolve('./views/' + template), templateParams)
      text: 'hi'
    })
  }
};

export default EmailService