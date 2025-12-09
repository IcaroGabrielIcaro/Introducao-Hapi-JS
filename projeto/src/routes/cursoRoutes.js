const Joi = require("joi")
const CursoHandler = require("../handlers/cursoHandler")
const { createCursoSchema } = require("../schemas/cursoSchema")

module.exports = {
    name: 'curso-routes',
    version: '1.0.0',

    register: async (server) => {
        server.route([
            {
                method: 'POST',
                path: '/cursos',
                handler: CursoHandler.create,

                options: {
                    tags: ['api'],
                    description: 'Criar curso',
                    auth: false,

                    validate: {
                        payload: createCursoSchema,
                    },

                    response: {
                        failAction: 'log',
                        status: {
                            201: Joi.object().unknown(true),
                        }
                    }
                }
            },

            {
                method: 'GET',
                path: '/cursos',
                handler: CursoHandler.list,

                options: {
                    tags: ['api'],
                    description: 'Listar cursos',
                    auth: false,

                    response: {
                        failAction: 'log',
                        status: {
                            200: Joi.array().items(Joi.object().unknown(true)),
                        }
                    }
                }
            },

            {
                method: 'GET',
                path: '/cursos/{id}',
                handler: CursoHandler.get,

                options: {
                    tags: ['api'],
                    description: 'Obter curso por ID',
                    auth: false,

                    validate: {
                        params: Joi.object({
                            id: Joi.number().required(),
                        })
                    },

                    response: {
                        failAction: 'log',
                        status: {
                            200: Joi.object().unknown(true),
                            404: Joi.object({
                                message: Joi.string()
                            })
                        }
                    }
                }
            },


            {
                method: 'PUT',
                path: '/cursos/{id}',
                handler: CursoHandler.update,
                options: {
                    tags: ['api'],
                    description: 'Atualizar curso',

                    validate: {
                        params: Joi.object({
                            id: Joi.number().required()
                        }),
                        payload: createCursoSchema
                    },

                    response: {
                        failAction: 'log',
                        status: {
                            200: Joi.object().unknown(true),
                            404: Joi.object({
                                message: Joi.string()
                            })
                        }
                    }
                }
            },

            {
                method: 'DELETE',
                path: '/cursos/{id}',
                handler: CursoHandler.delete,
                options: {
                    tags: ['api'],
                    description: 'Deletar curso',

                    validate: {
                        params: Joi.object({
                            id: Joi.number().required()
                        })
                    },

                    response: {
                        failAction: 'log',
                        status: {
                            200: Joi.object({
                                message: Joi.string()
                            }),
                            404: Joi.object({
                                message: Joi.string()
                            })
                        }
                    }
                }
            }
        ])
    }
}