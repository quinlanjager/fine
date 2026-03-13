import { expect, test } from "bun:test";

const SITE_DIR = import.meta.dir + "/_site";

test("build produces index.html", async () => {
  const file = Bun.file(`${SITE_DIR}/index.html`);
  expect(await file.exists()).toBe(true);
});

test("index.html has correct title", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain("<title>fine — task management for agents</title>");
});

test("index.html uses lofi theme", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain('data-theme="lofi"');
});

test("index.html has centered prose wrapper", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain('class="prose content-container py-8"');
});

test("index.html contains expected content sections", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain("<h1>fine</h1>");
  expect(html).toContain('id="install"');
  expect(html).toContain('id="examples"');
});

test("styles.css is generated", async () => {
  const file = Bun.file(`${SITE_DIR}/assets/styles.css`);
  expect(await file.exists()).toBe(true);
});

test("styles.css includes lofi theme", async () => {
  const css = await Bun.file(`${SITE_DIR}/assets/styles.css`).text();
  expect(css).toContain("[data-theme=lofi]");
});

test("styles.css includes prose styles", async () => {
  const css = await Bun.file(`${SITE_DIR}/assets/styles.css`).text();
  expect(css).toContain(".prose");
});

test("header contains logo image", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain(
    '<img src="/assets/logo.png" alt="fine logo" class="w-8 h-8">',
  );
});

test("header contains site name link", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain('<span class="font-bold text-base">fine</span>');
});

test("header contains site-header class", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain('class="site-header');
});

test("sections have anchor IDs for nav links", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain('id="install"');
  expect(html).toContain('id="examples"');
});

test("code highlighting is applied", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain('class="language-bash hljs"');
});

test("robots.txt is generated", async () => {
  const file = Bun.file(`${SITE_DIR}/robots.txt`);
  expect(await file.exists()).toBe(true);
});

test("sitemap.xml is generated", async () => {
  const file = Bun.file(`${SITE_DIR}/sitemap.xml`);
  expect(await file.exists()).toBe(true);
});
