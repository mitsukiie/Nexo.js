import { spawnSync } from "child_process";

export const isBunRuntime = typeof (globalThis as any).Bun !== "undefined";

export function hasRuntime(command: string): boolean {
  const result = spawnSync(command, ["--version"], { stdio: "ignore" });
  return !result.error && result.status === 0;
}

export type RuntimeMode = "auto" | "bun" | "node";
