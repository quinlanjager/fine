import { join } from "node:path";
import { mkdir, access, readdir, readFile, writeFile } from "node:fs/promises";
import { resolvePrdsPath } from "./config.ts";
import { parsePRD, serializePRD } from "../domain/prd.ts";
import { buildFilename, parseIdFromFilename, parseSlugFromFilename, nextId, slugify } from "../domain/id.ts";
import { validatePRD } from "../domain/prd.ts";
import type { PRD, PRDInput } from "../domain/types.ts";

const PRD_FILENAME_PATTERN = /^\d{3}-.*\.md$/;

export async function ensurePrdsDir(basePath?: string): Promise<string> {
	const dir = resolvePrdsPath(basePath);
	await mkdir(dir, { recursive: true });
	return dir;
}

export async function listPRDFiles(basePath?: string): Promise<string[]> {
	const dir = resolvePrdsPath(basePath);
	try {
		await access(dir);
	} catch {
		return [];
	}
	const entries = await readdir(dir);
	return entries.filter((f) => PRD_FILENAME_PATTERN.test(f)).sort();
}

export async function getExistingIds(basePath?: string): Promise<number[]> {
	const files = await listPRDFiles(basePath);
	return files
		.map(parseIdFromFilename)
		.filter((id): id is number => id !== undefined);
}

export async function readPRD(id: number, basePath?: string): Promise<PRD | undefined> {
	const files = await listPRDFiles(basePath);
	const filename = files.find((f) => parseIdFromFilename(f) === id);
	if (!filename) return undefined;

	const dir = resolvePrdsPath(basePath);
	let content: string;
	try {
		content = await readFile(join(dir, filename), "utf-8");
	} catch {
		return undefined;
	}
	const slug = parseSlugFromFilename(filename) ?? "";
	return parsePRD(id, slug, content);
}

export async function writePRD(prd: PRD, basePath?: string): Promise<string> {
	const dir = await ensurePrdsDir(basePath);
	const filename = buildFilename(prd.id, prd.slug);
	const filePath = join(dir, filename);
	const content = serializePRD(prd);
	await writeFile(filePath, content);
	return filename;
}

export async function createPRD(input: PRDInput, basePath?: string): Promise<{ prd: PRD; filename: string }> {
	const validation = validatePRD(input);
	if (!validation.valid) {
		throw new Error(validation.errors.join(", "));
	}

	const existingIds = await getExistingIds(basePath);
	const id = nextId(existingIds);
	const slug = slugify(input.title);

	const prd: PRD = {
		id,
		slug,
		title: input.title,
		description: input.description,
		tasks: [],
	};

	const filename = await writePRD(prd, basePath);
	return { prd, filename };
}
