import { JSX } from "preact/jsx-runtime";

export function NewIndexButton(): JSX.Element {
  return (
    <form action="/" method="POST">
      <button>
        New index!
      </button>
    </form>
  );
}
