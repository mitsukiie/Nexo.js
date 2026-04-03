import { Command } from "commander";
import chalk from "chalk";

import { log } from "./logger";

export function createProgram(version: string): Command {
  return new Command()
    .name("nexo")
    .description(
      chalk.gray("Framework moderno para bots Discord com foco em DX e performance")
    )
    .version(version)
    .addHelpText(
      "after",
      `\n${chalk.cyan("Docs:")} ${chalk.gray("https://nexocord.vercel.app/")}\n`
    );
}

export function registerFallback(program: Command) {
  program.on("command:*", () => {
    log.error("Comando inválido");
    console.log(chalk.gray("👉 Use: nexo --help"));
    process.exit(1);
  });
}

export async function runProgram(program: Command, argv: string[] = process.argv) {
  await program.parseAsync(argv);
}
