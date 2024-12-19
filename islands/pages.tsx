import { JSX } from "preact/jsx-runtime";
import { useEffect } from "preact/hooks";
import { PageDetails } from "./page-details.tsx";
import { usePages } from "./pages-context.tsx";
import { Page } from "$utils/page.ts";

const handler: JSX.SubmitEventHandler<HTMLFormElement> = async function (
  event,
) {
  event.preventDefault();

  await fetch(globalThis.location.href, {
    method: "POST",
  });
};

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

  const pagesWithNo200Status = pages.filter((page) =>
    page.status !== 200 && page.status !== null
  );
  const pagesWithoutTitle = pages.filter((page) => page.title === null);

  return (
    <>
      <section>
        <form onSubmit={handler}>
          <button>Index all pages</button>
        </form>
      </section>
      <section>
        <details>
          <summary>
            There are {pagesWithNo200Status.length} pages with no 200 status
          </summary>
          <ul>
            {pagesWithNo200Status.map((page) => {
              return (
                <li>
                  <a href={page.url} target="_BLANK">{page.url}</a>
                </li>
              );
            })}
          </ul>
        </details>

        <details>
          <summary>
            There are {pagesWithoutTitle.length} pages without a title
          </summary>
          <ul>
            {pagesWithoutTitle.map((page) => {
              return (
                <li>
                  <a href={page.url} target="_BLANK">{page.url}</a>
                </li>
              );
            })}
          </ul>
        </details>

        <details>
          <summary>Pages in Sitemap: {pages.length}</summary>
          <table>
            <thead>
              <tr>
                <td>Title</td>
                <td>Status</td>
                <td>Actions</td>
              </tr>
            </thead>

            <tbody>
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
            </tbody>
          </table>
        </details>
      </section>
    </>
  );
}
