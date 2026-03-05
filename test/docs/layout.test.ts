import { test, expect } from "bun:test";

test("layout template sets daisyUI theme to lofi", async () => {
  const layoutFile = Bun.file("docs/_includes/layout.vto");
  const content = await layoutFile.text();

  expect(content).toContain('data-theme="lofi"');
});
