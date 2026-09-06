const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .required(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required(),

  newPassword: Joi.string()
    .min(8)
    .required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
};