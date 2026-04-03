import chalk from "chalk";
import { isBunRuntime } from "./runtime";

export const log = {
  start: () => console.log("\n" + chalk.cyan.bold("🚀 NexoCord")),

  runtime: () =>
    console.log(
      chalk.blue("⚙️ Runtime: ") + chalk.magenta(isBunRuntime ? "Bun" : "Node.js")
    ),

  env: () => console.log(chalk.green("🌱 .env carregado automaticamente")),

  watch: () => {
    console.log(chalk.yellow("👀 Watch mode ativo"));
    console.log(chalk.gray("📡 Aguardando alterações..."));
    console.log(chalk.gray("💡 Ctrl+C para parar\n"));
  },

  warn: (msg: string) => console.log(chalk.yellow(`⚠️ ${msg}`)),

  error: (msg: string) => console.log(chalk.red(`❌ ${msg}`)),

  info: (msg: string) => console.log(chalk.blue(msg)),
};
