import { cancel, intro, outro, spinner } from "@clack/prompts";
import chalk from "chalk";

import { generateProject, prepareProjectTarget } from "../../create/generator";
import { askCreateChoices } from "./prompts";
import { installDependencies } from "./install";

function stopOnSigint() {
  const onSigint = () => {
    cancel("Operação cancelada.");
    process.exit(0);
  };

  process.once("SIGINT", onSigint);
  return () => process.off("SIGINT", onSigint);
}

export async function runCreateFlow(initialName?: string): Promise<void> {
  intro(chalk.cyan("🚀 NexoCord"));

  const unbindSigint = stopOnSigint();

  try {
    const choices = await askCreateChoices(initialName);

    const setupStep = spinner();
    setupStep.start("Criando projeto...");
    const targetDir = await prepareProjectTarget(choices.name);
    setupStep.stop("✔ Criando projeto...");

    const copyStep = spinner();
    copyStep.start("Copiando template...");
    const result = await generateProject(choices, targetDir);
    copyStep.stop("✔ Copiando template...");

    const installStep = spinner();
    installStep.start("Instalando dependências...");
    await installDependencies(result.targetDir, result.runtime);
    installStep.stop("✔ Instalando dependências...");

    const runner = result.runtime === "bun" ? "bunx" : "npx";
    outro(
      `🎉 Bot criado!\n\nPróximos passos:\n\n   cd ${result.projectName}\n   ${runner} nexo dev\n\nDocs: https://nexocord.vercel.app/`
    );
  } catch (error: any) {
    cancel(error?.message ?? "Falha ao criar o projeto.");
    process.exit(1);
  } finally {
    unbindSigint();
  }
}
