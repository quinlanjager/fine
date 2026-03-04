import { resolve } from "node:path";

export function resolvePrdsPath(basePath?: string): string {
	return resolve(basePath ?? process.cwd(), "prds");
}
