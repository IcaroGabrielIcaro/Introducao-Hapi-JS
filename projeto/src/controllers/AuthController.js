const User = require('../models/User');
const JwtConfig = require('../config/Jwt');

class AuthController {
  static async login(request, h) {
    const { email, password } = request.payload;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.checkPassword(password))) {
      return h.response({ error: 'Credenciais inválidas' }).code(401);
    }

    const token = JwtConfig.generateToken({ id: user.id });

    return { token };
  }
}

module.exports = AuthController;
