import { JSX } from "preact/jsx-runtime";
import { useEffect } from "preact/hooks";
import { PageDetails } from "./page-details.tsx";
import { usePages } from "./pages-context.tsx";
import { Page } from "$utils/page.ts";

export function Pages(): JSX.Element {
  const { pages, updatePage, setPages } = usePages();

  useEffect(() => {
    const eventSource = new EventSource(globalThis.location.href);
    eventSource.addEventListener("open", () => {
      console.log("Connection open!");
    });
    eventSource.addEventListener("message", (ev) => {
      console.log("Message", ev);
      const data: Page[] = JSON.parse(ev.data);
      setPages(data);
    });
    eventSource.addEventListener("error", (ev) => {
      console.log("Error", ev);
    });
  }, []);

  const handler: JSX.SubmitEventHandler<HTMLFormElement> = function () {
  };

  return (
    <>
      <div>
        <p>{pages.length} pages found in sitemap</p>
        <p>{pages.filter((page) => page.status === 200).length} are "ok"</p>
      </div>

      <form onSubmit={handler}>
        <button>Index all</button>
      </form>

      <div>
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
    </>
  );
}
