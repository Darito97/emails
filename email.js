import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: user,
    pass: pass,
  },
});

const sendEmail = (mailOptions, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send({ status: "error", message: "Email not sent" });
    } else {
      res.send({ status: "success", message: "Email sent" });
    }
  });
};

const sendEmailWithText = (to, subject, text, res) => {
  const mailOptions = {
    from: user,
    to: to,
    subject: subject,
    text: text,
  };
  sendEmail(mailOptions, res);
};

const sendEmailWithHTML = (to, subject, html, res) => {
  const mailOptions = {
    from: user,
    to: to,
    subject: subject,
    html: html,
  };
  sendEmail(mailOptions, res);
};

const sendEmailMethod = (req, res) => {
  const { to, subject, text, html } = req.body;
  if (text) {
    sendEmailWithText(to, subject, text, res);
  } else if (html) {
    sendEmailWithHTML(to, subject, html, res);
  } else {
    res.send({ status: "error", message: "Email not sent" });
  }
};

export default sendEmailMethod;
