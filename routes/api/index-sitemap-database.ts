import { Handlers } from "$fresh/server.ts";
import { Sitemap } from "$utils/sitemap.ts";
import { Page } from "$utils/page.ts";
import { Channel } from "$utils/Channel.ts";

export const handler: Handlers = {
  GET: function (req, _ctx) {
    if (req.headers.get("accept") !== "text/event-stream") {
      return new Response("Not valid header");
    }

    const body = new ReadableStream({
      start: async function (controller) {
        const channel = new Channel(controller);

        const url = Deno.env.get("URL");
        const sitemapUrl = new URL("sitemap.xml", url);
        channel.send("message", `Fetching sitemap at: ${sitemapUrl}`);

        const sitemapContent = await fetch(sitemapUrl).then((response) =>
          response.text()
        );
        channel.send("message", `Sitemap fetched`);

        channel.send("message", `Generating sitemap`);
        const sitemap = Sitemap.fromString(sitemapContent);

        channel.send("message", `Storing sitemap in database`);

        await Deno.remove("./db.dat");
        const kv = await Deno.openKv("./db.dat");
        for (const { loc, lastMod } of sitemap.urlSet.urls) {
          const pageId = crypto.randomUUID();
          const page: Page = {
            id: pageId,
            url: loc,
            lastModified: lastMod,
            title: null,
            status: null,
          };
          await kv.set([pageId], page);
        }

        const pagesIterator = kv.list<Page>({
          prefix: [],
        });
        const pages: Page[] = [];
        for await (const page of pagesIterator) {
          pages.push(page.value);
        }

        kv.close();

        channel.send("pages", pages);
        channel.send("message", "Indexing pages...");
      },
      cancel: function () {
        console.log("Cancelled!");
      },
    });

    return new Response(body, {
      headers: {
        "content-type": "text/event-stream",
      },
    });

    // return new Response(JSON.stringify(pages));
  },
};
