import chalk from "chalk";
import { listTaskFiles, readTask } from "../io/fs.ts";
import { parseIdFromFilename } from "../domain/id.ts";
import { summarizeTask } from "../domain/task.ts";
import type { TaskSummary } from "../domain/types.ts";

export default async function list(): Promise<string> {
  const files = await listTaskFiles();
  const summaries: TaskSummary[] = [];
  for (const file of files) {
    const id = parseIdFromFilename(file);
    if (id === undefined) continue;
    const task = await readTask(id);
    if (task) summaries.push(summarizeTask(task));
  }

  if (summaries.length === 0) {
    return 'No tasks found. Create one with: fine create --title "My Task"';
  }

  return summaries
    .map((s) => {
      const id = chalk.cyan(`#${String(s.id).padStart(3, "0")}`);
      const progress = chalk.dim(`[${s.completedSteps}/${s.totalSteps}]`);
      return `${id} ${s.title} ${progress}`;
    })
    .join("\n");
}
