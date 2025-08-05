const fs = require("fs/promises");
const path = require("path");

// Configuration Strapi
const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error(
    "❌ STRAPI_TOKEN est requis dans les variables d'environnement"
  );
  process.exit(1);
}

async function importArticlesToStrapi() {
  try {
    console.log("🚀 Début de l'import des articles dans Strapi...");

    // Lire les articles extraits
    const extractedDataPath = path.join(
      process.cwd(),
      "extracted-blog-content.json"
    );
    const extractedData = await fs.readFile(extractedDataPath, "utf8");
    const articles = JSON.parse(extractedData);

    console.log(`📖 ${articles.length} articles trouvés pour l'import`);

    for (const article of articles) {
      try {
        console.log(`📝 Import de: ${article.title}`);

        // Préparer les données pour Strapi
        const strapiData = {
          data: {
            title: article.title,
            slug: article.slug,
            content: article.content,
            excerpt: article.excerpt || "",
            publishDate: article.publishDate || new Date().toISOString(),
            author: article.author || "E2I VoIP",
            tags: article.tags || [],
            categories: article.categories || [],
            metaDescription: article.metaDescription || "",
            seoTitle: article.seoTitle || article.title,
            status: "published",
            originalUrl: article.url,
            readingTime: Math.ceil((article.content?.length || 0) / 200), // Estimation du temps de lecture
          },
        };

        // Vérifier si l'article existe déjà
        const existingResponse = await fetch(
          `${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${article.slug}`,
          {
            headers: {
              Authorization: `Bearer ${STRAPI_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        const existingData = await existingResponse.json();

        if (existingData.data && existingData.data.length > 0) {
          console.log(`⚠️ Article déjà existant: ${article.title}`);
          continue;
        }

        // Créer l'article dans Strapi
        const response = await fetch(`${STRAPI_URL}/api/blog-posts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(strapiData),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error(
            `❌ Erreur lors de l'import de ${article.title}:`,
            errorData
          );
          continue;
        }

        const createdArticle = await response.json();
        console.log(
          `✅ Article importé: ${article.title} (ID: ${createdArticle.data.id})`
        );

        // Importer l'image de couverture si elle existe
        if (article.featuredImage) {
          await importFeaturedImage(
            createdArticle.data.id,
            article.featuredImage,
            article.slug
          );
        }

        // Pause entre les imports
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(
          `❌ Erreur pour l'article ${article.title}:`,
          error.message
        );
      }
    }

    console.log("\n🎉 Import terminé !");
  } catch (error) {
    console.error("❌ Erreur lors de l'import:", error);
    process.exit(1);
  }
}

async function importFeaturedImage(articleId, imageUrl, articleSlug) {
  try {
    // Vérifier si l'image existe localement
    const localImagePath = path.join(
      process.cwd(),
      "public",
      "blog-images",
      articleSlug,
      "image-1.jpg"
    );

    let imageBuffer;
    let filename;

    try {
      // Essayer de lire l'image locale
      imageBuffer = await fs.readFile(localImagePath);
      filename = "featured-image.jpg";
    } catch (error) {
      // Si l'image locale n'existe pas, télécharger depuis l'URL
      console.log(
        `📸 Téléchargement de l'image de couverture pour: ${articleSlug}`
      );
      imageBuffer = await downloadImage(imageUrl);
      filename = "featured-image.jpg";
    }

    // Créer un FormData pour l'upload
    const FormData = require("form-data");
    const form = new FormData();
    form.append("files", imageBuffer, {
      filename,
      contentType: "image/jpeg",
    });

    // Upload de l'image
    const uploadResponse = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        ...form.getHeaders(),
      },
      body: form,
    });

    if (!uploadResponse.ok) {
      console.error(`❌ Erreur upload image pour ${articleSlug}`);
      return;
    }

    const uploadData = await uploadResponse.json();
    const mediaId = uploadData[0].id;

    // Associer l'image à l'article
    const updateResponse = await fetch(
      `${STRAPI_URL}/api/blog-posts/${articleId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            featuredImage: mediaId,
          },
        }),
      }
    );

    if (updateResponse.ok) {
      console.log(`✅ Image de couverture associée à: ${articleSlug}`);
    }
  } catch (error) {
    console.error(`❌ Erreur import image pour ${articleSlug}:`, error.message);
  }
}

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const https = require("https");
    const http = require("http");

    const protocol = url.startsWith("https:") ? https : http;

    protocol
      .get(url, (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks)));
        response.on("error", reject);
      })
      .on("error", reject);
  });
}

// Fonction principale
async function main() {
  try {
    await importArticlesToStrapi();
  } catch (error) {
    console.error("❌ Erreur lors de l'import:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { importArticlesToStrapi };
