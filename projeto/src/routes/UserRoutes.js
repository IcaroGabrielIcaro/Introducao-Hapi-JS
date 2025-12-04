const UserHandler = require('../handlers/userHandler');
const { createUserSchema } = require('../schemas/userSchema');

module.exports = {
  name: 'user-routes',
  version: '1.0.0',
  register: async (server) => {
    server.route([
      {
        method: 'POST',
        path: '/users',
        handler: UserHandler.create,
        options: {
          tags: ['api'],
          description: 'Criar usuário',
          auth: false,

          validate: {
            payload: createUserSchema,
          },

          response: {
            status: {
              201: require('joi').object({
                id: require('joi').number(),
                username: require('joi').string(),
                email: require('joi').string(),
                password: require('joi').string(),
                createdAt: require('joi').date(),
                updatedAt: require('joi').date(),
              }),
            },
          },
        },
      },
      {
        method: 'GET',
        path: '/users',
        handler: UserHandler.list,
        options: {
          tags: ['api'],
          description: 'Listar usuários',

          response: {
            status: {
              201: require('joi').object({
                id: require('joi').number(),
                username: require('joi').string(),
                email: require('joi').string(),
                password: require('joi').string(),
                createdAt: require('joi').date(),
                updatedAt: require('joi').date(),
              }),
            },
          },
        },
      },
    ]);
  },
};