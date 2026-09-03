const { verifyAccessToken } = require("../utils/jwt.utils");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication format",
    });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  

  next();
};


module.exports = authenticate;