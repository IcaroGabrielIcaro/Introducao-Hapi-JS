require('dotenv').config();
const Jwt = require('@hapi/jwt');

class JwtConfig {
  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = process.env.JWT_EXPIRES_IN;
  }

  async register(server) {
    // Registra o plugin do JWT
    await server.register(Jwt);

    // Cria a estratégia global de autenticação
    server.auth.strategy('jwt', 'jwt', {
      keys: this.secret,
      verify: {
        aud: false,
        iss: false,
        sub: false,
        maxAgeSec: 24 * 60 * 60, // 1 dia
      },
      validate: async (artifacts, request, h) => {
        const { payload } = artifacts;

        return {
          isValid: true,
          credentials: payload, // dados disponíveis em request.auth.credentials
        };
      }
    });

    // Define como estratégia padrão (todas as rotas protegidas)
    server.auth.default('jwt');
  }

  gerarToken(payload) {
    const jwt = require('jsonwebtoken');

    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn
    });
  }
}

module.exports = new JwtConfig();
