import { expect, test } from "bun:test";
import {
  extractDescription,
  extractSteps,
  extractTitle,
  serializeMarkdown,
  serializeStep,
  serializeSteps,
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

test("extractDescription returns content between title and steps", () => {
  const md =
    "# Title\n\nThis is the description.\n\n## Steps\n\n- [ ] Do something";
  expect(extractDescription(md)).toBe("This is the description.");
});

test("extractDescription returns content after title when no steps section", () => {
  const md = "# Title\n\nJust a description.";
  expect(extractDescription(md)).toBe("Just a description.");
});

test("extractDescription returns empty string when no title", () => {
  expect(extractDescription("No title here")).toBe("");
});

test("extractDescription handles multi-line descriptions", () => {
  const md = "# Title\n\nLine one.\n\nLine two.\n\n## Steps\n\n- [ ] Step";
  expect(extractDescription(md)).toBe("Line one.\n\nLine two.");
});

test("extractSteps parses checkbox items", () => {
  const md =
    "# Title\n\n## Steps\n\n- [ ] First step\n- [x] Done step\n- [ ] Third step";
  const steps = extractSteps(md);
  expect(steps).toEqual([
    { text: "First step", completed: false },
    { text: "Done step", completed: true },
    { text: "Third step", completed: false },
  ]);
});

test("extractSteps returns empty array when no steps section", () => {
  expect(extractSteps("# Title\n\nJust a description.")).toEqual([]);
});

test("serializeStep formats incomplete step", () => {
  expect(serializeStep({ text: "Do thing", completed: false })).toBe(
    "- [ ] Do thing",
  );
});

test("serializeStep formats completed step", () => {
  expect(serializeStep({ text: "Done thing", completed: true })).toBe(
    "- [x] Done thing",
  );
});

test("serializeSteps returns empty string for no steps", () => {
  expect(serializeSteps([])).toBe("");
});

test("serializeSteps formats step section", () => {
  const result = serializeSteps([
    { text: "A", completed: false },
    { text: "B", completed: true },
  ]);
  expect(result).toBe("## Steps\n\n- [ ] A\n- [x] B");
});

test("serializeMarkdown produces full document", () => {
  const result = serializeMarkdown("My Task", "A description.", [
    { text: "Step 1", completed: false },
  ]);
  expect(result).toBe(
    "# My Task\n\nA description.\n\n## Steps\n\n- [ ] Step 1\n",
  );
});

test("serializeMarkdown omits steps section when empty", () => {
  const result = serializeMarkdown("My Task", "A description.", []);
  expect(result).toBe("# My Task\n\nA description.\n");
});

test("serializeMarkdown omits description when empty", () => {
  const result = serializeMarkdown("My Task", "", []);
  expect(result).toBe("# My Task\n");
});
