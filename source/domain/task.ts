import type {
  Task,
  TaskInput,
  TaskSummary,
  ValidationResult,
} from "./types.ts";
import {
  extractDescription,
  extractSteps,
  extractTitle,
  serializeMarkdown,
} from "./format.ts";

export function parseTask(id: number, slug: string, markdown: string): Task {
  const title = extractTitle(markdown) ?? "";
  const description = extractDescription(markdown);
  const steps = extractSteps(markdown);

  return { id, slug, title, description, steps };
}

export function serializeTask(task: Task): string {
  return serializeMarkdown(task.title, task.description, task.steps);
}

export function validateTask(input: TaskInput): ValidationResult {
  const errors: string[] = [];

  if (!input.title.trim()) {
    errors.push("Title is required");
  }

  return { valid: errors.length === 0, errors };
}

export function summarizeTask(task: Task): TaskSummary {
  return {
    id: task.id,
    slug: task.slug,
    title: task.title,
    completedSteps: task.steps.filter((s) => s.completed).length,
    totalSteps: task.steps.length,
  };
}
