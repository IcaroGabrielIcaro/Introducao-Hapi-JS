const Hapi = require('@hapi/hapi');

class Server {
  constructor() {
    this.server = Hapi.server({
      port: 3000,
      host: 'localhost',
      routes: {
        cors: {
          origin: ['*'],
          headers: ['Accept', 'Content-Type'],
          additionalHeaders: ['X-Requested-With']
        }
      }
    });
  }

  getInstance() {
    return this.server;
  }

  async start() {
    try {
      await this.server.start();
      console.log(`✅ Servidor rodando em: ${this.server.info.uri}`);
    } catch (error) {
      console.error('❌ Erro ao iniciar servidor:', error);
    }
  }
}

module.exports = Server;
