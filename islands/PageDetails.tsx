import { JSX } from "preact/jsx-runtime";
import { Page } from "$utils/page.ts";
import { IndexPageButton } from "$islands/index-page-button.tsx";

interface Props {
  page: Page;
  onUpdated: (page: Page) => void;
}

export function PageDetails({ page, onUpdated }: Props): JSX.Element {
  return (
    <details>
      <summary>
        <span>{page.title !== null ? page.title : page.url}</span>
        <IndexPageButton
          pageId={page.id}
          onIndexed={onUpdated}
        />
      </summary>
      <div>
        <p>Database Key: {page.id}</p>
        <p>Last modified: {page.lastModified}</p>
        <p>
          URL: <a href={page.url}>{page.url}</a>
        </p>
      </div>
    </details>
  );
}
