import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import list from "../../source/commands/list.ts";
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

test("list shows message when no PRDs exist", async () => {
	await ensurePrdsDir(tempDir);
	const output = await list();
	expect(output).toContain("No PRDs found");
});

test("list shows PRDs with progress", async () => {
	const dir = await ensurePrdsDir(tempDir);
	await Bun.write(
		join(dir, "001-first.md"),
		"# First PRD\n\nDesc.\n\n## Tasks\n\n- [ ] Task A\n- [x] Task B\n",
	);
	await Bun.write(join(dir, "002-second.md"), "# Second PRD\n\nAnother.\n");

	const output = await list();
	expect(output).toContain("#001");
	expect(output).toContain("First PRD");
	expect(output).toContain("[1/2]");
	expect(output).toContain("#002");
	expect(output).toContain("Second PRD");
	expect(output).toContain("[0/0]");
});
