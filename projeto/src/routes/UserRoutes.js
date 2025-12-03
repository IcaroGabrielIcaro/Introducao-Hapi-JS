const UserController = require('../controllers/UserController');

module.exports = {
  name: 'user-routes',
  version: '1.0.0',
  register: async (server) => {
    server.route([
      {
        method: 'POST',
        path: '/users',
        handler: UserController.create,
        options: {
          tags: ['api'],
          description: 'Criar usuário',
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/users',
        handler: UserController.list,
        options: {
          tags: ['api'],
          description: 'Listar usuários',
        },
      },
    ]);
  },
};
