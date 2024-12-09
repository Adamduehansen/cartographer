import { Page } from "$utils/page.ts";

export const db = await Deno.openKv("./db.dat");

export async function getPages(): Promise<Page[]> {
  const pages: Page[] = [];
  const iterable = db.list<Page>({
    prefix: [],
  });

  for await (const entry of iterable) {
    const page = entry.value;
    pages.push(page);
  }

  return pages;
}
