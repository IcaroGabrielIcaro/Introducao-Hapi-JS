const UserService = require('../services/UserService');
const UserValidation = require('../utils/validations/userValidation');

class UserHandler {
  static async create(request, h) {
    const { error } = UserValidation.create().validate(request.payload);
    if (error) {
      return h.response({
        message: error.details[0].message
      }).code(400);
    }

    const { perfil, ...userData } = request.payload;

    try {
      const user = await UserService.create(userData, perfil);

      return h.response(user).code(201);

    } catch (err) {
      console.error(err);
      return h.response({
        message: 'Erro ao criar usuário'
      }).code(500);
    }
  }

  static async list(request, h) {
    try {
      const users = await UserService.list();
      return h.response(users).code(200);
    } catch (err) {
      console.error(err);
      return h.response({
        message: 'Erro ao buscar usuários'
      }).code(500);
    }
  }
}

module.exports = UserHandler;
