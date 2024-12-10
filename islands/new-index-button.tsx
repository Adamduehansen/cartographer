import { JSX } from "preact/jsx-runtime";
import { useState } from "preact/hooks";
import * as v from "@valibot/valibot";
import { usePages } from "$islands/PagesContext.tsx";
import { PagesSchema } from "$utils/page.ts";

export function NewIndexButton(): JSX.Element {
  const [pending, setPending] = useState<"idle" | "fetching">("idle");
  const { setPages } = usePages();

  async function startIndex() {
    setPending("fetching");
    try {
      const response = await fetch("api/get-index");
      const json = await response.json();
      const pages = v.parse(PagesSchema, json);
      setPages(pages);
    } catch (error) {
      console.error(error);
    }

    setPending("idle");
  }

  return (
    <button disabled={pending === "fetching"} onClick={startIndex}>
      New index!
    </button>
  );
}
