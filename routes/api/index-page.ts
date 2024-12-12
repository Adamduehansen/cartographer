import { parse } from "node-html-parser";
import { Handlers } from "$fresh/server.ts";
import { getPage, updatePage } from "$utils/db.ts";

export const handler: Handlers = {
  GET: async function (_req, ctx) {
    const indexId = ctx.url.searchParams.get("indexId");
    const pageId = ctx.url.searchParams.get("pageId");

    if (indexId === null || pageId === null) {
      throw new Response(null, {
        status: 400,
      });
    }

    console.log(`indexing page "${pageId}" of index "${indexId}"`);

    const page = await getPage({
      indexId: indexId,
      pageId: pageId,
    });

    if (page === null) {
      return new Response(null, {
        status: 404,
      });
    }

    const response = await fetch(page.url);
    const html = await response.text();
    const parsedHtml = parse(html);
    page.title = parsedHtml.querySelector("title")?.textContent ?? null;
    page.status = response.status;

    const result = await updatePage({
      indexId: indexId,
      pageId: pageId,
      updatedPage: page,
    });

    if (result.ok === false) {
      throw Error("Result was not 'ok' for some reason...");
    }

    return new Response(JSON.stringify(page));
  },
};
