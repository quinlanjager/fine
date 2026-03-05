import type { Task, Step } from "./types.ts";

export function addStep(task: Task, text: string): Task {
	const newStep: Step = { text, completed: false };
	return { ...task, steps: [...task.steps, newStep] };
}

export function toggleStep(task: Task, stepIndex: number): Task {
	if (stepIndex < 0 || stepIndex >= task.steps.length) return task;
	const steps = task.steps.map((step, i) =>
		i === stepIndex ? { ...step, completed: !step.completed } : step,
	);
	return { ...task, steps };
}

export function removeStep(task: Task, stepIndex: number): Task {
	if (stepIndex < 0 || stepIndex >= task.steps.length) return task;
	const steps = task.steps.filter((_, i) => i !== stepIndex);
	return { ...task, steps };
}
