# Nexo.js
![npm](https://img.shields.io/npm/v/%40mitsuk%2Fnexo.js)
![license](https://img.shields.io/npm/l/%40mitsuk%2Fnexo.js)
![downloads](https://img.shields.io/npm/dm/%40mitsuk%2Fnexo.js)

Nexo.js é um framework para criação de bots Discord modernos usando TypeScript ou JavaScript, focado em organização, produtividade e escalabilidade desde o primeiro arquivo.

## 📚 Documentação
- Site oficial: https://nexo-js.vercel.app/
- Repositório: https://github.com/mitsukiie/Nexo.js

## ✨ Features
- ⚡ Setup em segundos
- 📂 Auto carregamento de comandos e eventos
- 🧠 API tipada
- 🧰 CLI integrada
- 🔄 Compatível com Node.js e Bun
- 📦 Suporte a ESM e CommonJS

## 🤔 Por que usar Nexo.js?

Criar bots apenas com discord.js exige estrutura manual,
carregamento de arquivos e muito boilerplate.

O Nexo.js resolve isso oferecendo:

- estrutura pronta
- carregamento automático
- padrão escalável
- experiência moderna de desenvolvimento



## 📦 Instalação

```bash
npm install @mitsuk/nexo.js discord.js
```

Com Bun:

```bash
bun add @mitsuk/nexo.js discord.js
```

## ⚙️ Configuração
Crie um arquivo .env:
```txt
TOKEN=seu_token_aqui
```

## ⚡ Início rápido (JavaScript)

Crie um arquivo de entrada (exemplo: `src/index.js`):

```js
const { Bootstrap } = require('@mitsuk/nexo.js');
const { GatewayIntentBits } = require('discord.js');

async function main() {
    await Bootstrap.init({
        token: process.env.TOKEN,
        intents: [GatewayIntentBits.Guilds],
        paths: {
            commands: 'src/commands',
            events: 'src/events',
        },
    });
}

main()
```


### 📝 Exemplo de comando

`src/commands/util/ping.ts`

```ts
const { createCommand, CommandType } = require('@mitsuk/nexo.js');

module.exports = createCommand({
    name: 'ping',
    description: 'Responde com pong!',
    type: CommandType.ChatInput,
    async run(interaction) {
        await interaction.reply({ content: 'Pong!' });
    },
});
```

### 📡 Exemplo de evento

`src/events/ready.ts`

```ts
const { createEvent } = require('@mitsuk/nexo.js');

module.exports = createEvent({
    name: 'ready',
    once: true,
    run(client) {
        console.log(`Bot ${client.user?.username} está online!`);
    },
});
```

## 🧰 CLI
O Nexo.js inclui uma CLI própria.

```bash
# desenvolvimento
npx nexo dev

# arquivo customizado
npx nexo dev src/index.ts

# watch mode
npx nexo dev --watch

# produção
npx nexo start dist/bot.js
```

## 📂 Estrutura sugerida

```txt
src/
  commands/
    util/
      ping.ts
  events/
    ready.ts
  index.ts
```

## 🚧 Status do projeto

O Nexo.js está em desenvolvimento ativo.
Feedbacks e contribuições são bem-vindos!

## Licença

MIT. Veja o arquivo `LICENSE`.