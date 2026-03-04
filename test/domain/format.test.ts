import { test, expect } from "bun:test";
import {
	extractTitle,
	extractDescription,
	extractTasks,
	serializeTask,
	serializeTasks,
	serializeMarkdown,
} from "../../source/domain/format.ts";

test("extractTitle returns the first H1", () => {
	expect(extractTitle("# My Title\n\nSome content")).toBe("My Title");
});

test("extractTitle returns undefined when no H1", () => {
	expect(extractTitle("No title here")).toBeUndefined();
});

test("extractTitle trims whitespace", () => {
	expect(extractTitle("#   Spaced Title  ")).toBe("Spaced Title");
});

test("extractDescription returns content between title and tasks", () => {
	const md = "# Title\n\nThis is the description.\n\n## Tasks\n\n- [ ] Do something";
	expect(extractDescription(md)).toBe("This is the description.");
});

test("extractDescription returns content after title when no tasks section", () => {
	const md = "# Title\n\nJust a description.";
	expect(extractDescription(md)).toBe("Just a description.");
});

test("extractDescription returns empty string when no title", () => {
	expect(extractDescription("No title here")).toBe("");
});

test("extractDescription handles multi-line descriptions", () => {
	const md = "# Title\n\nLine one.\n\nLine two.\n\n## Tasks\n\n- [ ] Task";
	expect(extractDescription(md)).toBe("Line one.\n\nLine two.");
});

test("extractTasks parses checkbox items", () => {
	const md = "# Title\n\n## Tasks\n\n- [ ] First task\n- [x] Done task\n- [ ] Third task";
	const tasks = extractTasks(md);
	expect(tasks).toEqual([
		{ text: "First task", completed: false },
		{ text: "Done task", completed: true },
		{ text: "Third task", completed: false },
	]);
});

test("extractTasks returns empty array when no tasks section", () => {
	expect(extractTasks("# Title\n\nJust a description.")).toEqual([]);
});

test("serializeTask formats incomplete task", () => {
	expect(serializeTask({ text: "Do thing", completed: false })).toBe("- [ ] Do thing");
});

test("serializeTask formats completed task", () => {
	expect(serializeTask({ text: "Done thing", completed: true })).toBe("- [x] Done thing");
});

test("serializeTasks returns empty string for no tasks", () => {
	expect(serializeTasks([])).toBe("");
});

test("serializeTasks formats task section", () => {
	const result = serializeTasks([
		{ text: "A", completed: false },
		{ text: "B", completed: true },
	]);
	expect(result).toBe("## Tasks\n\n- [ ] A\n- [x] B");
});

test("serializeMarkdown produces full document", () => {
	const result = serializeMarkdown("My PRD", "A description.", [
		{ text: "Task 1", completed: false },
	]);
	expect(result).toBe("# My PRD\n\nA description.\n\n## Tasks\n\n- [ ] Task 1\n");
});

test("serializeMarkdown omits tasks section when empty", () => {
	const result = serializeMarkdown("My PRD", "A description.", []);
	expect(result).toBe("# My PRD\n\nA description.\n");
});

test("serializeMarkdown omits description when empty", () => {
	const result = serializeMarkdown("My PRD", "", []);
	expect(result).toBe("# My PRD\n");
});
