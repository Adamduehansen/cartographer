import { JSX } from "preact/jsx-runtime";

interface Props {
  timestamp: number;
}

const DateTimeFormat = Intl.DateTimeFormat("da-DK", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function Time({ timestamp }: Props): JSX.Element {
  return <time datetime="">{DateTimeFormat.format(new Date(timestamp))}</time>;
}
