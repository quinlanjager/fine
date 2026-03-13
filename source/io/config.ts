import { resolve } from "node:path";

export function resolveTasksPath(basePath?: string): string {
  return resolve(basePath ?? process.cwd(), "tasks");
}
