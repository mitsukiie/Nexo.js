import type { Command } from "commander";

import { runCreateFlow } from "../cli/create";

export function registerCommand(program: Command) {
  program
    .command("create [name]")
    .description("Cria um novo projeto NexoCord")
    .action(async (name?: string) => runCreateFlow(name));
}
