import { JSX } from "preact/jsx-runtime";
import { useState } from "preact/hooks";
import { usePages } from "$islands/PagesContext.tsx";

export function NewIndexButton(): JSX.Element {
  const [pending, setPending] = useState<"error" | "idle" | "loading">("idle");
  const { setPages } = usePages();

  async function startIndex() {
    try {
      setPending("loading");
      const response = await fetch("/api/index-sitemap-database");
      const json = await response.json();
      setPages(json);
      setPending("idle");
    } catch (error) {
      setPending("error");
      throw error;
    }
  }

  return (
    <button disabled={pending === "loading"} onClick={startIndex}>
      New index!
    </button>
  );
}
