import { afterEach, beforeEach, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import addStepCommand from "../../source/commands/add-step.ts";
import { ensureTasksDir } from "../../source/io/fs.ts";
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

test("add-step shows error when no ID", async () => {
  const output = await addStepCommand({ step: "Do something" });
  expect(output).toContain("Missing task ID");
});

test("add-step shows error when no step", async () => {
  const output = await addStepCommand({ id: "1" });
  expect(output).toContain("Missing required flag: --step");
});

test("add-step shows error for missing task", async () => {
  await ensureTasksDir(tempDir);
  const output = await addStepCommand({ id: "99", step: "Do something" });
  expect(output).toContain("not found");
});

test("add-step adds step to task", async () => {
  const dir = await ensureTasksDir(tempDir);
  await Bun.write(join(dir, "001-test.md"), "# Test\n\nDesc.\n");

  const output = await addStepCommand({ id: "1", step: "New step" });
  expect(output).toContain("Added step");
  expect(output).toContain("New step");

  const content = await Bun.file(join(resolveTasksPath(tempDir), "001-test.md"))
    .text();
  expect(content).toContain("- [ ] New step");
});
