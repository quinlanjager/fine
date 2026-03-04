import type { PRD, Task } from "./types.ts";

export function addTask(prd: PRD, text: string): PRD {
	const newTask: Task = { text, completed: false };
	return { ...prd, tasks: [...prd.tasks, newTask] };
}

export function toggleTask(prd: PRD, taskIndex: number): PRD {
	if (taskIndex < 0 || taskIndex >= prd.tasks.length) return prd;
	const tasks = prd.tasks.map((task, i) =>
		i === taskIndex ? { ...task, completed: !task.completed } : task,
	);
	return { ...prd, tasks };
}

export function removeTask(prd: PRD, taskIndex: number): PRD {
	if (taskIndex < 0 || taskIndex >= prd.tasks.length) return prd;
	const tasks = prd.tasks.filter((_, i) => i !== taskIndex);
	return { ...prd, tasks };
}
