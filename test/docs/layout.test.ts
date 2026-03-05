import { test, expect } from "bun:test";

test("layout template sets daisyUI theme to lofi", async () => {
  const layoutFile = Bun.file("docs/_includes/layout.vto");
  const content = await layoutFile.text();

  expect(content).toContain('data-theme="lofi"');
});

test("layout template wraps content in prose class for markdown styling", async () => {
  const layoutFile = Bun.file("docs/_includes/layout.vto");
  const content = await layoutFile.text();

  expect(content).toMatch(/class="prose"[\s\S]*\{\{\s*content\s*\}\}/);
});
