import type { PRD, PRDInput, PRDSummary, ValidationResult } from "./types.ts";
import { extractTitle, extractDescription, extractTasks, serializeMarkdown } from "./format.ts";

export function parsePRD(id: number, slug: string, markdown: string): PRD {
	const title = extractTitle(markdown) ?? "";
	const description = extractDescription(markdown);
	const tasks = extractTasks(markdown);

	return { id, slug, title, description, tasks };
}

export function serializePRD(prd: PRD): string {
	return serializeMarkdown(prd.title, prd.description, prd.tasks);
}

export function validatePRD(input: PRDInput): ValidationResult {
	const errors: string[] = [];

	if (!input.title.trim()) {
		errors.push("Title is required");
	}

	return { valid: errors.length === 0, errors };
}

export function summarizePRD(prd: PRD): PRDSummary {
	return {
		id: prd.id,
		slug: prd.slug,
		title: prd.title,
		completedTasks: prd.tasks.filter((t) => t.completed).length,
		totalTasks: prd.tasks.length,
	};
}
