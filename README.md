# Introdução ao Hapi Js

Hapi.js é um framework do **Node.js** usado para criar APIs REST de forma simples e organizada.

Neste projeto, vamos criar uma API completa com:
- Servidor Hapi.js
- Banco de dados PostgreSQL
- Autenticação com JWT
- Documentação com Swagger

## Instalação

*É necessário ter o **Node** instalado em uma versão LTS*

Conferir se tem o node instalado:
```cmd
node --version
```

## Ambiente

```cmd
mkdir hapi-project
cd hapi-project
npm init -y
```

Criação do diretório chamado **hapi-project** <br>
Inicialização do **package.json** com os valores default

### Instalação do Hapi

Agora com o package.json pronto é possível instalar o Hapi Js nele

```cmd
npm install @hapi/hapi
```

Ao final o package.json terá o Hapi em suas dependências e o **package-lock.json** será criado, assim como o **node_modules** (deve ser ignorado com *.gitignore*)

```json
{
  "name": "hapi-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "@hapi/hapi": "^21.4.4"
  }
}
```

### Instalação do PostgreSQL

Para a conexão do banco de dados **PostgreSQL** é necessário fazer a instalação do seguinte pacote:

```cmd
npm install pg
```

Ao final o package.json terá as dependências **pg**, sendo a interface para o banco de dados PostgreSQL.

```json
{
  "name": "hapi-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "@hapi/hapi": "^21.4.4",
    "pg": "^8.16.3"
  }
}
```

## Configuração do PostgreSQL

É importante começar a definir os diretórios para garantir uma boa organização do projeto.

```txt
hapi-project/
├── src/
│   └── config/
├── .env
└── package.json
```

Agora está definido o diretório **src/** que guardará todas as estruturas do projeto e dentro o diretório **config/** que guardará as configurações importantes para o projeto, assim como o **.env** que guardará informações importantes.


### Definindo .env

No *.env* será deixado as informações de conexão com o banco de dados

```text
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hapi-project
DB_USER=postgres
DB_PASSWORD=postgres
```

### Definindo src/config/database.js

Para configuração das informações do *.env* é necessário criar o **database.js** com o seguinte codigo:

```js
const { Pool } = require('pg');
require('dotenv').config();

class Database {
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
  }

  async query(sql, params = []) {
    return this.pool.query(sql, params);
  }
}

module.exports = new Database();
```

- **Pool**: é quem gerencia as conexões com o PostgreSQL.
- **require('dotenv').config()**: carrega as variáveis dentro do *.env*.
- **class Database**: classe para representar a conexão com o banco de dados.
- **constructor()**: é executado quando a classe é criada e configura a conexão (vindo do *.env*) com:
  - Host
  - Porta
  - Bando de dados
  - Usuário
  - Senha
- **async query(sql, params = [])**: cria um método para executar comandos SQL no banco:
  - *sql*: comando SQL (SELECT, INSERT, etc)
  - *params*: valores dinâmicos
- **module.exports = new Database()**: exporta uma única instância da conexão para ser usada em todo o projeto.

## Referências

- [Introdução do Projeto](https://dev.to/kachiic/hapi-js-part-1-how-to-make-a-hapi-js-server-in-10-minutes-12kc)
- [Configuração PostgreSQL](https://moldstud.com/articles/p-integrating-graphql-with-hapijs-and-postgresql-a-complete-guide-for-developers)

## Definição dos Modelos

Para manter todos os modelos organizados em seu lugar específico será criado o diretório de modelos, repository e migrations.

```txt
hapi-project/
├── src/
│   ├── models/
│   ├── repository/
│   ├── migrations/
│   └── config/
├── .env
└── package.json
```

- **models**: guarda as entidades JavaScript que representam as tabelas do banco
- **Repository**: guarda as operações de consulta  dos modelos ao banco
- **Migrations**: guarda as operações de criação dos modelos no banco

### Definindo Usuário

Antes de definir o usuário propriamente dito é importante saber o que é necessário para definir a sua autenticação com o JWT e validação dos dados.

### Instalação do JWT

```cmd
npm install @hapi/jwt
```

Essa dependência é importante para validar tokens JWT e proteger rotas

```cmd
npm install bcryptjs jsonwebtoken joi @hapi/boom
```

- **bcryptjs**: criptografar senha
- **jsonwebtoken**: criar token no login
- **joi**: validar dados (email, senha, etc)
- **@hapi/boom**: erros padronizados

### Configuração do JWT

Primeiro deve-se ajustar o *.env* para adicionar as configurações de jwt

```txt
# BANCO DE DADOS
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hapi-project
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=minha_chave_super_secreta
JWT_EXPIRES_IN=1d
```

Agora define-se as configurações do jwt

```js
require('dotenv').config();

class JwtConfig {
  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = process.env.JWT_EXPIRES_IN;
  }

  getConfig() {
    return {
      secret: this.secret,
      expiresIn: this.expiresIn
    };
  }
}

module.exports = new JwtConfig();
```

As outras dependências não necessitam de uma configuração específica como essa

### Migration de Usuário

```js
const database = require('../config/database');

class CriarTabelaUsuario {
  async executar() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await database.query(sql);

    console.log('✅ Tabela "users" criada com sucesso!');
    process.exit();
  }
}

new CriarTabelaUsuario().executar();
```

### Model de Usuário

```js
class User {
  constructor({ id = null, nome, email, senha }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
}

module.exports = User;
```

### Repository de Usuário

```js
const database = require('../config/database');
const User = require('../models/User');

class UserRepository {
  async create(user) {
    const query = `
      INSERT INTO users (nome, email, senha)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [user.nome, user.email, user.senha];

    const { rows } = await database.query(query, values);
    return new User(rows[0]);
  }

  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await database.query(query, [email]);

    if (!rows.length) return null;
    return new User(rows[0]);
  }

  async findById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const { rows } = await database.query(query, [id]);

    if (!rows.length) return null;
    return new User(rows[0]);
  }
}

module.exports = new UserRepository();
```