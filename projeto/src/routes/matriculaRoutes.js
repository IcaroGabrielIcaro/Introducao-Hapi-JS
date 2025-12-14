const Joi = require("joi");
const MatriculaHandler = require("../handlers/matriculaHandler");
const MatriculaValidation = require("../utils/validations/matriculaValidation");

module.exports = {
    name: 'matricula-routes',
    version: '1.0.0',

    register: async (server) => {
        server.route([
            // ----------------------------------
            // CREATE
            // ----------------------------------
            {
                method: 'POST',
                path: '/matriculas',
                handler: MatriculaHandler.create,

                options: {
                    tags: ['api'],
                    description: 'Criar matrícula',
                    auth: false,

                    validate: {
                        payload: MatriculaValidation.create()
                    },

                    response: {
                        failAction: 'log',
                        status: {
                            201: Joi.object().unknown(true),
                            400: Joi.object({ message: Joi.string() }),
                            403: Joi.object({ message: Joi.string() }),
                            404: Joi.object({ message: Joi.string() })
                        }
                    }
                }
            },

            // ----------------------------------
            // LIST
            // ----------------------------------
            {
                method: 'GET',
                path: '/matriculas',
                handler: MatriculaHandler.list,

                options: {
                    tags: ['api'],
                    description: 'Listar matrículas',
                    auth: false,

                    response: {
                        failAction: 'log',
                        status: {
                            200: Joi.array().items(Joi.object().unknown(true))
                        }
                    }
                }
            },

            // ----------------------------------
            // GET BY ID
            // ----------------------------------
            {
                method: 'GET',
                path: '/matriculas/{id}',
                handler: MatriculaHandler.get,

                options: {
                    tags: ['api'],
                    description: 'Obter matrícula por ID',
                    auth: false,

                    validate: {
                        params: Joi.object({
                            id: Joi.number().required()
                        })
                    },

                    response: {
                        failAction: 'log',
                        status: {
                            200: Joi.object().unknown(true),
                            404: Joi.object({ message: Joi.string() })
                        }
                    }
                }
            },
            // ----------------------------------
            // UPDATE
            // ----------------------------------
            {
                method: 'PUT',
                path: '/matriculas/{id}',
                handler: MatriculaHandler.update,

                options: {
                    tags: ['api'],
                    description: 'Atualizar matrícula',
                    auth: false,

                validate: {
                    params: Joi.object({
                        id: Joi.number().integer().positive().required()
                    }),

                    payload: MatriculaValidation.update()
                    },


                    response: {
                        failAction: 'log',
                        status: {
                            200: Joi.object().unknown(true),
                            404: Joi.object({ message: Joi.string() }),
                            403: Joi.object({ message: Joi.string() })
                        }
                    }
                }
            },

            // ----------------------------------
            // DELETE
            // ----------------------------------
            {
                method: 'DELETE',
                path: '/matriculas/{id}',
                handler: MatriculaHandler.delete,

                options: {
                    tags: ['api'],
                    description: 'Deletar matrícula',
                    auth: false,

                    validate: {
                        params: Joi.object({
                            id: Joi.number().required()
                        })
                    },

                    response: {
                        failAction: 'log',
                        status: {
                            200: Joi.object({ message: Joi.string() }),
                            404: Joi.object({ message: Joi.string() })
                        }
                    }
                }
            }
        ]);
    }
};
