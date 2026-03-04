export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function buildFilename(id: number, slug: string): string {
	return `${String(id).padStart(3, "0")}-${slug}.md`;
}

export function parseIdFromFilename(filename: string): number | undefined {
	const match = filename.match(/^(\d{3})-/);
	if (!match?.[1]) return undefined;
	return parseInt(match[1], 10);
}

export function parseSlugFromFilename(filename: string): string | undefined {
	const match = filename.match(/^\d{3}-(.+)\.md$/);
	return match?.[1];
}

export function nextId(existingIds: readonly number[]): number {
	if (existingIds.length === 0) return 1;
	return Math.max(...existingIds) + 1;
}
