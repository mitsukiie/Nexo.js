import type { Command } from "commander";
import chalk from "chalk";

import { log } from "../cli/logger";
import { hasRuntime, isBunRuntime, type RuntimeMode } from "../cli/runtime";
import { getEnvFile, resolveEntry, run } from "../cli/utils";

interface DevOptions {
  watch?: boolean;
  runtime?: string;
}

export function registerCommand(program: Command) {
  program
    .command("dev")
    .description("Inicia o bot em modo desenvolvimento")
    .argument("[file]", "Arquivo de entrada")
    .option("-w, --watch", "Reinicia automaticamente ao salvar")
    .option("-r, --runtime <runtime>", "Runtime: bun ou node", "auto")
    .action((file: string | undefined, options: DevOptions) => {
      const entry = resolveEntry(file);
      const env = getEnvFile();
      const watch = Boolean(options.watch);
      const ext = entry.split(".").pop();
      const hasBun = hasRuntime("bun");
      const hasTsx = hasRuntime("tsx");
      const runtime = (options.runtime ?? "auto").toLowerCase() as RuntimeMode | string;

      log.start();

      const usingBun =
        runtime === "bun" ||
        (runtime === "auto" && (isBunRuntime || (ext === "ts" && !hasTsx && hasBun)));

      if (runtime !== "auto" && runtime !== "bun" && runtime !== "node") {
        log.error("Runtime inválido. Use: auto, bun ou node.");
        process.exit(1);
      }

      console.log(
        chalk.blue("⚙️ Runtime: ") + chalk.magenta(usingBun ? "Bun" : "Node.js")
      );

      if (env) log.env();
      if (watch) log.watch();

      if (usingBun) {
        if (!hasBun) {
          log.error("Bun não encontrado no PATH.");
          process.exit(1);
        }

        const args: string[] = [];
        if (watch) args.push("--watch");
        args.push(entry);

        return run("bun", args);
      }

      if (ext === "ts") {
        if (!hasTsx) {
          if (hasBun) {
            log.warn("tsx não encontrado, iniciando com Bun automaticamente.");
            const bunArgs: string[] = [];
            if (watch) bunArgs.push("--watch");
            bunArgs.push(entry);
            return run("bun", bunArgs);
          }

          log.error("Para rodar .ts no Node, instale tsx: npm i -D tsx");
          process.exit(1);
        }

        const args: string[] = [];

        if (watch) args.push("watch");
        if (env) args.push(`--env-file=${env}`);

        args.push(entry);

        return run("tsx", args);
      }

      if (watch) {
        log.warn("Watch não suportado para JS");
      }

      const args: string[] = [];

      if (env) args.push(`--env-file=${env}`);
      args.push(entry);

      run(process.execPath, args);
    });
}
