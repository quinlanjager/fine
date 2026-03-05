import { test, expect } from "bun:test";
import { parseTask, serializeTask, validateTask, summarizeTask } from "../../source/domain/task.ts";

test("parseTask extracts all fields", () => {
	const md = "# My Task\n\nA description.\n\n## Steps\n\n- [ ] Step 1\n- [x] Step 2\n";
	const task = parseTask(1, "my-task", md);
	expect(task).toEqual({
		id: 1,
		slug: "my-task",
		title: "My Task",
		description: "A description.",
		steps: [
			{ text: "Step 1", completed: false },
			{ text: "Step 2", completed: true },
		],
	});
});

test("parseTask handles missing title", () => {
	const task = parseTask(1, "test", "No title here");
	expect(task.title).toBe("");
});

test("serializeTask roundtrips", () => {
	const md = "# My Task\n\nA description.\n\n## Steps\n\n- [ ] Step 1\n- [x] Step 2\n";
	const task = parseTask(1, "my-task", md);
	expect(serializeTask(task)).toBe(md);
});

test("validateTask requires title", () => {
	expect(validateTask({ title: "", description: "" })).toEqual({
		valid: false,
		errors: ["Title is required"],
	});
});

test("validateTask accepts valid input", () => {
	expect(validateTask({ title: "Test", description: "" })).toEqual({
		valid: true,
		errors: [],
	});
});

test("summarizeTask computes step counts", () => {
	const task = parseTask(
		1,
		"test",
		"# Test\n\nDesc.\n\n## Steps\n\n- [ ] A\n- [x] B\n- [x] C\n",
	);
	const summary = summarizeTask(task);
	expect(summary).toEqual({
		id: 1,
		slug: "test",
		title: "Test",
		completedSteps: 2,
		totalSteps: 3,
	});
});
