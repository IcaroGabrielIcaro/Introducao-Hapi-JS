# Como rodar

Esse material está sendo constuído com base na [documentação oficial](https://hapi.dev/tutorials/?lang=en_US) do Hapi e de outros sites da comunidade que disponibilizam esse tutorial inicial de como criar um projeto Hapi e botar pra rodar. Na documentação inicial é falado que essa introdução funciona para versões a partir do Hapi v17, mas de acordo com o [github do Hapi](https://github.com/hapijs/hapi) estmaos atualmente na v20.3, lançada em 2023. O [material complementar](https://dev.to/kachiic/hapi-js-part-1-how-to-make-a-hapi-js-server-in-10-minutes-12kc) que estarei usando foi escrito em 2022, então é possível encontrar problemas de versão.

## Visão geral

Este tutorial mostra como preparar um servidor hapi básico que mostra "Hello World!" no seu navegador.

## Instalando hapi

Para seguir este tutorial, você precisará ter o **Node** instalado - idealmente na versão LTS.

Execute o seguinte comando no seu terminal para verificar se você tem o node instalado.

```cmd
node --version
```

Neste tutorial, será usando o Postman para as requisições HTTP, mas fique à vontade para usar as ferramentas que quiser.

## Preparar

Vamos começar executando os seguintes comandos:

```cmd
mkdir hapi-tutorial
cd hapi-tutorial
npm init -y
```

### O que acabamos de fazer?

1 - Criar uma pasta chamada **hapi-toturial**
2 - Deve conter um arquivo intitulado **package.json** com os valores padrão

Agora que temos o nosso **package.json**, vamos intalar o Hapi JS executando o seguinte comando no nosso termianal:

```cmd
npm i @hapi/hapi
```

Seu arquivo **package.json** agora deve ficar mais ou menos assim:

```json
{
  "name": "hapi-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@hapi/hapi": "^20.2.2"
  }
}
```

Agora estamos prontos para começar o nosso projeto!

## Adicionando nossos arquivos

Em seguida, vamos criar 3 arquivos, um **index.js**, um **server.js** e um **router.js**

Vamos fazer isos executnado os seguintes comandos no seu terminal:

```cmd
type nul > index.js
type nul > router.js
type nul > server.js
```

## Router.js

Tradicionalmente, você começa pelo **index.js**, mas neste tutorial, vamos começar com o **router.js**

Adicione o seguinte código ao seu **router.js**:

```js
const router = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    }
  }
];

module.exports = router;
```

### O que acabamos de fazer?

Adicionamos um array de roteadores que armazena todos os nossos endpoints. Cada endpoint deve conter o seguinte:

- **Method**: No nosso caso, é GET
- **Path**: Estamos usando apenas o caminho padrão "/" por equanto
- **Handler**: Isso cuida da nossa funcionalidade. O primiero parâmetro é o **request**, que você acessa argumentos como **body** ou **params**. O segundo parâmetro, **h** é o toolkit de respota, que é um objeto com vários metodos usados para responder à solicitação

## Server.js

Vamos adicionar o seguinte ao nosso arquivo server.js:

```js
const Hapi = require("@hapi/hapi");
const router = require("./router");

const server = Hapi.server({
  port: 8000,
  host: "localhost"
});

router.forEach((path) => server.route(path));

module.exports = server;
```

Vamos analisar o que fizemos:

1 - Importamos o Hapi e iniciamos nosso servidor
2 - Configuramos nossa **port** para **8000** e o **host** para **"localhost"**
3 - Depois, importamos nosso **router** e criamos uma rota para cade **path**

## Index.js

```js
const server = require("./server");

(async () => {
  await server.start();
  console.log("🚀 Server listening %s/ 🚀", server.info.uri);
})();
```

Vamos analisar o que fizemos:

1 - Estamos importando nosso servidor **server.js**
2 - Estamos criando uma função **async** autochamada
3 - Quando o servidor inicia, ele vai registrar o endpoint do servidor

Então vamos rodar nosso app para ter certeza. Vamos apenas executar este comando no nosso terminal:

```cmd
node index.js
```

Se tudo saiu conforme o planejado, devemos ver o seguinte em nosso terminal:

```cmd
🚀 Server listening http://127.0.0.1:8000/ 🚀
```

🚀 Server listening http://127.0.0.1:8000/ 🚀

## Adicionando um arquivos de controllers

Controllers são a forma de evitar que o arquivo do router fique confuso.

Vamos começar criando o nosso diretório de **contollers** e nosso primeiro controller:

```cmd
mkdir controllers
type nul > controllers/events.controllers.js
```

Vamos chamar nosso primeiro controller de **events.controllers.js**, adicione o seguinte código ao nosso **events.controllers.js**:

```js
const events_db = [];

const getEvents = (request, h) => {
  return events_db;
};

const postEvent = (request, h) => {
  events_db.push(request.payload);

  return "Event Created!";
};

module.exports = {
  getEvents,
  postEvent
};
```

### O que acabamos de fazer?

Por enquanto, estamos usando um array vazio chamado **events_db** para armazenar nossos dados.

- A solicitação **GET** devolverá qualquer coisa armazenada atualmente no array.
- A solicitação **POST** enviará dados para esse array.

## Atualize nosso router

Agora vamos atualizar nosso arquivo router.js:

```js
const { postEvent, getEvents } = require("./controllers/events.controllers");

const router = [
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return "Hello World!";
    }
  },
  {
    method: "POST",
    path: "/post_event",
    handler: postEvent
  },
  {
    method: "GET",
    path: "/events_list",
    handler: getEvents
  }
];

module.exports = router;
```

## Fazeno nossas requisições

Vamos tentar fazer uma solicitação **POST** para http://localhost:8000/post_event com os seguintes dados:

```json
{
  "name": "test event",
  "adultsOnly": false,
  "attendees": 100,
  "description": "test description"
}
```

Uma solicitação **POST** bem-sucedida deve devolver esta resposta:

```cmd
'Event Created!'
```

Por fim, um pedido **GET** para http://localhost:8000/events_list deve devolver a resposta:

```json
[
  {
    "name": "test event",
    "adultsOnly": false,
    "attendees": 100,
    "description": "test description"
  }
]
```

Se você reiniciar seu servidor, esses dados devem desaparecer, pois estamos armazenando apenas temporariamente em um array.