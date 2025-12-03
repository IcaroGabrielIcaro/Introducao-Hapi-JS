const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

class SwaggerConfig {
  async register(server) {
    const swaggerOptions = {
      info: {
        title: 'API Hapi Project',
        version: '1.0.0',
        description: 'Documentação da API feita com Hapi.js',
      },
      securityDefinitions: {
        jwt: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      },
      security: [{ jwt: [] }]
    };

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ]);

    console.log('✅ Swagger registrado com sucesso!');
  }
}

module.exports = new SwaggerConfig();
