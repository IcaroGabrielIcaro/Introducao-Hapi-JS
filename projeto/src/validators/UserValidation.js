const Joi = require('joi');

class UserValidation {
  static create() {
    return Joi.object({
      username: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),

      // ✅ NOVO CAMPO
      perfil: Joi.string().valid('aluno', 'professor').required(),
    });
  }

  static update() {
    return Joi.object({
      username: Joi.string().min(3).max(100).optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().min(6).optional(),
    });
  }
}

module.exports = UserValidation;
