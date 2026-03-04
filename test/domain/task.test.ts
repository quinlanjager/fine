import { test, expect } from "bun:test";
import { addTask, toggleTask, removeTask } from "../../source/domain/task.ts";
import { parsePRD } from "../../source/domain/prd.ts";

const basePRD = parsePRD(1, "test", "# Test\n\nDesc.\n\n## Tasks\n\n- [ ] Task A\n- [x] Task B\n");

test("addTask appends a new incomplete task", () => {
	const result = addTask(basePRD, "Task C");
	expect(result.tasks).toHaveLength(3);
	expect(result.tasks[2]).toEqual({ text: "Task C", completed: false });
});

test("addTask does not mutate original", () => {
	addTask(basePRD, "Task C");
	expect(basePRD.tasks).toHaveLength(2);
});

test("toggleTask flips completion status", () => {
	const result = toggleTask(basePRD, 0);
	expect(result.tasks[0]!.completed).toBe(true);

	const result2 = toggleTask(basePRD, 1);
	expect(result2.tasks[1]!.completed).toBe(false);
});

test("toggleTask returns same PRD for out-of-range index", () => {
	expect(toggleTask(basePRD, -1)).toBe(basePRD);
	expect(toggleTask(basePRD, 99)).toBe(basePRD);
});

test("removeTask removes task at index", () => {
	const result = removeTask(basePRD, 0);
	expect(result.tasks).toHaveLength(1);
	expect(result.tasks[0]!.text).toBe("Task B");
});

test("removeTask returns same PRD for out-of-range index", () => {
	expect(removeTask(basePRD, -1)).toBe(basePRD);
	expect(removeTask(basePRD, 99)).toBe(basePRD);
});
