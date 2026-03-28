#!/usr/bin/env node

import { Command } from "commander";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import chalk from "chalk";

// ===== constants =====

const isBun = typeof (globalThis as any).Bun !== "undefined";

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
  .version("1.0.0")
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
  .action((file: string, options: any) => {
    const entry = resolveEntry(file);
    const env = getEnvFile();
    const watch = options.watch;
    const ext = entry.split(".").pop();

    log.start();
    log.runtime();

    if (env) log.env();
    if (watch) log.watch();

    // ===== BUN =====
    if (isBun) {
      return run("bun", ["run", entry]);
    }

    // ===== TS =====
    if (ext === "ts") {
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