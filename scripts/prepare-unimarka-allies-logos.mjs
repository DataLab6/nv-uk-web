import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = path.resolve("assets/publicidadUK/LOGOS MARCAS (3).svg");
const output = path.resolve("apps/unimarka/public/brands/allies-page");
const previewDirectory = process.argv[2];
// Bounds in the source viewBox, including a small safety margin. Do not trim
// transparent padding or stretch marks: the shared grid uses object-contain.
const logos = [
  ["familia", 55, 100, 155, 96],
  ["pequenin", 264, 90, 151, 110],
  ["petys", 466, 95, 154, 97],
  ["nosotras", 671, 85, 140, 124],
  ["pomys", 852, 103, 162, 88],
  ["tena", 1053, 96, 168, 103],
  ["familia-institucional", 1258, 97, 165, 102],
  ["refisal", 65, 244, 161, 101],
  ["blancox", 264, 240, 162, 106],
  ["blancox-lozacrem", 430, 249, 211, 80],
  ["tork", 663, 242, 189, 107],
  ["savital", 867, 245, 213, 100],
  ["maizena", 1093, 266, 145, 56],
  ["dove", 1240, 232, 180, 131],
  ["lux", 57, 378, 184, 77],
  ["axe", 263, 386, 178, 56],
  ["mirringo", 459, 380, 299, 73],
  ["ringo", 770, 388, 202, 60],
  ["vive100", 1009, 383, 186, 65],
  ["big-bom", 1227, 377, 201, 187],
  ["nutriss", 43, 484, 166, 88],
  ["saviloe", 218, 511, 205, 74],
  ["nutribela", 449, 506, 196, 63],
  ["ricostilla", 661, 468, 169, 122],
  ["la-soberana", 836, 489, 210, 87],
  ["aromatel", 1038, 457, 200, 152],
  ["vanish", 49, 600, 175, 136],
  ["woolite", 246, 634, 169, 80],
  ["sanpic", 422, 605, 154, 117],
  ["super", 594, 609, 193, 107],
  ["trululu", 776, 648, 200, 74],
  ["americandy", 1008, 614, 214, 91],
  ["fruco", 1247, 606, 162, 132],
];

if (previewDirectory) {
  await sharp(source, { unlimited: true })
    .resize(1440)
    .flatten({ background: "white" })
    .png()
    .toFile(path.join(previewDirectory, "unimarka-logos-source.png"));
} else {
  await mkdir(output, { recursive: true });
  const svg = await readFile(source, "utf8");
  const defs = svg.match(/<defs>[\s\S]*?<\/defs>/)?.[0];
  if (!defs) throw new Error("Source SVG has no definitions");
  const body = svg.slice(svg.indexOf("</defs>") + 7, svg.lastIndexOf("</svg>"));
  const nodes = [];
  let depth = 0;
  let start = 0;
  // Only split top-level elements; nested groups retain their masks and clips.
  for (const tag of body.matchAll(/<[^>]+>/g)) {
    if (depth === 0) start = tag.index;
    if (tag[0].startsWith("</")) depth--;
    else if (!tag[0].endsWith("/>")) depth++;
    if (depth === 0) nodes.push(body.slice(start, tag.index + tag[0].length));
  }
  if (nodes.length !== 28)
    throw new Error(`Unexpected SVG structure: ${nodes.length} elements`);
  // The first seven marks share one embedded image; the rest are independent.
  const nodeIndices = [
    0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 20, 25, 11, 14, 15,
    16, 22, 27, 17, 18, 19, 21, 23, 24, 26,
  ];
  for (const [index, [name, x, y, width, height]] of logos.entries()) {
    const cropped = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="${x} ${y} ${width} ${height}">${defs}${nodes[nodeIndices[index]]}</svg>`;
    const info = await sharp(Buffer.from(cropped), {
      density: 144,
      unlimited: true,
    })
      .resize({ width: 600, height: 400, fit: "inside" })
      .webp({ quality: 92, alphaQuality: 100, smartSubsample: true })
      .toFile(path.join(output, `${name}.webp`));
    console.log(`${name}: ${info.width} x ${info.height} (${info.size} bytes)`);
  }
}
