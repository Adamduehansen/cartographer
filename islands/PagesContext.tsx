import { ComponentChildren, createContext } from "preact";
import { useContext, useState } from "preact/hooks";
import { Page } from "$utils/page.ts";
import { JSX } from "preact/jsx-runtime";

interface PageContextProps {
  pages: Page[];
  updatePages: (pages: Page[]) => void;
}

export const PagesContext = createContext<PageContextProps>({
  pages: [],
  updatePages: () => {},
});

interface Props {
  pages: Page[];
  children: ComponentChildren;
}

export function PagesProvider(props: Props): JSX.Element {
  const [pages, setPages] = useState(props.pages);

  function updatePages(pages: Page[]): void {
    setPages(pages);
  }

  return (
    <PagesContext.Provider
      value={{
        pages: pages,
        updatePages: updatePages,
      }}
    >
      {props.children}
    </PagesContext.Provider>
  );
}

export function usePages(): PageContextProps {
  return useContext(PagesContext);
}
