const User = require('../models/user');
const UserProfile = require('../models/userProfile');

class UserService {
  static async create(userData, perfil) {
    // Cria um novo usuário na tabela User com os dados enviados
    const user = await User.create(userData);

    // Cria o perfil associado ao usuário recém-criado
    // usando o ID retornado na criação do usuário
    await UserProfile.create({
      perfil,
      userId: user.id,
    });

    // Converte a instância Sequelize para um objeto puro (sem dataValues, _options, etc.)
    const userPlain = user.get({ plain: true });

    // Remove o campo password para não expor dados sensíveis na resposta
    delete userPlain.password;

    // Remove as datas de criação e atualização, caso você não queira retornar
    delete userPlain.createdAt;
    delete userPlain.updatedAt;

    // Retorna o objeto limpo e seguro
    return userPlain;
  }


  static async list() {
    const users = await User.findAll({
      include: {
        model: UserProfile,
        as: 'userProfile',
      },
    });

    return users.map(u => {
      const user = u.get({ plain: true });
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      return user;
    });
  }

  static async get(id) {
    const user = await User.findByPk(id, {
      include: {
        model: UserProfile,
        as: 'userProfile',
      },
    });

    if (!user) return null;

    const userPlain = user.get({ plain: true });

    delete userPlain.password;
    delete userPlain.createdAt;
    delete userPlain.updatedAt;

    return userPlain;
  }

  static async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.update(data);

    const userPlain = user.get({ plain: true });
    delete userPlain.password;
    delete userPlain.createdAt;
    delete userPlain.updatedAt;

    return userPlain;
  }

  static async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }

}

module.exports = UserService;
