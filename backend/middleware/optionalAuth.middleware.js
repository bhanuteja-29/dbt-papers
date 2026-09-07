const { verifyAccessToken } = require("../utils/jwt.utils");

const optionalAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme === "Bearer" && token) {
    try {
      req.user = verifyAccessToken(token);
    } catch (error) {
      // The paper remains public; an invalid token is treated as anonymous.
    }
  }

  next();
};

module.exports = optionalAuthenticate;
