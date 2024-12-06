import { JSX } from "preact/jsx-runtime";
import { useState } from "preact/hooks";
import { Page } from "$utils/page.ts";

interface Props {
  pageId: string;
  onIndexed: (page: Page) => void;
}

async function indexPage(pageId: string): Promise<Page> {
  const response = await fetch(`/api/index-page/${pageId}`, {
    method: "GET",
  });
  const body = await response.json();
  return body;
}

export function IndexPageButton({ pageId, onIndexed }: Props): JSX.Element {
  const [pending, setPending] = useState<"error" | "idle" | "loading">("idle");

  async function sendIndexPageRequest(): Promise<void> {
    try {
      setPending("loading");
      const updatedPage = await indexPage(pageId);
      onIndexed(updatedPage);
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
