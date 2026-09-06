const { Resend } = require("resend");
const config = require("../config/env");

const resend = new Resend(config.resend.apiKey);


console.log("=== MAIL SERVICE ===");
console.log("Using Resend:", true);
console.log("Resend API key exists:", Boolean(config.resend.apiKey));
console.log("Resend sender:", config.resend.from);
console.log("====================");

const sendVerificationEmail = async ({ email, token }) => {
  const verificationUrl = `${config.clientUrl}/verify-email/${token}`;

  console.log("Sending reset email...");
console.log("To:", email);
console.log("From:", config.resend.from);
console.log("Client URL:", config.clientUrl);
console.log("API key exists:", Boolean(config.resend.apiKey));

  const { data, error } = await resend.emails.send({
    from: config.resend.from,
    to: [email],
    subject: "Verify your dbtPapers account",
    html: `
      <h2>Welcome to dbtPapers!</h2>

      <p>Please verify your email address by clicking the button below.</p>

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

      <p>Or copy and paste this link into your browser:</p>

      <p>${verificationUrl}</p>

      <p>This link will expire in 1 hour.</p>
    `,
  });

  if (error) {
  console.error("========== RESEND ERROR ==========");
  console.error(error);
  console.error("==================================");

  throw new Error(error.message || "Failed to send password reset email");
}

  console.log("Verification email sent:", data?.id);
};

const sendPasswordResetEmail = async ({ email, token }) => {
  const resetUrl = `${config.clientUrl}/reset-password/${token}`;

  const { data, error } = await resend.emails.send({
    from: config.resend.from,
    to: [email],
    subject: "Reset your dbtPapers password",
    html: `
      <h2>Reset your dbtPapers password</h2>

      <p>
        We received a request to reset your dbtPapers password.
      </p>

      <p>
        Click the button below to create a new password:
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

      <p>Or copy and paste this link into your browser:</p>

      <p>${resetUrl}</p>

      <p>
        This link will expire in 1 hour.
      </p>

      <p>
        If you did not request a password reset,
        you can safely ignore this email.
      </p>
    `,
  });

  if (error) {
  console.error("========== RESEND ERROR ==========");
  console.error(JSON.stringify(error, null, 2));
  console.error("==================================");

  throw new Error(error.message || "Failed to send password reset email");
}

  console.log("Password reset email sent:", data?.id);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};