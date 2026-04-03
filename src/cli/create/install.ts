import { spawn } from "child_process";

import type { ProjectRuntime } from "../../create/prompts";

export async function installDependencies(
  targetDir: string,
  runtime: ProjectRuntime
): Promise<void> {
  const command = runtime === "bun" ? "bun" : "npm";

  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, ["install"], {
      cwd: targetDir,
      stdio: "ignore",
      shell: process.platform === "win32",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error("Falha ao instalar dependências."));
    });
  });
}
