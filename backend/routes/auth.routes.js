const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} = require("../validators/auth.validators");

const validationMiddleware = require("../middleware/validation.middleware");
const authenticate = require("../middleware/auth.middleware");


// =====================================================
// REGISTER
// =====================================================

router.post(
  "/register",
  validationMiddleware(registerSchema),
  authController.register
);


// =====================================================
// VERIFY EMAIL
// =====================================================

router.get(
  "/verify-email/:token",
  authController.verifyEmail
);


// =====================================================
// LOGIN
// =====================================================

router.post(
  "/login",
  validationMiddleware(loginSchema),
  authController.login
);


// =====================================================
// FORGOT PASSWORD
// =====================================================

router.post(
  "/forgot-password",
  validationMiddleware(forgotPasswordSchema),
  authController.forgotPassword
);


// =====================================================
// RESET PASSWORD
// =====================================================

router.post(
  "/reset-password/:token",
  validationMiddleware(resetPasswordSchema),
  authController.resetPassword
);


// =====================================================
// CHANGE PASSWORD
// =====================================================

router.patch(
  "/change-password",
  authenticate,
  validationMiddleware(changePasswordSchema),
  authController.changePassword
);


module.exports = router;