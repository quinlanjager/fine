import chalk from "chalk";
import { createPRD } from "../io/fs.ts";

interface CreateOptions {
	title?: string;
	description?: string;
}

export default async function create({ title, description }: CreateOptions): Promise<string> {
	if (!title) {
		return chalk.red("Error: Missing required flag: --title (-t)");
	}

	const { prd, filename } = await createPRD({ title, description: description ?? "" });
	return chalk.green(`Created PRD #${prd.id}: ${filename}`);
}
