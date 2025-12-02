require('dotenv').config();

class JwtConfig {
  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = process.env.JWT_EXPIRES_IN;
  }

  getConfig() {
    return {
      secret: this.secret,
      expiresIn: this.expiresIn
    };
  }
}

module.exports = new JwtConfig();
