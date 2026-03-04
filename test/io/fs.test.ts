import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
	ensurePrdsDir,
	listPRDFiles,
	getExistingIds,
	readPRD,
	writePRD,
	createPRD,
} from "../../source/io/fs.ts";
import { resolvePrdsPath } from "../../source/io/config.ts";
import type { PRD } from "../../source/domain/types.ts";

let tempDir: string;

beforeEach(async () => {
	tempDir = await mkdtemp(join(tmpdir(), "fine-test-"));
});

afterEach(async () => {
	await rm(tempDir, { recursive: true, force: true });
});

test("ensurePrdsDir creates directory", async () => {
	const dir = await ensurePrdsDir(tempDir);
	expect(dir).toBe(resolvePrdsPath(tempDir));
	const file = Bun.file(dir);
	// Check directory exists by trying to list it
	const glob = new Bun.Glob("*");
	const results: string[] = [];
	for await (const f of glob.scan({ cwd: dir })) {
		results.push(f);
	}
	expect(results).toEqual([]);
});

test("listPRDFiles returns empty array when no files", async () => {
	await ensurePrdsDir(tempDir);
	const files = await listPRDFiles(tempDir);
	expect(files).toEqual([]);
});

test("listPRDFiles returns sorted PRD files", async () => {
	const dir = await ensurePrdsDir(tempDir);
	await Bun.write(join(dir, "002-second.md"), "# Second");
	await Bun.write(join(dir, "001-first.md"), "# First");
	await Bun.write(join(dir, "not-a-prd.txt"), "ignore me");

	const files = await listPRDFiles(tempDir);
	expect(files).toEqual(["001-first.md", "002-second.md"]);
});

test("getExistingIds returns parsed IDs", async () => {
	const dir = await ensurePrdsDir(tempDir);
	await Bun.write(join(dir, "001-first.md"), "# First");
	await Bun.write(join(dir, "003-third.md"), "# Third");

	const ids = await getExistingIds(tempDir);
	expect(ids).toEqual([1, 3]);
});

test("readPRD returns parsed PRD", async () => {
	const dir = await ensurePrdsDir(tempDir);
	await Bun.write(
		join(dir, "001-my-prd.md"),
		"# My PRD\n\nDescription here.\n\n## Tasks\n\n- [ ] Task 1\n",
	);

	const prd = await readPRD(1, tempDir);
	expect(prd).not.toBeUndefined();
	expect(prd!.id).toBe(1);
	expect(prd!.slug).toBe("my-prd");
	expect(prd!.title).toBe("My PRD");
	expect(prd!.description).toBe("Description here.");
	expect(prd!.tasks).toHaveLength(1);
});

test("readPRD returns undefined for missing ID", async () => {
	await ensurePrdsDir(tempDir);
	const prd = await readPRD(99, tempDir);
	expect(prd).toBeUndefined();
});

test("writePRD writes file to disk", async () => {
	const prd: PRD = {
		id: 1,
		slug: "test-prd",
		title: "Test PRD",
		description: "A test.",
		tasks: [{ text: "Do something", completed: false }],
	};

	const filename = await writePRD(prd, tempDir);
	expect(filename).toBe("001-test-prd.md");

	const content = await Bun.file(join(resolvePrdsPath(tempDir), filename)).text();
	expect(content).toContain("# Test PRD");
	expect(content).toContain("- [ ] Do something");
});

test("createPRD creates a new PRD file", async () => {
	const { prd, filename } = await createPRD(
		{ title: "User Auth", description: "Auth system." },
		tempDir,
	);

	expect(prd.id).toBe(1);
	expect(prd.slug).toBe("user-auth");
	expect(filename).toBe("001-user-auth.md");

	const content = await Bun.file(join(resolvePrdsPath(tempDir), filename)).text();
	expect(content).toContain("# User Auth");
});

test("createPRD increments ID", async () => {
	await createPRD({ title: "First", description: "" }, tempDir);
	const { prd } = await createPRD({ title: "Second", description: "" }, tempDir);
	expect(prd.id).toBe(2);
});

test("createPRD throws on empty title", async () => {
	expect(createPRD({ title: "", description: "" }, tempDir)).rejects.toThrow("Title is required");
});
