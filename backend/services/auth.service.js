const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { isUniversityEmail } = require("../utils/email.utils");
const VerificationToken = require("../models/VerificationToken");
const {
  generateVerificationToken,
  hashToken,
} = require("../utils/token.utils");
const { sendVerificationEmail } = require("./mail.service");

const VERIFICATION_TOKEN_EXPIRY_MS = 60 * 60 * 1000;
const { generateAccessToken } = require("../utils/jwt.utils");

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

  const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY_MS);

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

const verifyEmail = async (rawToken) => {
  const tokenHash = hashToken(rawToken);
  const verificationToken = await VerificationToken.findOne({
    tokenHash,
  });
  if (!verificationToken) {
    throw new Error("Invalid or expired verification token");
  }
  if (verificationToken.expiresAt < new Date()) {
    throw new Error("Verification token has expired");
  }
  const user = await User.findById(verificationToken.userId);
  if (!user) {
    throw new Error("User account not found");
  }
  user.isEmailVerified = true;

  await user.save();

  await VerificationToken.deleteOne({
    _id: verificationToken._id,
  });

  return {
    message: "Email verified successfully",
  };
};

const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isEmailVerified) {
    throw new Error("Please verify your email before logging in");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

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

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
};
