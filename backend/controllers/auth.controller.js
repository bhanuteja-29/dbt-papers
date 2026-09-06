const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// VERIFY EMAIL
// =====================================================

const verifyEmail = async (req, res) => {
  try {
    const result = await authService.verifyEmail(
      req.params.token
    );

    return res.status(200).json({
      success: true,
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// LOGIN
// =====================================================

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(
      req.body
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// FORGOT PASSWORD
// =====================================================

const forgotPassword = async (req, res) => {
  try {
    const result =
      await authService.forgotPassword(
        req.body.email
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// RESET PASSWORD
// =====================================================

const resetPassword = async (req, res) => {
  try {
    const result =
      await authService.resetPassword(
        req.params.token,
        req.body.password
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================================================
// CHANGE PASSWORD
// =====================================================

const changePassword = async (req, res) => {
  try {
    const result =
      await authService.changePassword(
        req.user.sub,
        req.body.currentPassword,
        req.body.newPassword
      );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
};