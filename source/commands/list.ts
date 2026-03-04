import chalk from "chalk";
import { listPRDFiles, readPRD } from "../io/fs.ts";
import { parseIdFromFilename } from "../domain/id.ts";
import { summarizePRD } from "../domain/prd.ts";
import type { PRDSummary } from "../domain/types.ts";

export default async function list(): Promise<string> {
	const files = await listPRDFiles();
	const summaries: PRDSummary[] = [];
	for (const file of files) {
		const id = parseIdFromFilename(file);
		if (id === undefined) continue;
		const prd = await readPRD(id);
		if (prd) summaries.push(summarizePRD(prd));
	}

	if (summaries.length === 0) {
		return 'No PRDs found. Create one with: fine create --title "My PRD"';
	}

	return summaries
		.map((s) => {
			const id = chalk.cyan(`#${String(s.id).padStart(3, "0")}`);
			const progress = chalk.dim(`[${s.completedTasks}/${s.totalTasks}]`);
			return `${id} ${s.title} ${progress}`;
		})
		.join("\n");
}
