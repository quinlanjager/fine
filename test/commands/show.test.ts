import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import show from "../../source/commands/show.ts";
import { ensurePrdsDir } from "../../source/io/fs.ts";

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
	expect(output).toContain("Missing PRD ID");
});

test("show displays error for missing PRD", async () => {
	await ensurePrdsDir(tempDir);
	const output = await show({ id: "99" });
	expect(output).toContain("not found");
});

test("show displays PRD content", async () => {
	const dir = await ensurePrdsDir(tempDir);
	await Bun.write(
		join(dir, "001-my-prd.md"),
		"# My PRD\n\nA description.\n\n## Tasks\n\n- [ ] Task 1\n- [x] Task 2\n",
	);

	const output = await show({ id: "1" });
	expect(output).toContain("#001");
	expect(output).toContain("My PRD");
	expect(output).toContain("A description.");
	expect(output).toContain("Task 1");
	expect(output).toContain("Task 2");
});

test("show accepts unpadded ID", async () => {
	const dir = await ensurePrdsDir(tempDir);
	await Bun.write(join(dir, "001-test.md"), "# Test\n\nDesc.\n");

	const output = await show({ id: "1" });
	expect(output).toContain("Test");
});
