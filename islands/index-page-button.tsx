import { JSX } from "preact/jsx-runtime";

interface Props {
  pageId: string;
}

async function indexPage(pageId: string): Promise<void> {
  await fetch(`/api/index-page/${pageId}`, {
    method: "GET",
  });
}

export function IndexPageButton({ pageId }: Props): JSX.Element {
  return <button onClick={() => indexPage(pageId)}>Index</button>;
}
