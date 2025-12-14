const UserHandler = require('../handlers/userHandler');
const { createUserSchema, updateUserSchema } = require('../schemas/userSchema');

module.exports = {
  name: 'user-routes',
  version: '1.0.0',
  register: async (server) => {
    server.route([
      {
        method: 'POST',                       // -> Método HTTP que essa rota responde (POST para criar recursos)
        path: '/users',                       // -> Caminho/endpoint da rota (ex.: /users)

        handler: UserHandler.create,          // -> Função que vai tratar a requisição (recebe (request, h))
        //    neste caso, aponta para o método estático create do UserHandler

        options: {                            // -> Opções da rota (configurações adicionais: validação, auth, documentação...)
          tags: ['api'],                      // -> Usado por plugins (ex: swagger) para agrupar/endpoints na doc
          description: 'Criar usuário',       // -> Descrição da rota (útil para documentação automática)
          auth: false,                        // -> Indica se a rota requer autenticação. false = rota pública

          validate: {                         // -> Validação das entradas (payload, params, query, headers)
            payload: createUserSchema,        // -> Schema Joi (ou similar) que valida o corpo (req.payload)
            //    Se a validação falhar, Hapi retorna erro 400 automaticamente
          },

          response: {                         // -> Validação da resposta que o handler envia de volta ao cliente
            failAction: 'log',                // -> O que fazer quando a validação da resposta falha:
            //    'log' = registra o erro no console e continua (útil pra debug).
            //    Outras opções: 'error' (faz o request falhar) ou função custom.
            status: {                         // -> Define schemas separados por código HTTP de resposta
              201:                            // -> Este schema será usado quando o handler retornar status 201 (Created)
                require('joi')                // -> Aqui você importa Joi inline
                  .object()                   // -> Declara que a resposta esperada é um objeto
                  .unknown(true)              // -> Permite que existam propriedades extras além das definidas no schema
              //    sem causar erro de validação (útil quando o modelo ORM traz campos extras)
            }
          }
        }
      },

      {
        method: 'GET',
        path: '/users',
        handler: UserHandler.list,
        options: {
          tags: ['api'],
          description: 'Listar usuários',

          response: {
            failAction: 'log',
            status: {
              200: require('joi')
                .array()
                .items(
                  require('joi').object().unknown(true)
                )
            }
          }
        },
      },

      {
        method: 'GET',
        path: '/users/{id}',
        handler: UserHandler.get,
        options: {
          tags: ['api'],
          description: 'Obter usuário por ID',

          validate: {
            params: require('joi').object({
              id: require('joi').number().required()
            })
          },

          response: {
            failAction: 'log',
            status: {
              200: require('joi').object().unknown(true),
              404: require('joi').object({
                message: require('joi').string()
              })
            }
          }
        }
      },

      {
        method: 'PUT',
        path: '/users/{id}',
        handler: UserHandler.update,
        options: {
          tags: ['api'],
          description: 'Atualizar usuário',

          validate: {
            params: require('joi').object({
              id: require('joi').number().required()
            }),
            payload: updateUserSchema,
          },

          response: {
            failAction: 'log',
            status: {
              200: require('joi').object().unknown(true),
              404: require('joi').object({
                message: require('joi').string()
              })
            }
          }
        }
      },

      {
        method: 'DELETE',
        path: '/users/{id}',
        handler: UserHandler.delete,
        options: {
          tags: ['api'],
          description: 'Deletar usuário',

          validate: {
            params: require('joi').object({
              id: require('joi').number().required()
            })
          },

          response: {
            failAction: 'log',
            status: {
              200: require('joi').object({
                message: require('joi').string()
              }),
              404: require('joi').object({
                message: require('joi').string()
              })
            }
          }
        }
      },
    ]);
  },
};