import { encodeBase58 } from "@std/encoding/base58";
import { Page } from "$utils/page.ts";

const db = await Deno.openKv("./db.dat");

export async function createIndex(options: {
  pages: Page[];
}): Promise<string> {
  const indexId = encodeBase58(crypto.getRandomValues(new Uint8Array(8)));
  const timestamp = Date.now();

  for (const page of options.pages) {
    const kvKey: Deno.KvKey = [timestamp, page.id];
    await db.set(kvKey, page);
  }

  return indexId;
}
