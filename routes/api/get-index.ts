import { Handlers } from "$fresh/server.ts";
import { Page } from "$utils/page.ts";
import { Sitemap, Url } from "$utils/sitemap.ts";

function adaptSitemapUrlToPage({ loc }: Url): Page {
  return {
    id: crypto.randomUUID(),
    url: loc,
    title: null,
    status: null,
  };
}

export const handler: Handlers = {
  GET: async function () {
    const url = Deno.env.get("URL");
    const sitemapUrl = new URL("sitemap.xml", url);

    const sitemapResponse = await fetch(sitemapUrl);
    const sitemapContent = await sitemapResponse.text();
    const sitemap = Sitemap.fromString(sitemapContent);

    const pages = sitemap.urlSet.urls.map(adaptSitemapUrlToPage);
    return new Response(JSON.stringify(pages));
  },
};
