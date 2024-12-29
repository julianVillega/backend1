import { createTransport } from "nodemailer";
import __dirname from "../../utils.js";

const { GMAIL_EMAIL, GMAIL_PASS } = process.env;

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: { user: GMAIL_EMAIL, pass: GMAIL_PASS },
});

export default async function sendEmail(data) {
  try {
    await transport.verify();
    await transport.sendMail({
      from: GMAIL_EMAIL,
      to: data.email,
      subject: "TiendaTuya Account Verification",
      html: `<h1>Verify your account<h1>
      <p>To verify your account, enter the following code on your next login</p>
      <p>Your verification code is:  ${data.verificationCode}  </p>`,
    });
  } catch (error) {
    throw error;
  }
}
