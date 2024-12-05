import { JSX } from "preact/jsx-runtime";
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
  return (
    <button
      onClick={async () => {
        const updatedPage = await indexPage(pageId);
        onIndexed(updatedPage);
      }}
    >
      Index
    </button>
  );
}
