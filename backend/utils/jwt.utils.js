const jwt = require("jsonwebtoken");
const config = require("../config/env");

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user._id.toString(),
            role: user.role,
        },
        config.jwt.secret,
        {
            expiresIn: "1h",
        }
    );
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, config.jwt.secret);
};

module.exports = {
    generateAccessToken,
    verifyAccessToken,
};