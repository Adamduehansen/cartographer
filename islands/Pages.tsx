import { JSX } from "preact/jsx-runtime";
import { useEffect } from "preact/hooks";
import { PageDetails } from "$islands/PageDetails.tsx";
import { usePages } from "$islands/PagesContext.tsx";

export function Pages(): JSX.Element {
  const { pages, updatePage } = usePages();

  useEffect(() => {
    const eventSource = new EventSource(globalThis.location.href);
    eventSource.addEventListener("message", (ev) => {
      console.log(ev);
    });

    return function () {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <p>{pages.length} pages found in sitemap</p>
      {pages.map((page) => {
        return (
          <PageDetails
            page={page}
            onUpdated={(updatedPage) => {
              updatePage(updatedPage.id, updatedPage);
            }}
          />
        );
      })}
    </div>
  );
}
