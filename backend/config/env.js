require("dotenv").config();

const config = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: process.env.PORT || 5000,

  mongoUri: process.env.MONGO_URI,

  jwtSecret: process.env.JWT_SECRET,

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",

  clientUrl: process.env.CLIENT_URL,

  universityEmailDomains: process.env.UNIVERSITY_EMAIL_DOMAINS
    ? process.env.UNIVERSITY_EMAIL_DOMAINS.split(",").map((domain) =>
        domain.trim().toLowerCase(),
      )
    : [],
  mailjet: {
    apiKey: process.env.MAILJET_API_KEY,
    secretKey: process.env.MAILJET_SECRET_KEY,
    fromEmail: process.env.MAILJET_FROM_EMAIL,
    fromName: process.env.MAILJET_FROM_NAME || "dbtPapers",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};

module.exports = config;
