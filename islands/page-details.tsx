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
    <tr>
      <td>
        <PageDetailsHeader title={page.title} url={page.url} />
      </td>
      <td>
        {page.status}
      </td>
      <td>
        <IndexPageButton
          pageId={page.id}
        />
      </td>
    </tr>
  );
}
