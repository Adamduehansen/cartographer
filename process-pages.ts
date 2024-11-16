const kv = await Deno.openKv("./db.dat");

const pages = kv.list({
  prefix: ["urls"],
});
for await (const page of pages) {
}
