const Joi = require('joi');

exports.createMatriculaSchema = Joi.object({
  alunoId: Joi.number().integer().required(),
  cursoId: Joi.number().integer().required(),
});
