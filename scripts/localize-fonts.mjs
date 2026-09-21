import fs from "node:fs/promises";
const url =
  "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Manrope:wght@400;500;600;650;700;750;800&display=swap";
const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
if (!response.ok) throw new Error("Could not retrieve font CSS");
let css = await response.text();
await fs.mkdir("public/fonts", { recursive: true });
const urls = [
  ...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1])),
];
for (const [index, source] of urls.entries()) {
  const r = await fetch(source);
  if (!r.ok) throw new Error("Could not retrieve font");
  const file = `font-${index}.${source.split(".").pop()}`;
  await fs.writeFile(
    `public/fonts/${file}`,
    Buffer.from(await r.arrayBuffer()),
  );
  css = css.replaceAll(source, `/fonts/${file}`);
}
await fs.writeFile("src/app/fonts.css", css);
const global = await fs.readFile("src/app/globals.css", "utf8");
await fs.writeFile(
  "src/app/globals.css",
  global.replace(/^@import url\([^\n]+\);/, '@import "./fonts.css";'),
);
