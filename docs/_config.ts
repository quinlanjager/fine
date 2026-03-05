import lume from "lume/mod.ts";
import attributes from "lume/plugins/attributes.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import robots from "lume/plugins/robots.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import check_urls from "lume/plugins/check_urls.ts";
import sitemap from "lume/plugins/sitemap.ts";
import seo from "lume/plugins/seo.ts";
import toc from "lume_markdown_plugins/toc.ts";

const site = lume();

site.use(attributes());
site.use(code_highlight());
site.use(toc({ anchor: false }));
site.use(robots());
site.use(tailwindcss());
site.use(check_urls());
site.use(sitemap());
site.use(seo());

site.add("assets");

export default site;
