import type { Step } from "./types.ts";

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

export function extractSteps(markdown: string): Step[] {
	const lines = markdown.split("\n");
	let inStepsSection = false;
	const steps: Step[] = [];

	for (const line of lines) {
		if (/^##\s+Steps\s*$/.test(line)) {
			inStepsSection = true;
			continue;
		}
		if (inStepsSection && /^##\s+/.test(line)) {
			break;
		}
		if (inStepsSection) {
			const match = line.match(/^-\s+\[([ x])\]\s+(.+)$/);
			if (match) {
				steps.push({
					completed: match[1] === "x",
					text: match[2]!.trim(),
				});
			}
		}
	}

	return steps;
}

export function serializeStep(step: Step): string {
	const checkbox = step.completed ? "[x]" : "[ ]";
	return `- ${checkbox} ${step.text}`;
}

export function serializeSteps(steps: readonly Step[]): string {
	if (steps.length === 0) return "";
	return "## Steps\n\n" + steps.map(serializeStep).join("\n");
}

export function serializeMarkdown(
	title: string,
	description: string,
	steps: readonly Step[],
): string {
	let md = `# ${title}\n`;
	if (description) {
		md += `\n${description}\n`;
	}
	const stepSection = serializeSteps(steps);
	if (stepSection) {
		md += `\n${stepSection}\n`;
	}
	return md;
}
