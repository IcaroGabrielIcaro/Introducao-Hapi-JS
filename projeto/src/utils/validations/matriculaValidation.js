const Joi = require('joi');

class MatriculaValidation {
  // ----------------------
  // CREATE
  // ----------------------
  static create() {
    return Joi.object({
      alunoId: Joi.number()
        .integer()
        .required()
        .messages({
          'number.base': 'alunoId deve ser um número',
          'number.integer': 'alunoId deve ser um número inteiro',
          'any.required': 'alunoId é obrigatório',
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

  // ----------------------
  // UPDATE
  // ----------------------
  static update() {
    return Joi.object({
      alunoId: Joi.number()
        .integer()
        .optional()
        .messages({
          'number.base': 'alunoId deve ser um número',
          'number.integer': 'alunoId deve ser um número inteiro',
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

module.exports = MatriculaValidation;
