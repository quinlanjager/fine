import chalk from "chalk";
import { Marked } from "marked";
import { markedTerminal } from "marked-terminal";
import { readTask } from "../io/fs.ts";

const marked = new Marked(markedTerminal() as any);

interface ShowOptions {
	id?: string;
}

export default async function show({ id }: ShowOptions): Promise<string> {
	if (!id) {
		return chalk.red("Error: Missing task ID. Usage: fine show <id>");
	}

	const numericId = parseInt(id, 10);
	if (isNaN(numericId)) {
		return chalk.red(`Error: Invalid ID: "${id}". Must be a number.`);
	}

	const task = await readTask(numericId);
	if (!task) {
		return chalk.red(`Error: Task #${numericId} not found.`);
	}

	const lines: string[] = [];
	lines.push(chalk.bold.cyan(`#${String(task.id).padStart(3, "0")} ${task.title}`));

	if (task.description) {
		lines.push("");
		lines.push(task.description);
	}

	if (task.steps.length > 0) {
		lines.push("");
		lines.push(chalk.bold("Steps:"));
		for (const step of task.steps) {
			const checkbox = step.completed
				? chalk.green("[x]")
				: chalk.yellow("[ ]");
			lines.push(`${checkbox} ${step.text}`);
		}
	}

	return lines.join("\n");
}
