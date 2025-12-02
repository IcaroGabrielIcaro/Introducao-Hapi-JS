# Introdução ao Hapi.js

O Hapi.js (mais conhecido como hapi) é um framework open source para Node.js, criado em 2011 por Eran Hammer enquanto trabalhava no Walmart Labs. Sua criação surgiu a partir de uma necessidade real do Walmart em lidar com grandes volumes de requisições, especialmente em períodos de tráfego extremo, como a Black Friday, uma das datas mais movimentadas do comércio eletrônico nos Estados Unidos.

Segundo Mez (“Introduction to Hapi.js”, Medium), o hapi:

> “Foi criado pela equipe mobile do Walmart Labs — liderada por Eran Hammer, criador do OAuth — para lidar com o tráfego de eventos como a Black Friday, um dos dias mais movimentados do comércio online nos EUA.”
(MEZ, 2017)

Inicialmente, o Hapi utilizava o Express como base, porém, com o tempo, o Walmart identificou limitações importantes no framework, que não atendiam às exigências específicas do projeto. Dessa forma, o Hapi evoluiu até se tornar um framework independente, totalmente separado do Express.

> “As versões originais do hapi usavam o framework Express. O Walmart descobriu que havia limitações no Express que o tornavam inadequado para seus requisitos específicos.”
(MEZ, 2017)

## Motivações para a Criação do Hapi.js

O Hapi foi criado com foco em três pilares principais:

- Segurança
- Organização do código
- Controle rígido do comportamento do servidor

Na época do seu surgimento, o Express era praticamente a principal alternativa no ecossistema Node.js. No entanto, apesar de sua popularidade, ele apresentava algumas limitações importantes: era extremamente flexível, pouco opinativo e dependente de um grande número de bibliotecas externas para suprir funcionalidades básicas.

Dessa forma, o Hapi surgiu para resolver principalmente:

- A falta de padronização
- A ausência de segurança por padrão
- A inexistência de uma estrutura clara para APIs de grande porte

Seu objetivo era ser um framework seguro, organizado, confiável e preparado para aplicações corporativas.

> “O hapi é importante porque foi projetado para permitir que os desenvolvedores foquem nas tarefas críticas do projeto, em vez de gastar tempo construindo toda a infraestrutura.”
(MEZ, 2017)

## Proposta e Características do Hapi.js

O Hapi se propõe a ser um framework para construção de APIs e servidores web em Node.js, assim como o Express, Fastify e NestJS. No entanto, sua principal diferença está no fato de já oferecer uma estrutura bem definida desde o início, evitando improvisações (“gambiarras”) e incentivando uma arquitetura mais profissional.

Ao instalar o Hapi, o desenvolvedor já conta com:

- Proteções de segurança ativadas por padrão
- Integração nativa com o Joi para validação de dados
- Sistema avançado de autenticação e autorização
- Arquitetura modular baseada em plugins
- Suporte nativo a cookies criptografados e cabeçalhos de segurança HTTP

De acordo com a própria documentação oficial do Hapi:

> “O hapi exige configurações altamente seguras, possui padrões seguros por padrão, arquitetura avançada de autenticação e autorização, além de diversos mecanismos de proteção contra ataques.”
(HAPI.DEV, 2024)

Obs: *Embora o Hapi possua um sistema nativo de autenticação e autorização, ele não implementa diretamente métodos específicos como JWT ou OAuth. Em vez disso, oferece uma infraestrutura completa para o uso de estratégias de autenticação, permitindo ao desenvolvedor integrar diferentes mecanismos por meio de plugins externos, como o hapi-auth-jwt2. Dessa forma, o framework mantém sua flexibilidade sem abrir mão da padronização e da segurança.*

## Popularidade e Adoção do Hapi

Apesar de suas qualidades técnicas, o Hapi acabou não se tornando tão popular quanto o Express. Isso ocorreu principalmente porque o Express surgiu antes e já estava fortemente consolidado no mercado quando o Hapi foi lançado.

Além disso, frameworks mais modernos como o NestJS ganharam grande destaque nos últimos anos, especialmente por trazerem uma proposta mais atual, com forte inspiração em arquiteturas corporativas como as do Spring Framework, muito utilizado no ecossistema Java.

Pode-se dizer que:

- O Hapi é mais rígido, o que pode assustar iniciantes
- Possui menos marketing
- Conta com uma comunidade menor
- Foi ofuscado pela ascensão do NestJS

## Comparação: Hapi.js vs Express

| Hapi | Express |
|------|---------|
| Mais organizado | Mais simples |
| Mais seguro por padrão | Segurança depende de bibliotecas externas |
| Ideal para projetos grandes | Ideal para projetos menores |
| Arquitetura bem definida | Estrutura livre |

O Express apresenta como principais vantagens:

- Rápido aprendizado
- Pouca configuração inicial
- Grande comunidade
- Flexibilidade total

Entretanto, essa liberdade pode se tornar um problema em projetos grandes, pois gera falta de padronização, dificuldade de manutenção e maior risco de falhas de segurança (SIMFORM, 2023).

Já o Hapi se destaca por:

- Plugins robustos
- Código mais organizado
- Segurança por padrão
- Validação automática de dados
- Suporte a microserviços
- Caching integrado

Entre suas desvantagens estão:

- Comunidade menor
- Menor compatibilidade com módulos do Express
- Maior curva de aprendizado

Além disso, o Hapi também é bastante utilizado como proxy:

> “O hapi é uma boa escolha para a construção de proxies. O Walmart, por exemplo, usa o hapi para encaminhar requisições da sua API para serviços Java externos.”
(MEZ, 2017)

## Conclusão

O Hapi.js é um framework sólido, maduro e altamente seguro, criado para suprir uma lacuna existente no ecossistema Node.js no início da década de 2010. Ele se destaca principalmente em aplicações corporativas, de grande porte, onde organização, padronização e segurança são requisitos fundamentais.

Apesar de não ser tão popular quanto o Express ou o NestJS, o Hapi permanece sendo uma excelente escolha para sistemas críticos, que exigem alto nível de confiabilidade.

## Referências

MEZ, J. Introduction to Hapi.js. Medium, 2017. Disponível em:
https://medium.com/@jsonmez/introduction-to-hapi-js-c128f40bd919

HAPI.DEV. Security and Architecture Documentation. Disponível em:
https://hapi.dev/

SIMFORM. Express vs Hapi – Pros and Cons. 2023. Disponível em:
https://www.simform.com/blog/express-vs-hapi/