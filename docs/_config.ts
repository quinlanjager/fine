import lume from "lume/mod.ts";
import attributes from "lume/plugins/attributes.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import robots from "lume/plugins/robots.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import check_urls from "lume/plugins/check_urls.ts";
import sitemap from "lume/plugins/sitemap.ts";
import seo from "lume/plugins/seo.ts";
import metas from "lume/plugins/metas.ts";
import ogImages from "lume/plugins/og_images.ts";

function codeblockCopyPlugin(md: any) {
  const defaultRender = md.renderer.rules.fence;

  md.renderer.rules.fence = function (
    tokens: any[],
    idx: number,
    options,
    env,
    self,
  ) {
    const render = defaultRender(tokens, idx, options, env, self);
    const uniqueId = `copy-button-${idx}`;
    const content = tokens[idx].content.replaceAll('"', "&quot;").replaceAll(
      "'",
      "&apos;",
    );

    const buttonHtml = `
      <button id="${uniqueId}" class="copyButton btn btn-xs absolute top-2 right-2" data-copy="${content}" title="Copy">
        <svg class="copy-icon" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="7" height="7" fill="none"/>
          <rect x="6" y="6" width="7" height="7" fill="none"/>
          <path d="M1.55566 2.7C1.55566 2.03726 2.09292 1.5 2.75566 1.5H8.75566C9.41841 1.5 9.95566 2.03726 9.95566 2.7V5.1H12.3557C13.0184 5.1 13.5557 5.63726 13.5557 6.3V12.3C13.5557 12.9627 13.0184 13.5 12.3557 13.5H6.35566C5.69292 13.5 5.15566 12.9627 5.15566 12.3V9.9H2.75566C2.09292 9.9 1.55566 9.36274 1.55566 8.7V2.7ZM6.35566 9.9V12.3H12.3557V6.3H9.95566V8.7C9.95566 9.36274 9.41841 9.9 8.75566 9.9H6.35566ZM8.75566 8.7V2.7H2.75566V8.7H8.75566Z" fill="currentColor"/>
        </svg>
        <svg class="check-icon hidden" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7.5L6.5 11L12 3" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;

    return `<div class="code-block relative">${render}${buttonHtml}</div>`;
  };
}

const site = lume({}, {markdown: {plugins: [codeblockCopyPlugin]}});

site.use(attributes());
site.use(code_highlight());
site.use(robots());
site.use(tailwindcss());
site.use(check_urls());
site.use(sitemap());
site.use(seo());
site.use(metas(/* Options */));
site.use(ogImages());

site.add("assets");
site.add("favicon.ico");

export default site;
