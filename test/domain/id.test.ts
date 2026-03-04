import { test, expect } from "bun:test";
import {
	slugify,
	buildFilename,
	parseIdFromFilename,
	parseSlugFromFilename,
	nextId,
} from "../../source/domain/id.ts";

test("slugify converts to lowercase kebab-case", () => {
	expect(slugify("User Authentication")).toBe("user-authentication");
});

test("slugify strips special characters", () => {
	expect(slugify("Hello, World! (v2)")).toBe("hello-world-v2");
});

test("slugify trims leading/trailing hyphens", () => {
	expect(slugify("--foo--")).toBe("foo");
});

test("buildFilename pads ID to 3 digits", () => {
	expect(buildFilename(1, "my-prd")).toBe("001-my-prd.md");
	expect(buildFilename(42, "test")).toBe("042-test.md");
	expect(buildFilename(100, "big")).toBe("100-big.md");
});

test("parseIdFromFilename extracts numeric ID", () => {
	expect(parseIdFromFilename("001-my-prd.md")).toBe(1);
	expect(parseIdFromFilename("042-test.md")).toBe(42);
});

test("parseIdFromFilename returns undefined for invalid filenames", () => {
	expect(parseIdFromFilename("invalid.md")).toBeUndefined();
	expect(parseIdFromFilename("abc-test.md")).toBeUndefined();
});

test("parseSlugFromFilename extracts slug", () => {
	expect(parseSlugFromFilename("001-my-prd.md")).toBe("my-prd");
	expect(parseSlugFromFilename("042-user-authentication.md")).toBe("user-authentication");
});

test("parseSlugFromFilename returns undefined for invalid filenames", () => {
	expect(parseSlugFromFilename("invalid.md")).toBeUndefined();
});

test("nextId returns 1 for empty array", () => {
	expect(nextId([])).toBe(1);
});

test("nextId returns max + 1", () => {
	expect(nextId([1, 3, 5])).toBe(6);
	expect(nextId([1])).toBe(2);
});
