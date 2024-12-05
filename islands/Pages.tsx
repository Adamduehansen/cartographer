import { JSX } from "preact/jsx-runtime";
import { useState } from "preact/hooks";
import { Page } from "$utils/page.ts";
import { PageDetails } from "$islands/PageDetails.tsx";

interface Props {
  pages: Page[];
}

export function Pages(props: Props): JSX.Element {
  const [pages, setPages] = useState(props.pages);

  return (
    <div>
      {pages.map((page) => {
        return (
          <PageDetails
            page={page}
            onUpdated={(updatedPage) => {
              const updatedPages = pages.map((page) => {
                if (updatedPage.id !== page.id) {
                  return {
                    ...page,
                  };
                }

                return {
                  ...updatedPage,
                };
              });
              setPages(updatedPages);
            }}
          />
        );
      })}
    </div>
  );
}
