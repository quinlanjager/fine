import { test, expect } from "bun:test";

test("docs/index.md contains README content with layout frontmatter", async () => {
  const indexFile = Bun.file("docs/index.md");
  const readmeFile = Bun.file("README.md");

  const indexContent = await indexFile.text();
  const readmeContent = await readmeFile.text();

  // Should preserve layout frontmatter
  expect(indexContent).toStartWith("---\nlayout: layout.vto\ntitle: fine");

  // Should contain README content (everything from README should appear after frontmatter)
  const afterFrontmatter = indexContent.split("---\n").slice(2).join("---\n").trim();
  expect(afterFrontmatter).toBe(readmeContent.trim());
});
