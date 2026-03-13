import { afterEach, beforeEach, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import create from "../../source/commands/create.ts";
import { resolveTasksPath } from "../../source/io/config.ts";

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

test("create creates a task file", async () => {
  const output = await create({ title: "Test Task", description: "A test." });
  expect(output).toContain("Created task #1");
  expect(output).toContain("001-test-task.md");

  const file = Bun.file(join(resolveTasksPath(tempDir), "001-test-task.md"));
  const content = await file.text();
  expect(content).toContain("# Test Task");
  expect(content).toContain("A test.");
});
