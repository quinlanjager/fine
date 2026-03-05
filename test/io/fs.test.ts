import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
	ensureTasksDir,
	listTaskFiles,
	getExistingIds,
	readTask,
	writeTask,
	createTask,
} from "../../source/io/fs.ts";
import { resolveTasksPath } from "../../source/io/config.ts";
import type { Task } from "../../source/domain/types.ts";

let tempDir: string;

beforeEach(async () => {
	tempDir = await mkdtemp(join(tmpdir(), "fine-test-"));
});

afterEach(async () => {
	await rm(tempDir, { recursive: true, force: true });
});

test("ensureTasksDir creates directory", async () => {
	const dir = await ensureTasksDir(tempDir);
	expect(dir).toBe(resolveTasksPath(tempDir));
	const file = Bun.file(dir);
	// Check directory exists by trying to list it
	const glob = new Bun.Glob("*");
	const results: string[] = [];
	for await (const f of glob.scan({ cwd: dir })) {
		results.push(f);
	}
	expect(results).toEqual([]);
});

test("listTaskFiles returns empty array when no files", async () => {
	await ensureTasksDir(tempDir);
	const files = await listTaskFiles(tempDir);
	expect(files).toEqual([]);
});

test("listTaskFiles returns sorted task files", async () => {
	const dir = await ensureTasksDir(tempDir);
	await Bun.write(join(dir, "002-second.md"), "# Second");
	await Bun.write(join(dir, "001-first.md"), "# First");
	await Bun.write(join(dir, "not-a-task.txt"), "ignore me");

	const files = await listTaskFiles(tempDir);
	expect(files).toEqual(["001-first.md", "002-second.md"]);
});

test("getExistingIds returns parsed IDs", async () => {
	const dir = await ensureTasksDir(tempDir);
	await Bun.write(join(dir, "001-first.md"), "# First");
	await Bun.write(join(dir, "003-third.md"), "# Third");

	const ids = await getExistingIds(tempDir);
	expect(ids).toEqual([1, 3]);
});

test("readTask returns parsed task", async () => {
	const dir = await ensureTasksDir(tempDir);
	await Bun.write(
		join(dir, "001-my-task.md"),
		"# My Task\n\nDescription here.\n\n## Steps\n\n- [ ] Step 1\n",
	);

	const task = await readTask(1, tempDir);
	expect(task).not.toBeUndefined();
	expect(task!.id).toBe(1);
	expect(task!.slug).toBe("my-task");
	expect(task!.title).toBe("My Task");
	expect(task!.description).toBe("Description here.");
	expect(task!.steps).toHaveLength(1);
});

test("readTask returns undefined for missing ID", async () => {
	await ensureTasksDir(tempDir);
	const task = await readTask(99, tempDir);
	expect(task).toBeUndefined();
});

test("writeTask writes file to disk", async () => {
	const task: Task = {
		id: 1,
		slug: "test-task",
		title: "Test Task",
		description: "A test.",
		steps: [{ text: "Do something", completed: false }],
	};

	const filename = await writeTask(task, tempDir);
	expect(filename).toBe("001-test-task.md");

	const content = await Bun.file(join(resolveTasksPath(tempDir), filename)).text();
	expect(content).toContain("# Test Task");
	expect(content).toContain("- [ ] Do something");
});

test("createTask creates a new task file", async () => {
	const { task, filename } = await createTask(
		{ title: "User Auth", description: "Auth system." },
		tempDir,
	);

	expect(task.id).toBe(1);
	expect(task.slug).toBe("user-auth");
	expect(filename).toBe("001-user-auth.md");

	const content = await Bun.file(join(resolveTasksPath(tempDir), filename)).text();
	expect(content).toContain("# User Auth");
});

test("createTask increments ID", async () => {
	await createTask({ title: "First", description: "" }, tempDir);
	const { task } = await createTask({ title: "Second", description: "" }, tempDir);
	expect(task.id).toBe(2);
});

test("createTask throws on empty title", async () => {
	expect(createTask({ title: "", description: "" }, tempDir)).rejects.toThrow("Title is required");
});
