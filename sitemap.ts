import { parse } from "@libs/xml";
import * as v from "@valibot/valibot";

const UrlSchema = v.pipe(
  v.object({
    loc: v.pipe(
      v.string(),
      v.nonEmpty(),
      v.url(),
    ),
    lastmod: v.string(),
  }),
  v.transform((input) => ({
    loc: input.loc,
    lastMod: input.lastmod,
  })),
);

const SitemapSchema = v.object({
  urlset: v.object({
    url: v.array(UrlSchema),
  }),
});

interface Url {
  loc: string;
  lastMod: string;
}

interface UrlSet {
  urls: readonly Url[];
}

export class Sitemap {
  urlSet: UrlSet;

  private constructor(urls: Url[]) {
    this.urlSet = {
      urls: urls,
    };
  }

  static fromString(obj: string): Sitemap {
    const xml = parse(obj);
    const parsedXml = v.parse(SitemapSchema, xml);
    return new Sitemap(parsedXml.urlset.url);
  }
}
