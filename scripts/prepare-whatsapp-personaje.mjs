import { access, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const source = new URL("assets/personajes final-02.png", root);
const destinations = ["la-nieve", "unimarka"].map(
  (brand) => new URL(`apps/${brand}/public/images/`, root)
);

await Promise.all(destinations.map((directory) => access(directory)));

// Trim transparent margins before resizing, preserving the whole character.
const { data, info } = await sharp(fileURLToPath(source))
  .trim()
  .resize({ height: 256, withoutEnlargement: true })
  .webp({ quality: 85, effort: 6 })
  .toBuffer({ resolveWithObject: true });

for (const directory of destinations) {
  await writeFile(new URL("whatsapp-personaje.webp", directory), data);
}

console.log(
  `whatsapp-personaje.webp: ${info.width}x${info.height}, ${info.size} bytes per app`
);
