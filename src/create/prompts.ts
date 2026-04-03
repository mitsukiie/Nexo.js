export type ProjectRuntime = "node" | "bun";
export type ProjectLanguage = "typescript" | "javascript";

export interface CreateAnswers {
  name: string;
  runtime: ProjectRuntime;
  language: ProjectLanguage;
}
