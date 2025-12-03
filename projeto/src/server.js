require('dotenv').config();
const Hapi = require('@hapi/hapi');

const Database = require('./config/Database');
const JwtConfig = require('./config/Jwt');
const SwaggerConfig = require('./config/Swagger');

class Server {
  constructor() {
    this.server = Hapi.server({
      port: process.env.PORT,
      host: 'localhost',
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });
  }

  async registerConfigs() {
    // Conecta no banco
    await Database.connect();

    // Registra JWT
    await JwtConfig.register(this.server);

    // Registra Swagger
    await SwaggerConfig.register(this.server);

    await this.server.register([
      require('./routes/UserRoutes'),
      require('./routes/AuthRoutes'),
    ]);
  }

  async start() {
    try {
      await this.registerConfigs();

      await this.server.start();
      console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`);
      console.log(`📚 Swagger em http://localhost:${process.env.PORT}/documentation`);
    } catch (err) {
      console.error('❌ Erro ao iniciar o servidor:', err);
      process.exit(1);
    }
  }
}

// Bootstrap (equivalente ao main do Spring)
const app = new Server();
app.start();

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});