import { Handlers, PageProps } from "$fresh/server.ts";
import { Pages } from "$islands/Pages.tsx";
import { PagesProvider } from "$islands/PagesContext.tsx";
import { Page } from "$utils/page.ts";

interface Props {
  pages: Page[];
}

export const handler: Handlers<Props> = {
  GET: async function (_req, ctx) {
    return ctx.render({
      pages: [],
    });
  },
};

export default function Home({ data }: PageProps<Props>) {
  return (
    <PagesProvider pages={data.pages}>
      <Pages />
    </PagesProvider>
  );
}
