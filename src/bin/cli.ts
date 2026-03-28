#!/usr/bin/env node

import { Command } from "commander";
import { spawn, spawnSync } from "child_process";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import { version } from "../../package.json";

// ===== constants =====

const isBun = typeof (globalThis as any).Bun !== "undefined";

function hasRuntime(command: string): boolean {
  const result = spawnSync(command, ["--version"], { stdio: "ignore" });
  return !result.error && result.status === 0;
}

// ===== utils =====

function resolveEntry(file?: string): string {
  if (file) return file;

  const defaults = [
    "src/bot.ts",
    "src/index.ts",
    "src/bot.js",
    "src/index.js",
    "bot.ts",
    "bot.js",
    "index.ts",
    "index.js",
  ];

  for (const f of defaults) {
    if (fs.existsSync(path.resolve(process.cwd(), f))) {
      return f;
    }
  }

  return "src/bot.ts";
}

function getEnvFile(): string | null {
  const env = path.resolve(process.cwd(), ".env");
  return fs.existsSync(env) ? env : null;
}

function run(cmd: string, args: string[]) {
  const child = spawn(cmd, args, { stdio: "inherit" });

  child.on("close", (code) => process.exit(code ?? 0));
  child.on("error", () => {
    console.log(chalk.red("❌ Falha ao executar o bot."));
    process.exit(1);
  });
}

// ===== logger =====

const log = {
  start: () =>
    console.log("\n" + chalk.cyan.bold("🚀 Nexocord")),

  runtime: () =>
    console.log(
      chalk.blue("⚙️ Runtime: ") +
        chalk.magenta(isBun ? "Bun" : "Node.js")
    ),

  env: () =>
    console.log(chalk.green("🌱 .env carregado automaticamente")),

  watch: () => {
    console.log(chalk.yellow("👀 Watch mode ativo"));
    console.log(chalk.gray("📡 Aguardando alterações..."));
    console.log(chalk.gray("💡 Ctrl+C para parar\n"));
  },

  warn: (msg: string) =>
    console.log(chalk.yellow(`⚠️ ${msg}`)),

  error: (msg: string) =>
    console.log(chalk.red(`❌ ${msg}`)),

  info: (msg: string) =>
    console.log(chalk.blue(msg)),
};

// ===== CLI =====

const program = new Command();

program
  .name("nexo")
  .description(
    chalk.gray(
      "Framework moderno para bots Discord com foco em DX e performance"
    )
  )
  .version(version)
  .addHelpText(
    "after",
    `\n${chalk.cyan("Docs:")} ${chalk.gray("https://nexocord.vercel.app/")}\n`
  );

// ===== DEV =====

program
  .command("dev")
  .description("Inicia o bot em modo desenvolvimento")
  .argument("[file]", "Arquivo de entrada")
  .option("-w, --watch", "Reinicia automaticamente ao salvar")
  .option("-r, --runtime <runtime>", "Runtime: bun ou node", "auto")
  .action((file: string | undefined, options: { watch?: boolean; runtime?: string }) => {
    const entry = resolveEntry(file);
    const env = getEnvFile();
    const watch = Boolean(options.watch);
    const ext = entry.split(".").pop();
    const hasBun = hasRuntime("bun");
    const hasTsx = hasRuntime("tsx");
    const runtime = (options.runtime ?? "auto").toLowerCase();

    log.start();

    const usingBun =
      runtime === "bun" ||
      (runtime === "auto" && (isBun || (ext === "ts" && !hasTsx && hasBun)));

    if (runtime !== "auto" && runtime !== "bun" && runtime !== "node") {
      log.error("Runtime inválido. Use: auto, bun ou node.");
      process.exit(1);
    }

    console.log(
      chalk.blue("⚙️ Runtime: ") +
        chalk.magenta(usingBun ? "Bun" : "Node.js")
    );

    if (env) log.env();
    if (watch) log.watch();

    // ===== BUN =====
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

    // ===== TS =====
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

    // ===== JS =====
    if (watch) {
      log.warn("Watch não suportado para JS");
    }

    const args: string[] = [];

    if (env) args.push(`--env-file=${env}`);
    args.push(entry);

    run(process.execPath, args);
  });

// ===== START =====

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

// ===== fallback =====

program.on("command:*", () => {
  log.error("Comando inválido");
  console.log(chalk.gray("👉 Use: nexo --help"));
  process.exit(1);
});

program.parse(process.argv);