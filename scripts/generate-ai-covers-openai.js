/* eslint-disable */
// Génération de couvertures via OpenAI Images API (modèle gpt-image-1)
// Conformément au document Blog_Image_PRD.md (flat design, palette E2I VOIP)

const fs = require("fs");
const path = require("path");
const contentful = require("contentful-management");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DRY_RUN =
  process.env.DRY_RUN === "1" || process.argv.includes("--dry-run");

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const CT_ID = process.env.CONTENTFUL_CONTENT_TYPE_ID || "blogPost";
const LOCALE = process.env.CONTENTFUL_LOCALE || "en-US"; // lecture
const ASSET_LOCALE = "en-US"; // écriture/lien

if (!SPACE_ID || !CMA_TOKEN) {
  console.error(
    "❌ CONTENTFUL_SPACE_ID ou CONTENTFUL_MANAGEMENT_TOKEN manquant"
  );
  process.exit(1);
}

function promptFrom(title, tags = []) {
  const tagLine = (tags || []).slice(0, 3).join(", ");
  return [
    "Flat vector illustration, minimalistic, modern, no text.",
    "Strict palette: #E53E3E red, #2D3848 navy, #818096 gray, #FFFFFF white.",
    "White background. Clean composition. Brand: E2I VOIP.",
    "Use telephony/cloud/security/automation visual metaphors as relevant.",
    `Article topic: ${title}. Tags: ${tagLine}.`,
  ].join(" ");
}

async function openaiGeneratePng(prompt) {
  if (!OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY manquant (requis pour la génération réelle)"
    );
  }
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1200x630",
      background: "white",
      quality: "high",
    }),
  });
  if (!res.ok)
    throw new Error(`OpenAI error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error("Réponse OpenAI invalide (pas d'image)");
  return Buffer.from(b64, "base64");
}

async function ensureAssetFromBuffer(env, buffer, fileName) {
  const asset = await env.createAssetFromFiles({
    fields: {
      title: { [ASSET_LOCALE]: fileName },
      file: {
        [ASSET_LOCALE]: {
          contentType: "image/png",
          fileName,
          file: buffer,
        },
      },
    },
  });
  const processed = await asset.processForAllLocales();
  return processed.publish();
}

async function main() {
  const client = contentful.createClient({ accessToken: CMA_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  const entries = await env.getEntries({ content_type: CT_ID, limit: 1000 });
  console.log(`📄 ${entries.items.length} articles à illustrer (OpenAI)`);

  const outDir = path.join(__dirname, "public", "blog-covers-ai");
  fs.mkdirSync(outDir, { recursive: true });

  for (const entry of entries.items) {
    try {
      const fields = entry.fields || {};
      const get = (k) => fields[k]?.[LOCALE] ?? fields[k]?.["en-US"];
      const slug = get("slug");
      const title = get("title") || slug || "Blog";
      const tags = get("tags") || [];

      const prompt = promptFrom(title, tags);
      const filename = `${slug || "post"}-ai-cover.png`;
      const filePath = path.join(outDir, filename);

      if (DRY_RUN) {
        console.log(`🧪 [DRY] ${slug}: ${prompt}`);
        continue;
      }

      const buffer = await openaiGeneratePng(prompt);
      fs.writeFileSync(filePath, buffer);

      const asset = await ensureAssetFromBuffer(env, buffer, filename);
      entry.fields.featuredImage = {
        [ASSET_LOCALE]: {
          sys: { type: "Link", linkType: "Asset", id: asset.sys.id },
        },
      };
      const upd = await entry.update();
      await upd.publish();
      console.log(`✅ Couverture AI générée & liée: ${slug}`);
    } catch (e) {
      console.error(`❌ Erreur pour un article: ${e.message}`);
    }
  }

  console.log("\n🎉 Génération AI terminée.");
}

if (require.main === module) {
  main().catch((e) => {
    console.error("❌ Erreur fatale:", e);
    process.exit(1);
  });
}
