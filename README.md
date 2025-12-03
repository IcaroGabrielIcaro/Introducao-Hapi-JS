# Projeto

## Dependências

```cmd
npm install @hapi/hapi
npm install pg
npm install sequelize
npm install pg-hstore
npm install @hapi/jwt
npm install jsonwebtoken
npm install joi@17
npm install bcrypt
npm install @hapi/boom
npm install hapi-swagger
npm install @hapi/inert
npm install @hapi/vision
npm install dotenv
```

- **@hapi/hapi**: Hapi
- **pg**: Postgres
- **sequelize**: ORM
- **pg-hstore**: configuração do sequelize para postgres
- **@hapi/jwt**: jwt para hapi
- **jsonwebtoken**: geração do token
- **joi@17**: validação dos dados (versão 17 porque o swagger não funciona com a versão 18 - a mais recente)
- **bcrypt**: criptografia das senhas
- **@hapi/boom**: erros padronizados
- **hapi-swagger**: documentação da api com swagger
- **@hapi/inert**: serve os arquivos do swagger
- **@hapi/vision**: rendezira a interface do swagger 
- **dotenv**: ler dados do .env

## Configurações

### config/Database.js

- Encapsula a conexão em uma classe
- Expõe um método **connect()** (Tipo @PostConstruct)
- Centraliza toda a config do banco em um só lugar
- Usa variáveis do **.env**

### config/Jwt.js

- Leitura do **.env**
- Registro do plugin **@hapi/jwt**
- Criação da estratégia **jwt**
- Definição do JWT como padrão no sistema
- Função para **gerar token**
- Dados do usuário disponíveis em: **request.auth.credentials**

### config/Swagger.js

- Rota automática: **http://localhost:8000/documentation**
- Interface gráfica da API
- Teste de rotas direto no navegador
- Suporte a JWT no botão **Authorize**
- Integração transparente com joi

## Modelos

## models/User.js

- Criação automática da tabela
- **username** e **email** únicos
- Senha já criptografada automaticamente
- Método pronto para login: **user.checkPassword(senhaDigitada)**
- Validação de dados antes de salvar