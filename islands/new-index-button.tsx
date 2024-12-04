import { JSX } from "preact/jsx-runtime";

export function NewIndexButton(): JSX.Element {
  async function startIndex() {
    await fetch("/api/index-sitemap-database");
  }

  return <button onClick={startIndex}>New index!</button>;
}
