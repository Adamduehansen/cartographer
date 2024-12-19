import { parse } from "node-html-parser";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Pages } from "$islands/pages.tsx";
import { PagesProvider } from "$islands/pages-context.tsx";
import { Page } from "$utils/page.ts";
import { db, getIndex, updatePage } from "$utils/db.ts";
import { Time } from "../components/Time.tsx";

interface Props {
  indexTimestamp: number;
  pages: Page[];
}

export const handler: Handlers<Props> = {
  GET: async function (req, ctx) {
    const indexId = ctx.params.indexId;

    if (req.headers.get("accept") === "text/event-stream") {
      const stream = db.watch([["index_updated", indexId]]).getReader();
      const body = new ReadableStream({
        start: async function (controller) {
          console.log(
            `Opened stream for list ${indexId} remote ${
              JSON.stringify(ctx.remoteAddr)
            }`,
          );
          while (true) {
            try {
              if ((await stream.read()).done) {
                return;
              }

              const data = await getIndex(indexId);
              const chunk = `data: ${JSON.stringify(data.pages)}\n\n`;
              controller.enqueue(new TextEncoder().encode(chunk));
            } catch (err) {
              console.error(err);
            }
          }
        },
        cancel() {
          stream.cancel();
          console.log(
            `Closed stream for list ${indexId} remote ${
              JSON.stringify(ctx.remoteAddr)
            }`,
          );
        },
      });

      return new Response(body, {
        headers: {
          "Content-Type": "text/event-stream",
        },
      });
    }

    const index = await getIndex(indexId);

    return ctx.render({
      indexTimestamp: index.timestamp,
      pages: index.pages,
    });
  },
  POST: async function (_req, ctx) {
    const indexId = ctx.params.indexId;

    const index = await getIndex(indexId);

    for (const page of index.pages) {
      const response = await fetch(page.url);
      const html = await response.text();
      const parsedHtml = parse(html);
      page.title = parsedHtml.querySelector("title")?.textContent ?? null;
      page.status = response.status;
      await updatePage({
        indexId: indexId,
        pageId: page.id,
        updatedPage: page,
      });
    }

    return new Response(null, {
      status: 202,
    });
  },
};

export default function Home({ data }: PageProps<Props>) {
  return (
    <PagesProvider pages={data.pages}>
      <p>
        Index was made on <Time timestamp={data.indexTimestamp} />
      </p>
      <Pages />
    </PagesProvider>
  );
}
