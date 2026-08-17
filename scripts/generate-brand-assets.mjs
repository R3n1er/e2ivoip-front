import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public/Logo-E2I-solo-favicon.png");

async function logoOnWhite(width, height, logoWidth) {
  const logo = await sharp(source)
    .resize({ width: logoWidth, height: height - Math.round(height * 0.12), fit: "inside" })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#ffffff",
    },
  })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toBuffer();
}

const iconSizes = [16, 32, 72, 96, 128, 144, 152, 180, 192, 256, 384, 512];
const icons = new Map();

for (const size of iconSizes) {
  icons.set(size, await logoOnWhite(size, size, Math.round(size * 0.9)));
}

await Promise.all([
  writeFile(path.join(root, "app/icon.png"), icons.get(512)),
  writeFile(path.join(root, "app/apple-icon.png"), icons.get(180)),
  writeFile(path.join(root, "public/favicon-16x16.png"), icons.get(16)),
  writeFile(path.join(root, "public/favicon-32x32.png"), icons.get(32)),
  writeFile(path.join(root, "public/apple-touch-icon.png"), icons.get(180)),
  ...[72, 96, 128, 144, 152, 192, 384, 512].map((size) =>
    writeFile(path.join(root, `public/images/icons/icon-${size}x${size}.png`), icons.get(size)),
  ),
  writeFile(
    path.join(root, "public/images/e2i-voip-partage.png"),
    await logoOnWhite(1200, 630, 600),
  ),
]);

const faviconImages = await Promise.all(
  [16, 32, 48].map(
    (size) => icons.get(size) ?? logoOnWhite(size, size, Math.round(size * 0.9)),
  ),
);
const favicon = await pngToIco(faviconImages);

await Promise.all([
  writeFile(path.join(root, "app/favicon.ico"), favicon),
  writeFile(path.join(root, "public/favicon.ico"), favicon),
]);
