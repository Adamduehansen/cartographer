import { Page } from "$utils/page.ts";

export interface PagesReducerState {
  pages: Page[];
}

interface UpdatePageAction {
  type: "UPDATE_PAGE";
  payload: {
    id: string;
    updatedPage: Page;
  };
}

interface SetPagesAction {
  type: "SET_PAGES";
  payload: Page[];
}

type PageReducerActions = UpdatePageAction | SetPagesAction;

export function pagesReducer(
  state: PagesReducerState,
  action: PageReducerActions,
): PagesReducerState {
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
    case "SET_PAGES":
      return {
        pages: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
