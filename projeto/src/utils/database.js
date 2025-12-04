const Sequelize = require('sequelize');

class Database {
    constructor() {
        this.connection = new Sequelize(
            'hapi-project',
            'postgres',
            'postgres',
            {
                host: 'localhost',
                port: 5432,
                dialect: 'postgres',
                logging: false,
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
            throw error;
        }
    };
}

module.exports = new Database();