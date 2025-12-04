const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

class Swagger {
  constructor() {
    this.options = {
      info: {
        title: 'Hapi js Api Documentation',
        version: '1.0.0',
      },
    };
  }

  async register(server) {
    try {
      await server.register([
        Inert,
        Vision,
        {
          plugin: HapiSwagger,
          options: this.options,
        },
      ]);

      console.log('✅ Swagger registrado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao registrar Swagger:', error);
    }
  }
}

module.exports = Swagger;
