import { JSX } from "preact/jsx-runtime";
import { Page } from "$utils/page.ts";
import { IndexPageButton } from "$islands/index-page-button.tsx";
import { PageDetailsHeader } from "./page-details-header.tsx";

interface Props {
  page: Page;
  onUpdated: (page: Page) => void;
}

export function PageDetails({ page }: Props): JSX.Element {
  return (
    <details>
      <summary>
        <PageDetailsHeader title={page.title} url={page.url} />
        <IndexPageButton
          pageId={page.id}
        />
      </summary>
      <div>
        <p>Database Key: {page.id}</p>
        <p>Status: {page.status}</p>
      </div>
    </details>
  );
}
