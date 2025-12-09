const Joi = require('joi');

class CursoValidation {
  static create() {
    return Joi.object({
      nome: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
          'string.base': 'Nome do curso deve ser um texto',
          'string.empty': 'Nome do curso não pode estar vazio',
          'string.min': 'Nome do curso deve ter no mínimo 3 caracteres',
          'string.max': 'Nome do curso não pode passar de 100 caracteres',
          'any.required': 'Nome do curso é obrigatório',
        }),

      descricao: Joi.string()
        .min(5)
        .required()
        .messages({
          'string.base': 'Descrição deve ser um texto',
          'string.empty': 'Descrição não pode estar vazia',
          'string.min': 'Descrição deve ter no mínimo 5 caracteres',
          'any.required': 'Descrição é obrigatória',
        }),

      professorId: Joi.number()
        .integer()
        .required()
        .messages({
          'number.base': 'professorId deve ser um número',
          'number.integer': 'professorId deve ser um número inteiro',
          'any.required': 'professorId é obrigatório',
        }),
    });
  }

  static update() {
    return Joi.object({
      nome: Joi.string()
        .min(3)
        .max(100)
        .optional()
        .messages({
          'string.base': 'Nome do curso deve ser um texto',
          'string.min': 'Nome do curso deve ter no mínimo 3 caracteres',
          'string.max': 'Nome do curso não pode passar de 100 caracteres',
        }),

      descricao: Joi.string()
        .min(5)
        .optional()
        .messages({
          'string.base': 'Descrição deve ser um texto',
          'string.min': 'Descrição deve ter no mínimo 5 caracteres',
        }),

      professorId: Joi.number()
        .integer()
        .optional()
        .messages({
          'number.base': 'professorId deve ser um número',
          'number.integer': 'professorId deve ser um número inteiro',
        }),
    }).min(1); // Pelo menos um campo deve ser atualizado
  }
}

module.exports = CursoValidation;
