const User = require('../models/User');
const PerfilUsuario = require('../models/PerfilUsuario');
const UserValidation = require('../validators/UserValidation');

class UserController {
  static async create(request, h) {
    const { error } = UserValidation.create().validate(request.payload);
    if (error) return h.response(error.details[0].message).code(400);

    const { perfil, ...userData } = request.payload;

    // ✅ Cria o usuário
    const user = await User.create(userData);

    // ✅ Cria automaticamente o perfil vinculado (OneToOne)
    await PerfilUsuario.create({
      perfil,
      userId: user.id, // FK automática
    });

    return h.response(user).code(201);
  }

  static async list() {
    return await User.findAll({
      include: {
        model: PerfilUsuario,
        as: 'perfilUsuario',
      },
    });
  }
}

module.exports = UserController;
