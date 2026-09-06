const Mailjet = require("node-mailjet");
const config = require("../config/env");

const mailjet = Mailjet.apiConnect(
  config.mailjet.apiKey,
  config.mailjet.secretKey
);

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const request = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: config.mailjet.fromEmail,
              Name: config.mailjet.fromName,
            },

            To: [
              {
                Email: to,
              },
            ],

            Subject: subject,

            TextPart: text,

            HTMLPart: html,
          },
        ],
      });

    console.log("Mailjet email sent:", request.body);

    return request.body;
  } catch (error) {
    console.error(
      "Mailjet email error:",
      error?.response?.body || error?.body || error
    );

    throw new Error("Failed to send email");
  }
};


const sendVerificationEmail = async ({ email, token }) => {
  const verificationUrl =
    `${config.clientUrl}/verify-email/${token}`;

  return sendEmail({
    to: email,

    subject: "Verify your dbtPapers account",

    text: `
Welcome to dbtPapers!

Please verify your account by clicking the link below:

${verificationUrl}

If you did not create this account, you can ignore this email.
    `,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to dbtPapers!</h2>

        <p>
          Thanks for creating your account.
          Please verify your email address to continue.
        </p>

        <p>
          <a
            href="${verificationUrl}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#2563eb;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Verify Email
          </a>
        </p>

        <p>
          Or copy this link into your browser:
        </p>

        <p>${verificationUrl}</p>

        <p>
          If you did not create this account, you can ignore this email.
        </p>
      </div>
    `,
  });
};


const sendPasswordResetEmail = async ({ email, token }) => {
  const resetUrl =
    `${config.clientUrl}/reset-password/${token}`;

  return sendEmail({
    to: email,

    subject: "Reset your dbtPapers password",

    text: `
You requested a password reset for your dbtPapers account.

Reset your password using this link:

${resetUrl}

This link will expire according to the password reset policy of dbtPapers.

If you did not request this password reset, you can ignore this email.
    `,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Password Reset</h2>

        <p>
          We received a request to reset your dbtPapers password.
        </p>

        <p>
          Click the button below to reset your password:
        </p>

        <p>
          <a
            href="${resetUrl}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#2563eb;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Reset Password
          </a>
        </p>

        <p>
          Or copy this link into your browser:
        </p>

        <p>${resetUrl}</p>

        <p>
          If you did not request this password reset,
          you can safely ignore this email.
        </p>
      </div>
    `,
  });
};


module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};