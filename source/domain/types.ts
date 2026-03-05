export interface Step {
	readonly text: string;
	readonly completed: boolean;
}

export interface Task {
	readonly id: number;
	readonly slug: string;
	readonly title: string;
	readonly description: string;
	readonly steps: readonly Step[];
}

export interface TaskSummary {
	readonly id: number;
	readonly slug: string;
	readonly title: string;
	readonly completedSteps: number;
	readonly totalSteps: number;
}

export interface TaskInput {
	readonly title: string;
	readonly description: string;
}

export interface ValidationResult {
	readonly valid: boolean;
	readonly errors: readonly string[];
}
