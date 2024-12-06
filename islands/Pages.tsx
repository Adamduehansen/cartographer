import { JSX } from "preact/jsx-runtime";
import { PageDetails } from "$islands/PageDetails.tsx";
import { usePages } from "$islands/PagesContext.tsx";

export function Pages(): JSX.Element {
  const { pages, updatePages } = usePages();

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
              updatePages(updatedPages);
            }}
          />
        );
      })}
    </div>
  );
}
