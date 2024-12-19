import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>cartographer</title>
        {/* <link rel="stylesheet" href="/styles.css" /> */}
        <link rel="stylesheet" href="pico.min.css" />
      </head>
      <body>
        <header class="container">
          <h1>Cartographer</h1>
        </header>
        <main class="container">
          <Component />
        </main>
      </body>
    </html>
  );
}
