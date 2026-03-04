export interface Task {
	readonly text: string;
	readonly completed: boolean;
}

export interface PRD {
	readonly id: number;
	readonly slug: string;
	readonly title: string;
	readonly description: string;
	readonly tasks: readonly Task[];
}

export interface PRDSummary {
	readonly id: number;
	readonly slug: string;
	readonly title: string;
	readonly completedTasks: number;
	readonly totalTasks: number;
}

export interface PRDInput {
	readonly title: string;
	readonly description: string;
}

export interface ValidationResult {
	readonly valid: boolean;
	readonly errors: readonly string[];
}
