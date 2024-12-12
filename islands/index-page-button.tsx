import { JSX } from "preact/jsx-runtime";
import { useState } from "preact/hooks";
import { Page } from "$utils/page.ts";

interface Props {
  pageId: string;
  onIndexed: (page: Page) => void;
}

async function indexPage(pageId: string): Promise<void> {
  const indexId = globalThis.location.pathname.substring(1);
  await fetch(`/api/index-page?indexId=${indexId}&pageId=${pageId}`, {
    method: "GET",
  });
}

export function IndexPageButton({ pageId, onIndexed }: Props): JSX.Element {
  const [pending, setPending] = useState<"error" | "idle" | "loading">("idle");

  async function sendIndexPageRequest(): Promise<void> {
    try {
      setPending("loading");
      const updatedPage = await indexPage(pageId);
      setPending("idle");
    } catch (error) {
      setPending("error");
      throw error;
    }
  }

  return (
    <button
      disabled={pending === "loading"}
      onClick={sendIndexPageRequest}
    >
      Index
    </button>
  );
}
