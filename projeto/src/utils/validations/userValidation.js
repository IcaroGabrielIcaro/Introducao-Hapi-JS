const Joi = require('joi');

class UserValidation {
  static create() {
    return Joi.object({
      username: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
          'string.base': 'Nome do usuário deve ser um texto',
          'string.empty': 'Nome do usuário não pode estar vazio',
          'string.min': 'Nome do usuário deve ter no mínimo 3 caracteres',
          'string.max': 'Nome do usuário não pode passar de 100 caracteres',
          'any.required': 'Nome do usuário é obrigatório',
        }),

      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.base': 'E-mail deve ser um texto',
          'string.empty': 'E-mail não pode estar vazio',
          'string.email': 'E-mail inválido',
          'any.required': 'E-mail é obrigatório',
        }),

      password: Joi.string()
        .min(6)
        .required()
        .messages({
          'string.base': 'Senha deve ser um texto',
          'string.empty': 'Senha não pode estar vazia',
          'string.min': 'Senha deve ter no mínimo 6 caracteres',
          'any.required': 'Senha é obrigatória',
        }),

      perfil: Joi.string()
        .valid('aluno', 'professor')
        .required()
        .messages({
          'string.base': 'Perfil deve ser um texto',
          'any.only': 'Perfil deve ser "aluno" ou "professor"',
          'any.required': 'Perfil é obrigatório',
        }),
    });
  }

  static update() {
    return Joi.object({
      username: Joi.string()
        .min(3)
        .max(100)
        .optional()
        .messages({
          'string.base': 'Nome do usuário deve ser um texto',
          'string.min': 'Nome do usuário deve ter no mínimo 3 caracteres',
          'string.max': 'Nome do usuário não pode passar de 100 caracteres',
        }),

      email: Joi.string()
        .email()
        .optional()
        .messages({
          'string.email': 'E-mail inválido',
        }),

      password: Joi.string()
        .min(6)
        .optional()
        .messages({
          'string.min': 'Senha deve ter no mínimo 6 caracteres',
        }),
    });
  }
}

module.exports = UserValidation;
