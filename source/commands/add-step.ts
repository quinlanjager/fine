import chalk from "chalk";
import { readTask, writeTask } from "../io/fs.ts";
import { addStep } from "../domain/step.ts";

interface AddStepOptions {
	id?: string;
	step?: string;
}

export default async function addStepCommand({ id, step }: AddStepOptions): Promise<string> {
	if (!id) {
		return chalk.red('Error: Missing task ID. Usage: fine add-step <id> --step "Step text"');
	}
	if (!step) {
		return chalk.red("Error: Missing required flag: --step");
	}

	const numericId = parseInt(id, 10);
	if (isNaN(numericId)) {
		return chalk.red(`Error: Invalid ID: "${id}". Must be a number.`);
	}

	const task = await readTask(numericId);
	if (!task) {
		return chalk.red(`Error: Task #${numericId} not found.`);
	}

	const updated = addStep(task, step);
	await writeTask(updated);
	return chalk.green(`Added step to task #${numericId}: "${step}"`);
}
