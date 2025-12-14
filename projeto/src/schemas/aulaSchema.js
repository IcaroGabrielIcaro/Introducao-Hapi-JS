const Joi = require('joi');

exports.createAulaSchema = Joi.object({
    moduloId: Joi.number().integer().required(),
    titulo: Joi.string().max(100).required(),
    conteudo: Joi.string().required(),
    duracao: Joi.number().integer().min(1).required(), 
    ordem: Joi.number().integer().min(1).default(1),
});