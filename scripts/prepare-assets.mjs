import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
await fs.mkdir("public/images", { recursive: true });
for (const [i, name] of [
  "monitor",
  "access",
  "team",
  "classroom",
  "field",
].entries())
  await sharp(`recursos/capacitaciones/capacitacion (${i + 1}).png`)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(`public/images/${name}.webp`);
await sharp("recursos/logo/logo1.png")
  .resize(300)
  .webp({ quality: 90 })
  .toFile("public/images/logo.webp");
await sharp("recursos/logo/logo1.png")
  .resize(96)
  .png()
  .toFile("src/app/icon.png");
const data = JSON.parse(await fs.readFile("src/data/course.json", "utf8"));
const fixes = {
  "?tica": "ética",
  "Comunicaci?n": "Comunicación",
  "atenci?n": "atención",
  "p?blico": "público",
  "Prevenci?n": "Prevención",
  "Evaluaci?n": "Evaluación",
};
for (const m of data.modules)
  for (const [a, b] of Object.entries(fixes)) m.title = m.title.replace(a, b);
await fs.writeFile(
  "src/data/course.json",
  JSON.stringify(data, null, 2) + "\n",
);
const pdfRoot = path.dirname(
  fileURLToPath(import.meta.resolve("pdfjs-dist/package.json")),
);
await fs.copyFile(
  path.join(pdfRoot, "build/pdf.worker.min.mjs"),
  "public/pdf.worker.min.mjs",
);
for (const dir of ["cmaps", "standard_fonts", "wasm"])
  await fs.cp(path.join(pdfRoot, dir), `public/pdfjs/${dir}`, {
    recursive: true,
  });
