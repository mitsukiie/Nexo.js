# Nexocord
![npm](https://img.shields.io/npm/v/nexocord)
![downloads](https://img.shields.io/npm/dm/nexocord)
![license](https://img.shields.io/npm/nexocord)
![types](https://img.shields.io/npm/types/nexocord)

Nexocord é um framework para criação de bots Discord modernos usando TypeScript ou JavaScript, focado em organização, produtividade e escalabilidade desde o primeiro arquivo.

## 📚 Documentação
- Site oficial: https://nexocord.vercel.app/
- Repositório: https://github.com/mitsukiie/NexoCord

## ✨ Features
- ⚡ Setup em segundos
- 📂 Auto carregamento de comandos e eventos
- 🧠 API tipada
- 🧰 CLI integrada
- 🔄 Compatível com Node.js e Bun
- 📦 Suporte a ESM e CommonJS

## 🤔 Por que usar Nexocord?

Criar bots apenas com discord.js exige estrutura manual,
carregamento de arquivos e muito boilerplate.

O Nexocord resolve isso oferecendo:

- estrutura pronta
- carregamento automático
- padrão escalável
- experiência moderna de desenvolvimento



## 📦 Instalação

```bash
npm install nexocord discord.js
```

## ⚡ Primeiro bot com CLI

```bash
npx nexo create meu-bot
cd meu-bot
npx nexo dev
```

Esse fluxo já cria a base inicial do projeto para você começar sem montar estrutura manualmente.

## ⚙️ Configuração
Crie um arquivo .env:
```txt
TOKEN=seu_token_aqui
```

## 🧰 CLI
O Nexocord inclui uma CLI própria.

```bash
# criar projeto
npx nexo create meu-bot

# desenvolvimento
npx nexo dev

# arquivo customizado
npx nexo dev src/index.ts

# watch mode
npx nexo dev --watch

# produção
npx nexo start dist/bot.js
```

## 📂 Estrutura criada pelo template

```
📂 meu-bot/
┣ 📂 src/
┃ ┣ 📂 commands/
┃ ┃ ┗ 📂 utils/
┃ ┃   ┗ 📜 ping.ts
┃ ┣ 📂 events/
┃ ┃ ┗ 📜 ready.ts
┃ ┗ 📜 index.ts
┗ 📜 package.json
```

## 🚧 Status do projeto

O Nexocord está em desenvolvimento ativo.
Feedbacks e contribuições são bem-vindos!

## Licença

MIT. Veja o arquivo `LICENSE`.