const Joi = require('joi');

class AulaValidation {
    static create() {
        return Joi.object({
            moduloId: Joi.number()
                .integer()
                .required()
                .messages({
                    'number.base': 'moduloId deve ser um número',
                    'number.integer': 'moduloId deve ser um número inteiro',
                    'any.required': 'moduloId é obrigatório',
                }),

            titulo: Joi.string()
                .max(100)
                .required()
                .messages({
                    'string.base': 'Título deve ser um texto',
                    'string.empty': 'Título não pode estar vazio',
                    'string.max': 'Título não pode ter mais de 100 caracteres',
                    'any.required': 'Título é obrigatório',
                }),

            conteudo: Joi.string()
                .required()
                .messages({
                    'string.base': 'Conteúdo deve ser um texto',
                    'string.empty': 'Conteúdo não pode estar vazio',
                    'any.required': 'Conteúdo é obrigatório',
                }),

            duracao: Joi.number()
                .integer()
                .min(1)
                .required()
                .messages({
                    'number.base': 'Duração deve ser um número',
                    'number.integer': 'Duração deve ser um número inteiro',
                    'number.min': 'Duração deve ser no mínimo 1 minuto',
                    'any.required': 'Duração é obrigatória',
                }),

            ordem: Joi.number()
                .integer()
                .min(1)
                .default(1)
                .messages({
                    'number.base': 'Ordem deve ser um número',
                    'number.integer': 'Ordem deve ser um número inteiro',
                    'number.min': 'Ordem deve ser no mínimo 1',
                }),
        });
    }

    static update() {
        return Joi.object({
            moduloId: Joi.number()
                .integer()
                .optional()
                .messages({
                    'number.base': 'moduloId deve ser um número',
                    'number.integer': 'moduloId deve ser um número inteiro',
                }),

            titulo: Joi.string()
                .max(100)
                .optional()
                .messages({
                    'string.base': 'Título deve ser um texto',
                    'string.max': 'Título não pode ter mais de 100 caracteres',
                }),

            conteudo: Joi.string()
                .optional()
                .messages({
                    'string.base': 'Conteúdo deve ser um texto',
                }),

            duracao: Joi.number()
                .integer()
                .min(1)
                .optional()
                .messages({
                    'number.base': 'Duração deve ser um número',
                    'number.integer': 'Duração deve ser um número inteiro',
                    'number.min': 'Duração deve ser no mínimo 1 minuto',
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
        }).min(1); 
    }
}

module.exports = AulaValidation;
