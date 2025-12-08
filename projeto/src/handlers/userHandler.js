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

  static async get(request, h) {
    try {
      const { id } = request.params;
      const user = await UserService.get(id);

      if (!user) {
        return h.response({
          message: 'Usuário não encontrado'
        }).code(404);
      }

      return h.response(user).code(200);
    } catch (err) {
      console.error(err);
      return h.response({
        message: 'Erro ao buscar usuário'
      }).code(500);
    }
  }

  static async update(request, h) {
    const { perfil, ...userData } = request.payload;

    const { id } = request.params;
    try {
      const updatedUser = await UserService.update(id, userData, perfil);

      if (!updatedUser) {
        return h.response({
          message: 'Usuário não encontrado'
        }).code(404);
      }

      return h.response(updatedUser).code(200);

    } catch (err) {
      console.error(err);
      return h.response({
        message: 'Erro ao atualizar usuário'
      }).code(500);
    }
  }

  static async delete(request, h) {
    try {
      const { id } = request.params;

      const deleted = await UserService.delete(id);

      if (!deleted) {
        return h.response({
          message: 'Usuário não encontrado'
        }).code(404);
      }

      return h.response({
        message: 'Usuário deletado com sucesso'
      }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({
        message: 'Erro ao deletar usuário'
      }).code(500);
    }
  }
}

module.exports = UserHandler;
