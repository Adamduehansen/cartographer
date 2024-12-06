import { Handlers } from "$fresh/server.ts";
import { Sitemap } from "$utils/sitemap.ts";
import { Page } from "$utils/page.ts";

export const handler: Handlers = {
  GET: async function (_req, _ctx): Promise<Response> {
    const url = Deno.env.get("URL");

    const sitemapUrl = new URL("sitemap.xml", url);

    console.log("Fetching sitemap at", sitemapUrl);

    const sitemapContent = await fetch(sitemapUrl).then((response) =>
      response.text()
    );

    console.log("Sitemap fetched!");

    console.log("Generating sitemap");

    const sitemap = Sitemap.fromString(sitemapContent);

    console.log("Storing sitemap in database");

    const kv = await Deno.openKv("./db.dat");

    let pages: Page[] = [];
    for (const { loc, lastMod } of sitemap.urlSet.urls) {
      const pageId = crypto.randomUUID();
      const page: Page = {
        id: pageId,
        url: loc,
        lastModified: lastMod,
        title: null,
        status: null,
      };
      pages = [...pages, page];
      await kv.set([pageId], page);
    }

    kv.close();

    return new Response(JSON.stringify(pages));
  },
};
