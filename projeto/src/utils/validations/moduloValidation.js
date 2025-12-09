const Joi = require('joi');

class ModuloValidation {
  static create() {
    return Joi.object({
      titulo: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
          'string.base': 'Título do módulo deve ser um texto',
          'string.empty': 'Título do módulo não pode estar vazio',
          'string.min': 'Título do módulo deve ter no mínimo 3 caracteres',
          'string.max': 'Título do módulo não pode passar de 100 caracteres',
          'any.required': 'Título do módulo é obrigatório',
        }),

      ordem: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
          'number.base': 'Ordem deve ser um número',
          'number.integer': 'Ordem deve ser um número inteiro',
          'number.min': 'Ordem deve ser no mínimo 1',
          'any.required': 'Ordem é obrigatória',
        }),

      cursoId: Joi.number()
        .integer()
        .required()
        .messages({
          'number.base': 'cursoId deve ser um número',
          'number.integer': 'cursoId deve ser um número inteiro',
          'any.required': 'cursoId é obrigatório',
        }),
    });
  }

  static update() {
    return Joi.object({
      titulo: Joi.string()
        .min(3)
        .max(100)
        .optional()
        .messages({
          'string.base': 'Título do módulo deve ser um texto',
          'string.min': 'Título do módulo deve ter no mínimo 3 caracteres',
          'string.max': 'Título do módulo não pode passar de 100 caracteres',
        }),

      ordem: Joi.number()
        .integer()
        .min(1)
        .optional()
        .messages({
          'number.base': 'Ordem deve ser um número',
          'number.integer': 'Ordem deve ser um número inteiro',
          'number.min': 'Ordem deve ser no mínimo 1',
        }),

      cursoId: Joi.number()
        .integer()
        .optional()
        .messages({
          'number.base': 'cursoId deve ser um número',
          'number.integer': 'cursoId deve ser um número inteiro',
        }),
    }).min(1);
  }
}

module.exports = ModuloValidation;
