import { expect, test } from "bun:test";

test("layout template sets daisyUI theme to lofi", async () => {
  const layoutFile = Bun.file("docs/_includes/layout.vto");
  const content = await layoutFile.text();

  expect(content).toContain('data-theme="lofi"');
});

test("layout template wraps content in prose class for markdown styling", async () => {
  const layoutFile = Bun.file("docs/_includes/layout.vto");
  const content = await layoutFile.text();

  expect(content).toMatch(
    /class="prose content-container[\s\S]*\{\{\s*content\s*\}\}/,
  );
});

test("header and content use the same content-container class", async () => {
  const layoutFile = Bun.file("docs/_includes/layout.vto");
  const content = await layoutFile.text();

  const matches = content.match(/content-container/g);
  expect(matches).not.toBeNull();
  expect(matches!.length).toBeGreaterThanOrEqual(2);
});

test("styles.css defines content-container with shared max-width", async () => {
  const cssFile = Bun.file("docs/assets/styles.css");
  const css = await cssFile.text();

  expect(css).toContain(".content-container");
  expect(css).toContain("--content-max-width");
});
