import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().max(100).trim().required(),
  password: Joi.string().min(6).max(25).trim().required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required()
});