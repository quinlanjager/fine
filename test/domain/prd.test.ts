import { test, expect } from "bun:test";
import { parsePRD, serializePRD, validatePRD, summarizePRD } from "../../source/domain/prd.ts";

test("parsePRD extracts all fields", () => {
	const md = "# My PRD\n\nA description.\n\n## Tasks\n\n- [ ] Task 1\n- [x] Task 2\n";
	const prd = parsePRD(1, "my-prd", md);
	expect(prd).toEqual({
		id: 1,
		slug: "my-prd",
		title: "My PRD",
		description: "A description.",
		tasks: [
			{ text: "Task 1", completed: false },
			{ text: "Task 2", completed: true },
		],
	});
});

test("parsePRD handles missing title", () => {
	const prd = parsePRD(1, "test", "No title here");
	expect(prd.title).toBe("");
});

test("serializePRD roundtrips", () => {
	const md = "# My PRD\n\nA description.\n\n## Tasks\n\n- [ ] Task 1\n- [x] Task 2\n";
	const prd = parsePRD(1, "my-prd", md);
	expect(serializePRD(prd)).toBe(md);
});

test("validatePRD requires title", () => {
	expect(validatePRD({ title: "", description: "" })).toEqual({
		valid: false,
		errors: ["Title is required"],
	});
});

test("validatePRD accepts valid input", () => {
	expect(validatePRD({ title: "Test", description: "" })).toEqual({
		valid: true,
		errors: [],
	});
});

test("summarizePRD computes task counts", () => {
	const prd = parsePRD(
		1,
		"test",
		"# Test\n\nDesc.\n\n## Tasks\n\n- [ ] A\n- [x] B\n- [x] C\n",
	);
	const summary = summarizePRD(prd);
	expect(summary).toEqual({
		id: 1,
		slug: "test",
		title: "Test",
		completedTasks: 2,
		totalTasks: 3,
	});
});
