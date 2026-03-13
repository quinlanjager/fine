import { expect, test } from "bun:test";
import { addStep, removeStep, toggleStep } from "../../source/domain/step.ts";
import { parseTask } from "../../source/domain/task.ts";

const baseTask = parseTask(
  1,
  "test",
  "# Test\n\nDesc.\n\n## Steps\n\n- [ ] Step A\n- [x] Step B\n",
);

test("addStep appends a new incomplete step", () => {
  const result = addStep(baseTask, "Step C");
  expect(result.steps).toHaveLength(3);
  expect(result.steps[2]).toEqual({ text: "Step C", completed: false });
});

test("addStep does not mutate original", () => {
  addStep(baseTask, "Step C");
  expect(baseTask.steps).toHaveLength(2);
});

test("toggleStep flips completion status", () => {
  const result = toggleStep(baseTask, 0);
  expect(result.steps[0]!.completed).toBe(true);

  const result2 = toggleStep(baseTask, 1);
  expect(result2.steps[1]!.completed).toBe(false);
});

test("toggleStep returns same task for out-of-range index", () => {
  expect(toggleStep(baseTask, -1)).toBe(baseTask);
  expect(toggleStep(baseTask, 99)).toBe(baseTask);
});

test("removeStep removes step at index", () => {
  const result = removeStep(baseTask, 0);
  expect(result.steps).toHaveLength(1);
  expect(result.steps[0]!.text).toBe("Step B");
});

test("removeStep returns same task for out-of-range index", () => {
  expect(removeStep(baseTask, -1)).toBe(baseTask);
  expect(removeStep(baseTask, 99)).toBe(baseTask);
});
