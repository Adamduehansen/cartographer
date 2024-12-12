import { JSX } from "preact/jsx-runtime";
import { useState } from "preact/hooks";

interface Props {
  pageId: string;
}

async function indexPage(options: {
  indexId: string;
  pageId: string;
}): Promise<void> {
  await fetch(
    `/api/index-page?indexId=${options.indexId}&pageId=${options.pageId}`,
    {
      method: "GET",
    },
  );
}

export function IndexPageButton({ pageId }: Props): JSX.Element {
  const [pending, setPending] = useState<"error" | "idle" | "loading">("idle");

  async function sendIndexPageRequest(): Promise<void> {
    const indexId = globalThis.location.pathname.substring(1);
    try {
      setPending("loading");
      await indexPage({
        indexId: indexId,
        pageId: pageId,
      });
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
