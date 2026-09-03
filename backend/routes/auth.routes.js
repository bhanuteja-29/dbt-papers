const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const { registerSchema,loginSchema } = require("../validators/auth.validators");
const validationMiddleware = require("../middleware/validation.middleware");

router.post(
    "/register",
    validationMiddleware(registerSchema),
    authController.register
);

router.get(
    "/verify-email/:token",
    authController.verifyEmail
);

router.post(
    "/login",
    validationMiddleware(loginSchema),
    authController.login
);

module.exports = router;