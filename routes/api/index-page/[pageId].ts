import { parse } from "@libs/xml";
import { Handlers } from "$fresh/server.ts";
import { Page } from "$utils/page.ts";

export const handler: Handlers = {
  GET: async function (_req, ctx) {
    const pageId = ctx.params.pageId;
    console.log(`Indexing page: "${pageId}"`);

    const kv = await Deno.openKv("./db.dat");
    const { value: page } = await kv.get<Page>([pageId]);

    console.log(`Fetching "${pageId}" on URL ${page?.url}`);
    const response = await fetch(page!.url);
    const html = await response.text();
    console.log("Fetching completed! Now parsing HTML...");

    const parsedHtml = parse(html, {
      mode: "html",
    });

    console.log("Setting the title...");
    page!.title = parsedHtml.html.head.title;

    console.log("Setting the status...");
    page!.status = response.status;

    console.log("Storing updated page...");
    await kv.atomic().set([pageId], page).commit();
    kv.close();

    return new Response(JSON.stringify(page));
  },
};
