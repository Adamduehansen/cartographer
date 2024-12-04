import { NewIndexButton } from "$islands/new-index-button.tsx";
import { IndexAllButton } from "$islands/index-all-button.tsx";
import { IndexPageButton } from "$islands/index-page-button.tsx";
import { Page } from "$utils/page.ts";

export default async function Home() {
  const kv = await Deno.openKv("./db.dat");
  const pagesIterator = kv.list<Page>({
    prefix: [],
  });
  const pages: Page[] = [];
  for await (const page of pagesIterator) {
    pages.push(page.value);
  }
  kv.close();

  return (
    <div>
      <NewIndexButton />
      <IndexAllButton />
      {pages.map((page) => {
        return (
          <details>
            <summary>
              <span>{page.title !== null ? page.title : page.url}</span>
              <IndexPageButton pageId={page.id} />
            </summary>
            <div>
              <p>Database Key: {page.id}</p>
              <p>Last modified: {page.lastModified}</p>
              <p>
                URL: <a href={page.url}>{page.url}</a>
              </p>
            </div>
          </details>
        );
      })}
    </div>
  );
}
