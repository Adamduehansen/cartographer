import { JSX } from "preact/jsx-runtime";

interface Props {
  url: string;
  title: string | null;
}

export function PageDetailsHeader({ title, url }: Props): JSX.Element {
  return (
    <>
      {title !== null && title}
      <a href={url} target="_BLANK" rel="noopener noreferrer">{url}</a>
    </>
  );
}
