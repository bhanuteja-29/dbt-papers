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
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
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
