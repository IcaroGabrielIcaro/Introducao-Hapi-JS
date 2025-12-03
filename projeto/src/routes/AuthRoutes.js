const AuthController = require('../controllers/AuthController');

module.exports = {
  name: 'auth-routes',
  version: '1.0.0',
  register: async (server) => {
    server.route({
      method: 'POST',
      path: '/login',
      handler: AuthController.login,
      options: {
        tags: ['api'],
        description: 'Login',
        auth: false,
      },
    });
  },
};
