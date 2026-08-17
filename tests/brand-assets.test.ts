import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

async function expectWhiteCorner(relativePath: string, width: number, height: number) {
  const image = sharp(path.join(root, relativePath));
  const metadata = await image.metadata();
  const pixel = await sharp(path.join(root, relativePath))
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .removeAlpha()
    .raw()
    .toBuffer();

  expect(metadata.width).toBe(width);
  expect(metadata.height).toBe(height);
  expect([...pixel]).toEqual([255, 255, 255]);
}

describe("visuels de marque", () => {
  test("les icônes principales utilisent un fond blanc", async () => {
    await expectWhiteCorner("app/icon.png", 512, 512);
    await expectWhiteCorner("app/apple-icon.png", 180, 180);
    await expectWhiteCorner("public/favicon-32x32.png", 32, 32);
  });

  test("l'image de partage est au format Open Graph et sur fond blanc", async () => {
    await expectWhiteCorner("public/images/e2i-voip-partage.png", 1200, 630);
  });

  test("les favicons App Router et public restent identiques", async () => {
    const [appFavicon, publicFavicon] = await Promise.all([
      readFile(path.join(root, "app/favicon.ico")),
      readFile(path.join(root, "public/favicon.ico")),
    ]);

    expect(appFavicon.equals(publicFavicon)).toBe(true);
  });
});
