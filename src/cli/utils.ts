import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";

export function resolveEntry(file?: string): string {
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

export function getEnvFile(): string | null {
  const env = path.resolve(process.cwd(), ".env");
  return fs.existsSync(env) ? env : null;
}

export function run(cmd: string, args: string[]) {
  const child = spawn(cmd, args, { stdio: "inherit" });

  child.on("close", (code) => process.exit(code ?? 0));
  child.on("error", () => {
    console.log(chalk.red("❌ Falha ao executar o bot."));
    process.exit(1);
  });
}
