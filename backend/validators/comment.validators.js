const Joi = require("joi");

const commentValidator = Joi.object({
    content: Joi.string()
        .trim()
        .min(1)
        .max(500)
        .required(),
});

module.exports = {
    commentValidator,
};