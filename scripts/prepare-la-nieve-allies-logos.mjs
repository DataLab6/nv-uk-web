import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDirectory = path.join(
  process.cwd(),
  "assets",
  "publicidadNV",
  "logos-extraidos"
);
const outputDirectory = path.join(
  process.cwd(),
  "apps",
  "la-nieve",
  "public",
  "brands",
  "allies-page"
);

// logo-001 contiene únicamente una textura. Los SVG de tipo `path` restantes
// son recortes auxiliares vacíos; estos son los 42 elementos con marca visible.
const logoIds = [
  "002",
  "003",
  "004",
  "006",
  "008",
  "010",
  "011",
  "012",
  "014",
  "015",
  "016",
  "017",
  "018",
  "019",
  "020",
  "021",
  "022",
  "023",
  "027",
  "028",
  "029",
  "035",
  "036",
  "037",
  "038",
  "039",
  "043",
  "044",
  "045",
  "046",
  "047",
  "048",
  "049",
  "050",
  "054",
  "055",
  "056",
  "057",
  "058",
  "059",
  "060",
  "061",
];

async function prepareLogo(id) {
  const sourcePath = path.join(sourceDirectory, `logo-${id}.svg`);
  const outputPath = path.join(outputDirectory, `logo-${id}.webp`);
  return sharp(sourcePath, {
    density: 144,
    unlimited: true,
  })
    .resize({ width: 600, height: 400, fit: "inside" })
    .webp({ quality: 92, alphaQuality: 100, smartSubsample: true })
    .toFile(outputPath);
}

await mkdir(outputDirectory, { recursive: true });
await Promise.all(logoIds.map(prepareLogo));
console.log(`Preparados ${logoIds.length} logos para Aliados comerciales.`);
