const { Sequelize } = require('sequelize');
require('dotenv').config();

class Database {
  constructor() {
    this.connection = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, // desliga logs SQL no console
      }
    );
  }

  async connect() {
    try {
      await this.connection.authenticate();
      await this.connection.sync({ alter: true });
      console.log('✅ Conectado ao banco de dados com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao conectar no banco de dados:', error);
    }
  }
}

module.exports = new Database();
