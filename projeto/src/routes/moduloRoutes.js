const Joi = require("joi");
const ModuloHandler = require("../handlers/moduloHandler");
const { createModuloSchema } = require("../schemas/moduloSchema");

module.exports = {
    name: 'modulo-routes',
    version: '1.0.0',

    register: async (server) => {
        server.route([
            {
                method: 'POST',
                path: '/modulos',
                handler: ModuloHandler.create,

                options: {
                    tags: ['api'],
                    description: 'Criar módulo',
                    auth: false,

                    validate: {
                        payload: createModuloSchema
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
                path: '/modulos',
                handler: ModuloHandler.list,

                options: {
                    tags: ['api'],
                    description: 'Listar módulos',
                    auth: false,

                    response: {
                        failAction: 'log',
                        status: {
                            200: Joi.array().items(Joi.object().unknown(true))
                        }
                    }
                }
            },

            {
                method: 'GET',
                path: '/modulos/{id}',
                handler: ModuloHandler.get,

                options: {
                    tags: ['api'],
                    description: 'Obter módulo por ID',
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
                            404: Joi.object({
                                message: Joi.string()
                            })
                        }
                    }
                }
            },

            {
                method: 'PUT',
                path: '/modulos/{id}',
                handler: ModuloHandler.update,

                options: {
                    tags: ['api'],
                    description: 'Atualizar módulo',
                    auth: false,

                    validate: {
                        params: Joi.object({
                            id: Joi.number().required()
                        }),
                        payload: createModuloSchema
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
                path: '/modulos/{id}',
                handler: ModuloHandler.delete,

                options: {
                    tags: ['api'],
                    description: 'Deletar módulo',
                    auth: false,

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
        ]);
    }
}