import * as v from "@valibot/valibot";

export const PageSchema = v.object({
  id: v.string(),
  url: v.string(),
  title: v.nullable(v.string()),
  status: v.nullable(v.number()),
});

export const PagesSchema = v.array(PageSchema);

export type Page = v.InferInput<typeof PageSchema>;
