import { Page } from "$utils/page.ts";

interface PageReducerState {
  pages: Page[];
}

interface UpdatePageAction {
  type: "UPDATE_PAGE";
  payload: {
    id: string;
    updatedPage: Page;
  };
}

type PageReducerActions = UpdatePageAction;

export function pagesReducer(
  state: PageReducerState,
  action: PageReducerActions,
): PageReducerState {
  switch (action.type) {
    case "UPDATE_PAGE":
      return {
        ...state,
        pages: state.pages.map((page) => {
          if (action.payload.id !== page.id) {
            return {
              ...page,
            };
          }

          return {
            ...action.payload.updatedPage,
          };
        }),
      };
    default:
      return {
        ...state,
      };
  }
}
