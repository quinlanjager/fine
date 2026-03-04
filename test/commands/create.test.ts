import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import create from "../../source/commands/create.ts";
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

test("create shows error when no title", async () => {
	const output = await create({});
	expect(output).toContain("Missing required flag: --title");
});

test("create creates a PRD file", async () => {
	const output = await create({ title: "Test PRD", description: "A test." });
	expect(output).toContain("Created PRD #1");
	expect(output).toContain("001-test-prd.md");

	const file = Bun.file(join(resolvePrdsPath(tempDir), "001-test-prd.md"));
	const content = await file.text();
	expect(content).toContain("# Test PRD");
	expect(content).toContain("A test.");
});
