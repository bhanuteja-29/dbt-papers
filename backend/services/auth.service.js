const bcrypt = require("bcryptjs");

const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const PasswordResetToken = require("../models/PasswordResetToken");

const { isUniversityEmail } = require("../utils/email.utils");

const {
  generateVerificationToken,
  hashToken,
} = require("../utils/token.utils");

const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require("./mail.service");

const { generateAccessToken } = require("../utils/jwt.utils");

const VERIFICATION_TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour
const PASSWORD_RESET_TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour


// =====================================================
// REGISTER
// =====================================================

const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  if (!isUniversityEmail(normalizedEmail)) {
    throw new Error("Only university email addresses are allowed");
  }

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email: normalizedEmail,
    passwordHash,
  });

  const rawToken = generateVerificationToken();
  const tokenHash = hashToken(rawToken);

  const expiresAt = new Date(
    Date.now() + VERIFICATION_TOKEN_EXPIRY_MS
  );

  await VerificationToken.create({
    userId: user._id,
    tokenHash,
    expiresAt,
  });

  await sendVerificationEmail({
    email: user.email,
    token: rawToken,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  };
};


// =====================================================
// VERIFY EMAIL
// =====================================================

const verifyEmail = async (rawToken) => {
  const tokenHash = hashToken(rawToken);

  const verificationToken =
    await VerificationToken.findOne({
      tokenHash,
    });

  if (!verificationToken) {
    throw new Error("Invalid or expired verification token");
  }

  if (verificationToken.expiresAt < new Date()) {
    await VerificationToken.deleteOne({
      _id: verificationToken._id,
    });

    throw new Error("Verification token has expired");
  }

  const user = await User.findById(
    verificationToken.userId
  );

  if (!user) {
    throw new Error("User account not found");
  }

  user.isEmailVerified = true;

  await user.save();

  await VerificationToken.deleteOne({
    _id: verificationToken._id,
  });

  // Automatically log the user in
  const accessToken = generateAccessToken(user);

  return {
    message: "Email verified successfully",
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};


// =====================================================
// LOGIN
// =====================================================

const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isEmailVerified) {
    throw new Error(
      "Please verify your email before logging in"
    );
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user);

  return {
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};


// =====================================================
// FORGOT PASSWORD
// =====================================================

const forgotPassword = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  /*
   * Do not reveal whether an account exists.
   * This prevents email/account enumeration.
   */
  if (!user) {
    return {
      message:
        "If an account exists with this email, a password reset link has been sent.",
    };
  }

  // Remove any previous reset tokens
  await PasswordResetToken.deleteMany({
    userId: user._id,
  });

  const rawToken = generateVerificationToken();
  const tokenHash = hashToken(rawToken);

  const expiresAt = new Date(
    Date.now() + PASSWORD_RESET_TOKEN_EXPIRY_MS
  );

  await PasswordResetToken.create({
    userId: user._id,
    tokenHash,
    expiresAt,
  });

  await sendPasswordResetEmail({
    email: user.email,
    token: rawToken,
  });

  return {
    message:
      "If an account exists with this email, a password reset link has been sent.",
  };
};


// =====================================================
// RESET PASSWORD
// =====================================================

const resetPassword = async (rawToken, password) => {
  const tokenHash = hashToken(rawToken);

  const resetToken =
    await PasswordResetToken.findOne({
      tokenHash,
    });

  if (!resetToken) {
    throw new Error(
      "Invalid or expired password reset link"
    );
  }

  if (resetToken.expiresAt < new Date()) {
    await PasswordResetToken.deleteOne({
      _id: resetToken._id,
    });

    throw new Error(
      "Password reset link has expired"
    );
  }

  const user = await User.findById(
    resetToken.userId
  );

  if (!user) {
    await PasswordResetToken.deleteOne({
      _id: resetToken._id,
    });

    throw new Error("User account not found");
  }

  const passwordHash = await bcrypt.hash(
    password,
    12
  );

  user.passwordHash = passwordHash;

  await user.save();

  // Make the reset token one-time use
  await PasswordResetToken.deleteOne({
    _id: resetToken._id,
  });

  return {
    message:
      "Password reset successfully. Please log in with your new password.",
  };
};


// =====================================================
// CHANGE PASSWORD
// =====================================================

const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User account not found");
  }

  const isCurrentPasswordValid =
    await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );

  if (!isCurrentPasswordValid) {
    throw new Error("Current password is incorrect");
  }

  if (currentPassword === newPassword) {
    throw new Error(
      "New password must be different from your current password"
    );
  }

  user.passwordHash = await bcrypt.hash(
    newPassword,
    12
  );

  await user.save();

  return {
    message: "Password changed successfully",
  };
};





module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
};