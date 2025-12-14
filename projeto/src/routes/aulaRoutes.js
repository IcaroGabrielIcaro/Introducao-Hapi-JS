const Joi = require("joi");
const AulaHandler = require("../handlers/aulaHandler");
const AulaValidation = require("../utils/validations/aulaValidation");

module.exports = {
    name: 'aula-routes',
    version: '1.0.0',

    register: async (server) => {
        server.route([
            // ----------------------------------
            // CREATE
            // ----------------------------------
            {
                method: 'POST',
                path: '/aulas',
                handler: AulaHandler.create,

                options: {
                    tags: ['api'],
                    description: 'Criar aula',
                    auth: false,

                    validate: {
                        payload: AulaValidation.create()
                    },

                    response: {
                        failAction: 'log',
                        status: {
                            201: Joi.object().unknown(true),
                            400: Joi.object({ message: Joi.string() }),
                            403: Joi.object({ message: Joi.string() })
                        }
                    }
                }
            },

            // ----------------------------------
            // LIST
            // ----------------------------------
            {
                method: 'GET',
                path: '/aulas',
                handler: AulaHandler.list,

                options: {
                    tags: ['api'],
                    description: 'Listar aulas',
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
                path: '/aulas/{id}',
                handler: AulaHandler.get,

                options: {
                    tags: ['api'],
                    description: 'Obter aula por ID',
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
                            404: Joi.object({ message: Joi.string() }),
                            403: Joi.object({ message: Joi.string() })
                        }
                    }
                }
            },

            // ----------------------------------
            // UPDATE
            // ----------------------------------
            {
                method: 'PUT',
                path: '/aulas/{id}',
                handler: AulaHandler.update,

                options: {
                    tags: ['api'],
                    description: 'Atualizar aula',
                    auth: false,

                    validate: {
                        params: Joi.object({
                            id: Joi.number().required()
                        }),
                        payload: AulaValidation.update()
                    },

                    response: {
                        failAction: 'log',
                        status: {
                            200: Joi.object().unknown(true),
                            404: Joi.object({ message: Joi.string() }),
                            403: Joi.object({ message: Joi.string() }),
                        }
                    }
                }
            },

            // ----------------------------------
            // DELETE
            // ----------------------------------
            {
                method: 'DELETE',
                path: '/aulas/{id}',
                handler: AulaHandler.delete,

                options: {
                    tags: ['api'],
                    description: 'Deletar aula',
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
                            404: Joi.object({ message: Joi.string() }),
                            403: Joi.object({ message: Joi.string() }),
                        }
                    }
                }
            }
        ]);
    }
};
