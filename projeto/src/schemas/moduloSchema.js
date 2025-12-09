const Joi = require("joi");

exports.createModuloSchema = Joi.object({
    titulo: Joi.string().min(3).required(),
    ordem: Joi.number().integer().min(1).required(),
    cursoId: Joi.number().integer().required()
});
