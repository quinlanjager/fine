import { afterEach, beforeEach, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import list from "../../source/commands/list.ts";
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

test("list shows message when no tasks exist", async () => {
  await ensureTasksDir(tempDir);
  const output = await list();
  expect(output).toContain("No tasks found");
});

test("list shows tasks with progress", async () => {
  const dir = await ensureTasksDir(tempDir);
  await Bun.write(
    join(dir, "001-first.md"),
    "# First Task\n\nDesc.\n\n## Steps\n\n- [ ] Step A\n- [x] Step B\n",
  );
  await Bun.write(join(dir, "002-second.md"), "# Second Task\n\nAnother.\n");

  const output = await list();
  expect(output).toContain("#001");
  expect(output).toContain("First Task");
  expect(output).toContain("[1/2]");
  expect(output).toContain("#002");
  expect(output).toContain("Second Task");
  expect(output).toContain("[0/0]");
});
