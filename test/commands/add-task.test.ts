import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import addTaskCommand from "../../source/commands/add-task.ts";
import { ensurePrdsDir } from "../../source/io/fs.ts";
import { resolvePrdsPath } from "../../source/io/config.ts";

let tempDir: string;
let origCwd: string;

beforeEach(async () => {
	tempDir = await mkdtemp(join(tmpdir(), "fine-test-"));
	origCwd = process.cwd();
	process.chdir(tempDir);
});

afterEach(async () => {
	process.chdir(origCwd);
	await rm(tempDir, { recursive: true, force: true });
});

test("add-task shows error when no ID", async () => {
	const output = await addTaskCommand({ task: "Do something" });
	expect(output).toContain("Missing PRD ID");
});

test("add-task shows error when no task", async () => {
	const output = await addTaskCommand({ id: "1" });
	expect(output).toContain("Missing required flag: --task");
});

test("add-task shows error for missing PRD", async () => {
	await ensurePrdsDir(tempDir);
	const output = await addTaskCommand({ id: "99", task: "Do something" });
	expect(output).toContain("not found");
});

test("add-task adds task to PRD", async () => {
	const dir = await ensurePrdsDir(tempDir);
	await Bun.write(join(dir, "001-test.md"), "# Test\n\nDesc.\n");

	const output = await addTaskCommand({ id: "1", task: "New task" });
	expect(output).toContain("Added task");
	expect(output).toContain("New task");

	const content = await Bun.file(join(resolvePrdsPath(tempDir), "001-test.md")).text();
	expect(content).toContain("- [ ] New task");
});
