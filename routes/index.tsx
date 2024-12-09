import { Handlers, PageProps } from "$fresh/server.ts";
import { NewIndexButton } from "$islands/new-index-button.tsx";
import { IndexAllButton } from "$islands/index-all-button.tsx";
import { Page } from "$utils/page.ts";
import { Pages } from "$islands/Pages.tsx";
import { PagesProvider } from "$islands/PagesContext.tsx";
import { db, getPages } from "$services/db.ts";

interface Props {
  pages: Page[];
}

export const handler: Handlers<Props> = {
  GET: async function (req, ctx) {
    if (req.headers.get("accept") === "text/event-stream") {
      const stream = db.watch([[]]).getReader();
      const readableStream = new ReadableStream({
        start: async function (controller) {
          while (true) {
            try {
              if ((await stream.read()).done) {
                return;
              }

              const pages = await getPages();
              const chunk = `data: ${JSON.stringify(pages)}\n\n`;
              controller.enqueue(new TextEncoder().encode(chunk));
            } catch (error) {
              console.error("Error refreshing pages", error);
            }
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/event-stream",
        },
      });
    }

    return ctx.render({
      pages: await getPages(),
    });
  },
};

export default function Home(
  props: PageProps<Props>,
) {
  return (
    <PagesProvider pages={props.data.pages}>
      <NewIndexButton />
      <IndexAllButton />
      <Pages />
    </PagesProvider>
  );
}
