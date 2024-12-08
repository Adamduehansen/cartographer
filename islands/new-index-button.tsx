import { JSX } from "preact/jsx-runtime";
import { useState } from "preact/hooks";
import { usePages } from "$islands/PagesContext.tsx";

export function NewIndexButton(): JSX.Element {
  const [pending, setPending] = useState<"error" | "idle" | "loading">("idle");
  const { setPages } = usePages();

  function startIndex() {
    try {
      setPending("loading");
      const eventSource = new EventSource("/api/index-sitemap-database");
      eventSource.addEventListener("open", () => {
        console.log("Connection established!");
      });
      eventSource.addEventListener("error", () => {
        console.log("Connection error!");
      });
      eventSource.addEventListener("message", (ev) => {
        console.log("Connection message:", ev.data);
        const data = JSON.parse(ev.data);
        if (data.type === "pages") {
          setPages(data.value);
          console.log("Closing connection.");
          eventSource.close();
        }
      });
      setPending("idle");
    } catch (error) {
      setPending("error");
      throw error;
    }
  }

  return (
    <button disabled={pending === "loading"} onClick={startIndex}>
      New index!
    </button>
  );
}
