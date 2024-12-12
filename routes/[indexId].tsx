import { Handlers, PageProps } from "$fresh/server.ts";
import { Pages } from "$islands/Pages.tsx";
import { PagesProvider } from "$islands/PagesContext.tsx";
import { Page } from "$utils/page.ts";
import { getIndex } from "$utils/db.ts";
import { db } from "$services/db.ts";

interface Props {
  indexTimestamp: number;
  pages: Page[];
}

export const handler: Handlers<Props> = {
  GET: async function (req, ctx) {
    const indexId = ctx.params.indexId;

    if (req.headers.get("accept") === "text/event-stream") {
      const stream = db.watch([["page", indexId]]).getReader();
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
};

export default function Home({ data }: PageProps<Props>) {
  return (
    <PagesProvider pages={data.pages}>
      <p>Index was made on {data.indexTimestamp}</p>
      <Pages />
    </PagesProvider>
  );
}
