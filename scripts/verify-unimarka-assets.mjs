import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("apps/unimarka/public");
const config = await readFile("apps/unimarka/src/site.config.ts", "utf8");
const logos = [
  ...config.matchAll(
    /brandLogo\(\s*"([^"]+)",\s*"(\/brands\/allies-page\/[^\"]+)",\s*(\d+),\s*(\d+)/g
  ),
];
assert.equal(logos.length, 33);
assert.equal(new Set(logos.map((logo) => logo[2])).size, 33);
assert.deepEqual(
  logos.slice(0, 3).map((logo) => logo[1]),
  ["Refisal", "Fruco", "Familia"]
);
assert.equal((await readdir(path.join(root, "brands/allies-page"))).length, 33);
let bytes = 0;
const tiles = [];
for (const [, name, src, width, height] of logos) {
  const file = path.join(root, src);
  const data = await readFile(file);
  const metadata = await sharp(data).metadata();
  assert.equal(metadata.format, "webp", name);
  assert.equal(metadata.width, Number(width), name);
  assert.equal(metadata.height, Number(height), name);
  assert.ok(metadata.width <= 600 && metadata.height <= 400, name);
  const flattened = await sharp(data)
    .flatten({ background: "white" })
    .toBuffer();
  const stats = await sharp(flattened).stats();
  assert.ok(stats.entropy > 0, `${name}: empty image`);
  bytes += data.length;
  tiles.push(
    await sharp(data)
      .resize(200, 112, { fit: "contain", background: "white" })
      .flatten({ background: "white" })
      .png()
      .toBuffer()
  );
}
assert.match(config, /logos: unimarkaBrandLogos/);
assert.match(config, /advertisements: unimarkaAdvertisements/);
assert.equal(config.match(/verticalOffset: "5rem"/g)?.length, 3);
console.log(
  `Verified 33 WebP assets, dimensions, unique paths and original carousel references (${bytes} bytes).`
);

// Optional visual evidence stays outside public; pass an existing directory.
if (process.argv[2]) {
  await sharp({
    create: { width: 1000, height: 784, channels: 3, background: "white" },
  })
    .composite(
      tiles.map((input, index) => ({
        input,
        left: (index % 5) * 200,
        top: Math.floor(index / 5) * 112,
      }))
    )
    .png()
    .toFile(path.join(process.argv[2], "unimarka-allies-contact-sheet.png"));
  for (const [width, height, fractions] of [
    [1440, 648, [0.34, 0.45, 0.309]],
    [390, 574, [0.33, 0.4, 0.3]],
  ]) {
    const panels = [];
    const navigationOffset = 80;
    for (const [index, position] of [0.32, 0.69, 0.61].entries()) {
      const file = path.join(
        root,
        `images/culture/people/hero-persona-${index + 1}.jpg`
      );
      const metadata = await sharp(file).metadata();
      const panelWidth = Math.round(width * fractions[index]);
      const scale = Math.max(
        panelWidth / metadata.width,
        height / metadata.height
      );
      const resizedWidth = Math.round(metadata.width * scale);
      const resizedHeight = Math.round(metadata.height * scale);
      const shiftedImage = await sharp(file)
        .resize(resizedWidth, resizedHeight)
        .extract({
          left: Math.round((resizedWidth - panelWidth) * position),
          top: 0,
          width: panelWidth,
          height: height - navigationOffset,
        })
        .png()
        .toBuffer();
      panels.push(
        await sharp({
          create: {
            width: panelWidth,
            height,
            channels: 3,
            background: "#0b2744",
          },
        })
          .composite([{ input: shiftedImage, left: 0, top: navigationOffset }])
          .png()
          .toBuffer()
      );
    }
    let left = 0;
    const layers = panels.map((input, index) => {
      const layer = { input, left, top: 0 };
      left += Math.round(width * fractions[index]);
      return layer;
    });
    await sharp({
      create: { width: left, height, channels: 3, background: "white" },
    })
      .composite(layers)
      .png()
      .toFile(
        path.join(process.argv[2], `unimarka-culture-crops-${width}.png`)
      );
  }
}
