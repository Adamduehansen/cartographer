import { JSX } from "preact/jsx-runtime";
import { usePages } from "$islands/PagesContext.tsx";

export function NewIndexButton(): JSX.Element {
  const { setPages } = usePages();

  async function startIndex() {
    const response = await fetch("/api/index-sitemap-database");
    const json = await response.json();
    setPages(json);
  }

  return <button onClick={startIndex}>New index!</button>;
}
