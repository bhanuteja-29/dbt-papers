const nodemailer = require("nodemailer");
const config = require("../config/env");

const transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: false,
    auth: {
        user: config.mail.user,
        pass: config.mail.password,
    },
});

const sendVerificationEmail = async ({ email, token }) => {
  const verificationUrl = `${config.clientUrl}/verify-email/${token}`;
  // build verification URL
  // send email
  await transporter.sendMail({
    from: config.mail.from,
    to: email,
    subject: "Verify your University PYQ Hub account",
    text: `Please verify your email by clicking this link:

${verificationUrl}

This link will expire in 1 hour.`,
  });
};

module.exports = {
    sendVerificationEmail
};