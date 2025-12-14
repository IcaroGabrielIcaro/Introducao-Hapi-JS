const Server = require('./src/utils/server');
const Swagger = require('./src/utils/swagger');
const Database = require('./src/utils/database');
const userRoutes = require('./src/routes/userRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const moduloRoutes = require('./src/routes/moduloRoutes');
const aulaRoutes = require('./src/routes/aulaRoutes');
const matriculaRoutes = require('./src/routes/matriculaRoutes');

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
    await this.server.register(cursoRoutes);
    await this.server.register(moduloRoutes);
    await this.server.register(aulaRoutes);
    await this.server.register(matriculaRoutes);
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
