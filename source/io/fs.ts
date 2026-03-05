import { join } from "node:path";
import { mkdir, access, readdir, readFile, writeFile } from "node:fs/promises";
import { resolveTasksPath } from "./config.ts";
import { parseTask, serializeTask } from "../domain/task.ts";
import { buildFilename, parseIdFromFilename, parseSlugFromFilename, nextId, slugify } from "../domain/id.ts";
import { validateTask } from "../domain/task.ts";
import type { Task, TaskInput } from "../domain/types.ts";

const TASK_FILENAME_PATTERN = /^\d{3}-.*\.md$/;

export async function ensureTasksDir(basePath?: string): Promise<string> {
	const dir = resolveTasksPath(basePath);
	await mkdir(dir, { recursive: true });
	return dir;
}

export async function listTaskFiles(basePath?: string): Promise<string[]> {
	const dir = resolveTasksPath(basePath);
	try {
		await access(dir);
	} catch {
		return [];
	}
	const entries = await readdir(dir);
	return entries.filter((f) => TASK_FILENAME_PATTERN.test(f)).sort();
}

export async function getExistingIds(basePath?: string): Promise<number[]> {
	const files = await listTaskFiles(basePath);
	return files
		.map(parseIdFromFilename)
		.filter((id): id is number => id !== undefined);
}

export async function readTask(id: number, basePath?: string): Promise<Task | undefined> {
	const files = await listTaskFiles(basePath);
	const filename = files.find((f) => parseIdFromFilename(f) === id);
	if (!filename) return undefined;

	const dir = resolveTasksPath(basePath);
	let content: string;
	try {
		content = await readFile(join(dir, filename), "utf-8");
	} catch {
		return undefined;
	}
	const slug = parseSlugFromFilename(filename) ?? "";
	return parseTask(id, slug, content);
}

export async function writeTask(task: Task, basePath?: string): Promise<string> {
	const dir = await ensureTasksDir(basePath);
	const filename = buildFilename(task.id, task.slug);
	const filePath = join(dir, filename);
	const content = serializeTask(task);
	await writeFile(filePath, content);
	return filename;
}

export async function createTask(input: TaskInput, basePath?: string): Promise<{ task: Task; filename: string }> {
	const validation = validateTask(input);
	if (!validation.valid) {
		throw new Error(validation.errors.join(", "));
	}

	const existingIds = await getExistingIds(basePath);
	const id = nextId(existingIds);
	const slug = slugify(input.title);

	const task: Task = {
		id,
		slug,
		title: input.title,
		description: input.description,
		steps: [],
	};

	const filename = await writeTask(task, basePath);
	return { task, filename };
}
