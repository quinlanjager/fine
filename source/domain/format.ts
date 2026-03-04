import type { Task } from "./types.ts";

export function extractTitle(markdown: string): string | undefined {
	const match = markdown.match(/^#\s+(.+)$/m);
	return match?.[1]?.trim();
}

export function extractDescription(markdown: string): string {
	const lines = markdown.split("\n");
	let startIndex = -1;
	let endIndex = lines.length;

	for (let i = 0; i < lines.length; i++) {
		if (startIndex === -1 && /^#\s+/.test(lines[i]!)) {
			startIndex = i + 1;
			continue;
		}
		if (startIndex !== -1 && /^##\s+/.test(lines[i]!)) {
			endIndex = i;
			break;
		}
	}

	if (startIndex === -1) return "";
	return lines.slice(startIndex, endIndex).join("\n").trim();
}

export function extractTasks(markdown: string): Task[] {
	const lines = markdown.split("\n");
	let inTasksSection = false;
	const tasks: Task[] = [];

	for (const line of lines) {
		if (/^##\s+Tasks\s*$/.test(line)) {
			inTasksSection = true;
			continue;
		}
		if (inTasksSection && /^##\s+/.test(line)) {
			break;
		}
		if (inTasksSection) {
			const match = line.match(/^-\s+\[([ x])\]\s+(.+)$/);
			if (match) {
				tasks.push({
					completed: match[1] === "x",
					text: match[2]!.trim(),
				});
			}
		}
	}

	return tasks;
}

export function serializeTask(task: Task): string {
	const checkbox = task.completed ? "[x]" : "[ ]";
	return `- ${checkbox} ${task.text}`;
}

export function serializeTasks(tasks: readonly Task[]): string {
	if (tasks.length === 0) return "";
	return "## Tasks\n\n" + tasks.map(serializeTask).join("\n");
}

export function serializeMarkdown(
	title: string,
	description: string,
	tasks: readonly Task[],
): string {
	let md = `# ${title}\n`;
	if (description) {
		md += `\n${description}\n`;
	}
	const taskSection = serializeTasks(tasks);
	if (taskSection) {
		md += `\n${taskSection}\n`;
	}
	return md;
}
