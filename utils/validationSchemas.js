const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().min(5).max(30).required(),
  password: Joi.string().min(6).required(),
});

const signinSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const questCompletionSchema = Joi.object({
  questId: Joi.string().required(),
  photoUrl: Joi.string().required(),
});

module.exports = {
  signupSchema,
  signinSchema,
  questCompletionSchema,
};
