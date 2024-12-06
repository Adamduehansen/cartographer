import { Handlers, PageProps } from "$fresh/server.ts";
import { NewIndexButton } from "$islands/new-index-button.tsx";
import { IndexAllButton } from "$islands/index-all-button.tsx";
import { Page } from "$utils/page.ts";
import { Pages } from "$islands/Pages.tsx";
import { PagesProvider } from "$islands/PagesContext.tsx";

interface Props {
  pages: Page[];
}

export const handler: Handlers<Props> = {
  GET: async function (_req, ctx) {
    const kv = await Deno.openKv("./db.dat");
    const pagesIterator = kv.list<Page>({
      prefix: [],
    });
    const pages: Page[] = [];
    for await (const page of pagesIterator) {
      pages.push(page.value);
    }
    kv.close();

    return ctx.render({
      pages: pages,
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
