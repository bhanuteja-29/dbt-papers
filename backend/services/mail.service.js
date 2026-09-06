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


// =====================================================
// EMAIL VERIFICATION
// =====================================================

const sendVerificationEmail = async ({ email, token }) => {
  const verificationUrl =
    `${config.clientUrl}/verify-email/${token}`;

  await transporter.sendMail({
    from: config.mail.from,
    to: email,
    subject: "Verify your dbtPapers account",

    text: `Please verify your email by clicking this link:

${verificationUrl}

This link will expire in 1 hour.`,
  });
};


// =====================================================
// PASSWORD RESET
// =====================================================

const sendPasswordResetEmail = async ({ email, token }) => {
  const resetUrl =
    `${config.clientUrl}/reset-password/${token}`;

  await transporter.sendMail({
    from: config.mail.from,
    to: email,
    subject: "Reset your dbtPapers password",

    text: `We received a request to reset your dbtPapers password.

Click the link below to create a new password:

${resetUrl}

This link will expire in 1 hour.

If you did not request a password reset, you can safely ignore this email.`,
  });
};


module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};