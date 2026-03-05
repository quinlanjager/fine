import { test, expect } from "bun:test";

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
  expect(html).toContain('class="prose mx-auto px-4 py-8 max-w-prose"');
});

test("index.html contains expected content sections", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain("<h1>fine</h1>");
  expect(html).toContain('id="install">Install</h2>');
  expect(html).toContain('id="format">PRD format</h2>');
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

test("header contains logo placeholder", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain('class="logo-placeholder w-8 h-8 bg-base-300 rounded"');
});

test("header contains site name link", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain('<span class="font-bold text-base">fine</span>');
});

test("header contains navigation links", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain('href="/#install"');
  expect(html).toContain('href="/#usage"');
  expect(html).toContain('href="/#format"');
});

test("header has border separator", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain('class="site-header border-b border-base-300"');
});

test("sections have anchor IDs for nav links", async () => {
  const html = await Bun.file(`${SITE_DIR}/index.html`).text();
  expect(html).toContain('id="install"');
  expect(html).toContain('id="usage"');
  expect(html).toContain('id="format"');
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
