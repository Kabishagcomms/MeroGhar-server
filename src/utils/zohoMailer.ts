import { createTransport } from "nodemailer";
import * as dotenv from "dotenv";
import { mailBody } from "../interfaces/mail";

dotenv.config();

const transporter = createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

export const sendMail = async (mailOptions: mailBody): Promise<boolean> => {
  try {
    // Validate email recipient
    if (!mailOptions.to) {
      console.error("Mail send failed: No recipient defined");
      return false;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully using Zoho");
    return true;
  } catch (e) {
    console.error("Mail send failed:", e);
    // Return false instead of throwing the error
    return false;
  }
};
