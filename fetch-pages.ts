import { Sitemap } from "./sitemap.ts";

const url = "http://localhost:3000";

if (import.meta.main) {
  const sitemapUrl = new URL("/sitemap.xml", url);

  console.log("Fetching sitemap at", sitemapUrl);

  const sitemapContent = await fetch(sitemapUrl).then((response) =>
    response.text()
  );

  console.log("Sitemap fetched!");
  console.log("Generating sitem");

  const sitemap = Sitemap.fromString(sitemapContent);

  const kv = await Deno.openKv("./db.dat");

  for (const { loc } of sitemap.urlSet.urls) {
    const response = await fetch(loc);
    const html = await response.text();
    await kv.set(["urls", loc], html);
  }
}
