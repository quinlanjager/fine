import chalk from "chalk";
import { Marked } from "marked";
import { markedTerminal } from "marked-terminal";
import { readPRD } from "../io/fs.ts";

const marked = new Marked(markedTerminal() as any);

interface ShowOptions {
	id?: string;
}

export default async function show({ id }: ShowOptions): Promise<string> {
	if (!id) {
		return chalk.red("Error: Missing PRD ID. Usage: fine show <id>");
	}

	const numericId = parseInt(id, 10);
	if (isNaN(numericId)) {
		return chalk.red(`Error: Invalid ID: "${id}". Must be a number.`);
	}

	const prd = await readPRD(numericId);
	if (!prd) {
		return chalk.red(`Error: PRD #${numericId} not found.`);
	}

	const lines: string[] = [];
	lines.push(chalk.bold.cyan(`#${String(prd.id).padStart(3, "0")} ${prd.title}`));

	if (prd.description) {
		lines.push("");
		lines.push(prd.description);
	}

	if (prd.tasks.length > 0) {
		lines.push("");
		lines.push(chalk.bold("Tasks:"));
		for (const task of prd.tasks) {
			const checkbox = task.completed
				? chalk.green("[x]")
				: chalk.yellow("[ ]");
			lines.push(`${checkbox} ${task.text}`);
		}
	}

	return lines.join("\n");
}
