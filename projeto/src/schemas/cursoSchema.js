const Joi = require('joi');

exports.createCursoSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().required(),
    professorId: Joi.number().integer().required()
});
