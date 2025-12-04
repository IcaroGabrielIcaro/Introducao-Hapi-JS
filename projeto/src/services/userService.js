const User = require('../models/User');
const UserProfile = require('../models/userProfile');

class UserService {
  static async create(userData, perfil) {
    const user = await User.create(userData);

    await UserProfile.create({
      perfil,
      userId: user.id,
    });

    return user;
  }

  static async list() {
    return await User.findAll({
      include: {
        model: UserProfile,
        as: 'userProfile',
      },
    });
  }
}

module.exports = UserService;
