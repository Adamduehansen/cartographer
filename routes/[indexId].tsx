import { Handlers, PageProps } from "$fresh/server.ts";
import { Pages } from "$islands/Pages.tsx";
import { PagesProvider } from "$islands/PagesContext.tsx";
import { Page } from "$utils/page.ts";
import { getIndex } from "$utils/db.ts";

interface Props {
  indexTimestamp: number;
  pages: Page[];
}

export const handler: Handlers<Props> = {
  GET: async function (_req, ctx) {
    const index = await getIndex(ctx.params.indexId);

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
