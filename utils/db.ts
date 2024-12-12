import { encodeBase58 } from "@std/encoding/base58";
import { Page } from "$utils/page.ts";

const db = await Deno.openKv("./db.dat");

export async function createIndex(options: {
  pages: Page[];
}): Promise<string> {
  const indexId = encodeBase58(crypto.getRandomValues(new Uint8Array(8)));
  const timestamp = Date.now();

  const operation = db.atomic();

  for (const page of options.pages) {
    const pageKvKey: Deno.KvKey = ["page", indexId, page.id];
    operation.set(pageKvKey, page);
  }

  const timestampKvKey: Deno.KvKey = ["timestamp", indexId];
  operation.set(timestampKvKey, timestamp);

  const updatedKvKey: Deno.KvKey = ["index_updated", indexId];
  operation.set(updatedKvKey, timestamp);

  await operation.commit();

  return indexId;
}

export async function getIndex(indexId: string): Promise<{
  id: string;
  timestamp: number;
  lastUpdated: number;
  pages: Page[];
}> {
  const pagesIterator = db.list<Page>({
    prefix: ["page", indexId],
  });

  const timestamp = await db.get<number>(["timestamp", indexId]);

  const lastUpdated = await db.get<number>(["index_updated", indexId]);

  const pages: Page[] = [];
  for await (const page of pagesIterator) {
    pages.push(page.value);
  }

  return {
    id: indexId,
    timestamp: timestamp.value ?? 0,
    lastUpdated: lastUpdated.value ?? 0,
    pages: pages,
  };
}

export async function getPage(options: {
  indexId: string;
  pageId: string;
}): Promise<Page | null> {
  const { value: page } = await db.get<Page>([
    "page",
    options.indexId,
    options.pageId,
  ]);
  return page;
}

export async function updatePage(options: {
  indexId: string;
  pageId: string;
  updatedPage: Page;
}) {
  const operation = db.atomic();
  operation.set(["page", options.indexId, options.pageId], options.updatedPage);
  operation.set(["index_updated", options.indexId], Date.now());
  return await operation.commit();
}
