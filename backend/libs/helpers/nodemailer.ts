import nodemailer, { Transporter } from 'nodemailer';
import { IMailer } from 'interfaces/mailer';
import 'dotenv/config';

const { UKRNET_API_KEY, MAIL_UKRNET_FROM } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: MAIL_UKRNET_FROM as string,
    pass: UKRNET_API_KEY as string,
  },
};
const transport: Transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (email: IMailer): Promise<boolean> => {
  await transport.sendMail(email);
  return true;
};

export default sendEmail;
