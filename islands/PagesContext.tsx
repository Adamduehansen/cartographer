import { ComponentChildren, createContext } from "preact";
import { useContext, useReducer } from "preact/hooks";
import { Page } from "$utils/page.ts";
import { JSX } from "preact/jsx-runtime";
import { pagesReducer } from "$islands/PagesReducer.ts";

interface PageContextProps {
  pages: Page[];
  updatePage: (pageId: string, page: Page) => void;
  setPages: (pages: Page[]) => void;
}

export const PagesContext = createContext<PageContextProps>({
  pages: [],
  updatePage: () => {},
  setPages: () => {},
});

interface Props {
  pages: Page[];
  children: ComponentChildren;
}

export function PagesProvider(props: Props): JSX.Element {
  const [state, dispatch] = useReducer(pagesReducer, {
    pages: props.pages,
  });

  function updatePage(pageId: string, updatedPage: Page): void {
    dispatch({
      type: "UPDATE_PAGE",
      payload: {
        id: pageId,
        updatedPage: updatedPage,
      },
    });
  }

  function setPages(pages: Page[]): void {
    dispatch({
      type: "SET_PAGES",
      payload: pages,
    });
  }

  return (
    <PagesContext.Provider
      value={{
        pages: state.pages,
        updatePage: updatePage,
        setPages: setPages,
      }}
    >
      {props.children}
    </PagesContext.Provider>
  );
}

export function usePages(): PageContextProps {
  return useContext(PagesContext);
}
