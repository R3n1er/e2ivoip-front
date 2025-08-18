/* eslint-disable */
const fs = require("fs");
const path = require("path");
const contentful = require("contentful-management");
let TurndownService = require("turndown");
TurndownService = TurndownService.default || TurndownService;
const { richTextFromMarkdown } = require("@contentful/rich-text-from-markdown");

// Env
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const CT_ID = process.env.CONTENTFUL_CONTENT_TYPE_ID || "blogPost";
const LOCALE = process.env.CONTENTFUL_LOCALE || "en-US";

// Flags
const DRY_RUN = process.argv.includes("--dry-run");

// Paths (le script vit dans scripts/, les fichiers sont aussi dans scripts/)
const INPUT_PRIMARY = path.join(__dirname, "extracted-blog-content.json");
const INPUT_FALLBACK = path.join(
  __dirname,
  "..",
  "extracted-blog-content.json"
);

function readExtractedArticles() {
  const candidate = fs.existsSync(INPUT_PRIMARY)
    ? INPUT_PRIMARY
    : INPUT_FALLBACK;
  if (!fs.existsSync(candidate)) {
    throw new Error(
      `Fichier introuvable: ${INPUT_PRIMARY} (ou fallback ${INPUT_FALLBACK}). Lance d'abord l'extraction.`
    );
  }
  const raw = fs.readFileSync(candidate, "utf-8");
  const items = JSON.parse(raw);
  if (!Array.isArray(items) || !items.length) {
    throw new Error("Aucun article valide dans extracted-blog-content.json");
  }
  return items;
}

function imagesDirFor(slug) {
  // Les images sont sous scripts/public/blog-images/<slug>
  return path.join(__dirname, "public", "blog-images", slug);
}

async function htmlToRichText(html) {
  const turndown = new TurndownService({ headingStyle: "atx" });
  const md = turndown.turndown(html || "");
  return await richTextFromMarkdown(md || "");
}

async function ensureAssetFromFile(env, filePath, fileName) {
  const buffer = fs.readFileSync(filePath);
  const contentType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";
  const asset = await env.createAssetFromFiles({
    fields: {
      title: { [LOCALE]: fileName },
      file: {
        [LOCALE]: {
          contentType,
          fileName,
          file: buffer,
        },
      },
    },
  });
  const processed = await asset.processForAllLocales();
  return processed.publish();
}

async function maybeUploadFeaturedImage(env, slug) {
  const dir = imagesDirFor(slug);
  if (!fs.existsSync(dir)) return null;
  const files = fs
    .readdirSync(dir)
    .filter(
      (f) =>
        f.startsWith("image-") &&
        (f.endsWith(".jpg") || f.endsWith(".jpeg") || f.endsWith(".png"))
    );
  if (!files.length) return null;
  const filePath = path.join(dir, files[0]);
  const asset = await ensureAssetFromFile(
    env,
    filePath,
    `${slug}-featured${path.extname(files[0])}`
  );
  return { sys: { type: "Link", linkType: "Asset", id: asset.sys.id } };
}

async function findEntryBySlug(env, slug) {
  const res = await env.getEntries({
    content_type: CT_ID,
    "fields.slug": slug,
    limit: 1,
  });
  return res.items[0];
}

async function createOrUpdateEntry(env, item, featuredAssetLink) {
  const toISO = (value) => {
    if (!value) return new Date().toISOString();
    const d = new Date(value);
    return Number.isNaN(d.getTime())
      ? new Date().toISOString()
      : d.toISOString();
  };
  const sanitizeMeta = (value) => {
    if (!value) return "";
    const s = String(value).trim().replace(/\s+/g, " ");
    return s.length > 160 ? s.slice(0, 157) + "…" : s;
  };
  const fields = {
    title: { [LOCALE]: item.title || "" },
    slug: { [LOCALE]: item.slug || "" },
    excerpt: { [LOCALE]: item.excerpt || "" },
    content: { [LOCALE]: await htmlToRichText(item.content || "") },
    author: { [LOCALE]: item.author || "E2I VoIP" },
    publishDate: { [LOCALE]: toISO(item.publishDate) },
    metaDescription: {
      [LOCALE]: sanitizeMeta(item.metaDescription || item.excerpt),
    },
    seoTitle: { [LOCALE]: item.seoTitle || item.title || "" },
    tags: { [LOCALE]: (item.tags || []).filter(Boolean) },
  };
  if (featuredAssetLink) {
    fields.featuredImage = { [LOCALE]: featuredAssetLink };
  }

  const existing = await findEntryBySlug(env, item.slug);
  if (existing) {
    existing.fields = { ...existing.fields, ...fields };
    const upd = await existing.update();
    return upd.publish();
  }
  const entry = await env.createEntry(CT_ID, { fields });
  return entry.publish();
}

async function main() {
  const items = readExtractedArticles();

  if (DRY_RUN) {
    console.log(
      `🧪 Dry-run actif: ${items.length} articles seraient importés.`
    );
    console.log(`Premier: ${items[0]?.title} (slug: ${items[0]?.slug})`);
    console.log("Aucun appel Contentful n'a été effectué.");
    return;
  }

  if (!SPACE_ID || !CMA_TOKEN) {
    throw new Error(
      "CONTENTFUL_SPACE_ID ou CONTENTFUL_MANAGEMENT_TOKEN manquant (requis hors dry-run)."
    );
  }

  const client = contentful.createClient({ accessToken: CMA_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  for (const [i, item] of items.entries()) {
    try {
      console.log(
        `\n[${i + 1}/${items.length}] 📄 ${item.title} (${item.slug})`
      );
      const featured = await maybeUploadFeaturedImage(env, item.slug);
      await createOrUpdateEntry(env, item, featured);
      await new Promise((r) => setTimeout(r, 350));
      console.log(`✅ Importé: ${item.slug}`);
    } catch (e) {
      console.error(`❌ Erreur import ${item.slug}:`, e.message);
    }
  }

  console.log("\n🎉 Import terminé.");
}

if (require.main === module) {
  main().catch((e) => {
    console.error("❌ Erreur fatale:", e);
    process.exit(1);
  });
}

module.exports = {};
