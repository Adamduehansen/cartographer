import { Page } from "$utils/page.ts";

interface DataTypes {
  message: {
    type: string;
  };
  pages: {
    type: Page[];
  };
}

type DataType = keyof DataTypes;

export class Channel {
  #controller: ReadableStreamDefaultController;

  constructor(controller: ReadableStreamDefaultController) {
    this.#controller = controller;
  }

  send<T extends DataType>(type: T, data: DataTypes[T]["type"]) {
    const chunk = `data: ${
      JSON.stringify({
        type: type,
        value: data,
      })
    }\n\n`;
    this.#controller.enqueue(new TextEncoder().encode(chunk));
  }
}
