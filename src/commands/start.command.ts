import type { Command } from "commander";
import chalk from "chalk";

import { log } from "../cli/logger";
import { getEnvFile, run } from "../cli/utils";

export function registerCommand(program: Command) {
  program
    .command("start")
    .description("Inicia o bot em produção")
    .argument("[file]", "Arquivo", "dist/bot.js")
    .action((file: string) => {
      log.start();
      console.log(chalk.green("📦 Modo produção"));

      const env = getEnvFile();
      const args: string[] = [];

      if (env) args.push(`--env-file=${env}`);
      args.push(file);

      run(process.execPath, args);
    });
}
