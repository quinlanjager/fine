import chalk from "chalk";
import { createTask } from "../io/fs.ts";

interface CreateOptions {
  title?: string;
  description?: string;
}

export default async function create(
  { title, description }: CreateOptions,
): Promise<string> {
  if (!title) {
    return chalk.red("Error: Missing required flag: --title (-t)");
  }

  const { task, filename } = await createTask({
    title,
    description: description ?? "",
  });
  return chalk.green(`Created task #${task.id}: ${filename}`);
}
