import chalk from "chalk";
import { readPRD, writePRD } from "../io/fs.ts";
import { addTask } from "../domain/task.ts";

interface AddTaskOptions {
	id?: string;
	task?: string;
}

export default async function addTaskCommand({ id, task }: AddTaskOptions): Promise<string> {
	if (!id) {
		return chalk.red('Error: Missing PRD ID. Usage: fine add-task <id> --task "Task text"');
	}
	if (!task) {
		return chalk.red("Error: Missing required flag: --task");
	}

	const numericId = parseInt(id, 10);
	if (isNaN(numericId)) {
		return chalk.red(`Error: Invalid ID: "${id}". Must be a number.`);
	}

	const prd = await readPRD(numericId);
	if (!prd) {
		return chalk.red(`Error: PRD #${numericId} not found.`);
	}

	const updated = addTask(prd, task);
	await writePRD(updated);
	return chalk.green(`Added task to PRD #${numericId}: "${task}"`);
}
