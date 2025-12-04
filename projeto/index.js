const Server = require('./src/utils/server');
const Swagger = require('./src/utils/swagger');
const userRoutes = require('./src/routes/UserRoutes');
const Database = require('./src/utils/database');

class App {
  constructor() {
    this.serverApp = new Server();
    this.server = this.serverApp.getInstance();
    this.swagger = new Swagger();
    this.database = Database;
  }

  async connectDatabase() {
    await this.database.connect();
  }

  async registerPlugins() {
    await this.swagger.register(this.server);
  }

  async registerRoutes() {
    await this.server.register(userRoutes);
  }

  async start() {
    try {
      await this.connectDatabase();
      await this.registerPlugins();
      await this.registerRoutes();
      await this.serverApp.start();

    } catch (error) {
      console.error('❌ Erro ao iniciar a aplicação:', error);
      process.exit(1);
    }
  }
}

const app = new App();
app.start();

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});
