import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import show from "../../source/commands/show.ts";
import { ensureTasksDir } from "../../source/io/fs.ts";

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

test("show displays error when no ID", async () => {
	const output = await show({});
	expect(output).toContain("Missing task ID");
});

test("show displays error for missing task", async () => {
	await ensureTasksDir(tempDir);
	const output = await show({ id: "99" });
	expect(output).toContain("not found");
});

test("show displays task content", async () => {
	const dir = await ensureTasksDir(tempDir);
	await Bun.write(
		join(dir, "001-my-task.md"),
		"# My Task\n\nA description.\n\n## Steps\n\n- [ ] Step 1\n- [x] Step 2\n",
	);

	const output = await show({ id: "1" });
	expect(output).toContain("#001");
	expect(output).toContain("My Task");
	expect(output).toContain("A description.");
	expect(output).toContain("Step 1");
	expect(output).toContain("Step 2");
});

test("show accepts unpadded ID", async () => {
	const dir = await ensureTasksDir(tempDir);
	await Bun.write(join(dir, "001-test.md"), "# Test\n\nDesc.\n");

	const output = await show({ id: "1" });
	expect(output).toContain("Test");
});
