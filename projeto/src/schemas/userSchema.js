const Joi = require('joi');

exports.createUserSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  perfil: Joi.string().valid('aluno', 'professor').required(),
});
