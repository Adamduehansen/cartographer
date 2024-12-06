import { assertEquals } from "@std/assert";
import { pagesReducer, PagesReducerState } from "$islands/PagesReducer.ts";

Deno.test("Should update page in state", () => {
  // Arrange
  const initialState: PagesReducerState = {
    pages: [{
      id: "1",
      lastModified: "",
      title: "",
      url: "",
    }],
  };

  const expectedState: PagesReducerState = {
    pages: [{
      id: "1",
      lastModified: "",
      title: "any-title",
      url: "",
    }],
  };

  // Act
  const updatedState = pagesReducer(initialState, {
    type: "UPDATE_PAGE",
    payload: {
      id: "1",
      updatedPage: {
        id: "1",
        lastModified: "",
        title: "any-title",
        url: "",
      },
    },
  });

  // Assert
  assertEquals(updatedState, expectedState);
});

Deno.test("Set pages in state", () => {
  // Arrange
  const initialState: PagesReducerState = {
    pages: [],
  };

  const expectedState: PagesReducerState = {
    pages: [{
      id: "1",
      lastModified: "",
      title: "any-title",
      url: "",
    }],
  };

  // Act
  const updatedState = pagesReducer(initialState, {
    type: "SET_PAGES",
    payload: [{
      id: "1",
      lastModified: "",
      title: "any-title",
      url: "",
    }],
  });

  // Assert
  assertEquals(updatedState, expectedState);
});
