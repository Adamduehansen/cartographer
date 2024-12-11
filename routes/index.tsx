import { NewIndexButton } from "$islands/new-index-button.tsx";
import { Handlers } from "$fresh/server.ts";
import { encodeBase58 } from "@std/encoding/base58";
import { Page } from "$utils/page.ts";
import { Sitemap, Url } from "$utils/sitemap.ts";

function adaptSitemapUrlToPage({ loc }: Url): Page {
  return {
    id: crypto.randomUUID(),
    url: loc,
    title: null,
    status: null,
  };
}

export const handler: Handlers = {
  POST: async function (req) {
    const url = Deno.env.get("URL");
    const sitemapUrl = new URL("sitemap.xml", url);

    const sitemapResponse = await fetch(sitemapUrl);
    const sitemapContent = await sitemapResponse.text();
    const sitemap = Sitemap.fromString(sitemapContent);

    const pages = sitemap.urlSet.urls.map(adaptSitemapUrlToPage);

    const kv = Deno.openKv("./db.dat");
    const indexId = encodeBase58(crypto.getRandomValues(new Uint8Array(8)));
    for (const page of pages) {
    }

    const redirectUrl = new URL(indexId, req.url);
    return Response.redirect(redirectUrl);
  },
};

export default function Home() {
  return <NewIndexButton />;
}
