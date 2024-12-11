import { JSX } from "preact/jsx-runtime";
import { useState } from "preact/hooks";

export function NewIndexButton(): JSX.Element {
  const [pending, setPending] = useState<"idle" | "fetching">("idle");
  // const { setPages } = usePages();

  // async function startIndex() {
  //   setPending("fetching");
  //   try {
  //     const response = await fetch("api/get-index");
  //     const json = await response.json();
  //     const pages = v.parse(PagesSchema, json);
  //     setPages(pages);
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   setPending("idle");
  // }

  return (
    <form action="/" method="POST">
      <button disabled={pending === "fetching"}>
        New index!
      </button>
    </form>
  );
}
