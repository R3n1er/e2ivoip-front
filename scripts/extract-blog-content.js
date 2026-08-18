const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const path = require("path");
const https = require("https");
const http = require("http");
const { assertSafeBlogUrl, safeSlugSegment } = require("./lib/url-safety");

// Structure pour les articles de blog
// BlogArticle: {
//   title: string;
//   content: string;
//   excerpt: string;
//   publishDate: string;
//   author: string;
//   tags: string[];
//   categories: string[];
//   slug: string;
//   featuredImage?: string;
//   images: string[];
//   metaDescription?: string;
//   seoTitle?: string;
//   url: string;
// }

// Liste des articles identifiés sur votre site
const articles = [
  {
    url: "https://www.e2i-voip.com/blog/trunk-sip-drom-guide-2025",
    slug: "trunk-sip-drom-guide-2025",
    title:
      "Trunk SIP dans les DROM : le guide 2025 pour choisir un opérateur VoIP local",
  },
  {
    url: "https://www.e2i-voip.com/blog/signature-man-telephonie-entreprise",
    slug: "signature-man-telephonie-entreprise",
    title:
      "La signature MAN : Pour une téléphonie d'entreprise fiable et conforme",
  },
  {
    url: "https://www.e2i-voip.com/blog/telephonie-ip-entreprise-3cx-2025",
    slug: "telephonie-ip-entreprise-3cx-2025",
    title: "Téléphonie IP d'entreprise : Pourquoi opter pour 3CX en 2025",
  },
  {
    url: "https://www.e2i-voip.com/blog/3cx-cfd-automatiser-flux-appels-entrants",
    slug: "3cx-cfd-automatiser-flux-appels-entrants",
    title: "3CX CFD : Comment automatiser vos flux d'appels entrants",
  },
  {
    url: "https://www.e2i-voip.com/blog/fin-cuivre-remplacer-pabx-entreprise",
    slug: "fin-cuivre-remplacer-pabx-entreprise",
    title: "Profiter de la fin du cuivre pour remplacer son PABX en entreprise",
  },
  {
    url: "https://www.e2i-voip.com/blog/comparaison-3cx-vs-ringover",
    slug: "comparaison-3cx-vs-ringover",
    title: "Comparaison 3CX vs Ringover",
  },
  {
    url: "https://www.e2i-voip.com/blog/reponse-3cx-piratage-supply-chain",
    slug: "reponse-3cx-piratage-supply-chain",
    title: "La réponse de 3CX face à son piratage supply chain",
  },
  {
    url: "https://www.e2i-voip.com/blog/smartphone-mobilite-standard-telephonique",
    slug: "smartphone-mobilite-standard-telephonique",
    title:
      "Utiliser son smartphone et être disponible même en mobilité avec son standard téléphonique",
  },
  {
    url: "https://www.e2i-voip.com/blog/3-raisons-voip-abandonner-rnis",
    slug: "3-raisons-voip-abandonner-rnis",
    title:
      "3 raisons pour lesquelles votre entreprise devrait passer à la VoIP et abandonner le RNIS",
  },
  {
    url: "https://www.e2i-voip.com/blog/5-avantages-3cx-standard-telephonique-entreprise",
    slug: "5-avantages-3cx-standard-telephonique-entreprise",
    title: "5 avantages de 3CX pour son standard téléphonique d'entreprise",
  },
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https:") ? https : http;
    const file = require("fs").createWriteStream(filepath);

    protocol
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        require("fs").unlink(filepath, () => {}); // Supprimer le fichier en cas d'erreur
        reject(err);
      });
  });
}

async function extractBlogContent() {
  console.log("🚀 Début de l'extraction des articles de blog...");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Configuration du user agent pour éviter la détection
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  const extractedArticles = [];

  for (const article of articles) {
    try {
      console.log(`📖 Extraction de: ${article.title}`);

      await page.goto(assertSafeBlogUrl(article.url), {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Attendre que le contenu soit chargé
      await page.waitForSelector("body", { timeout: 10000 });

      const articleData = await page.evaluate(() => {
        // Extraction du titre - sélecteurs plus robustes
        const title =
          document.querySelector("h1")?.textContent?.trim() ||
          document.querySelector(".blog-post__headline")?.textContent?.trim() ||
          document.querySelector(".article-title")?.textContent?.trim() ||
          document.querySelector(".post-title")?.textContent?.trim() ||
          document.querySelector("title")?.textContent?.trim();

        // Extraction du contenu - sélecteurs plus robustes
        const content =
          document.querySelector(".blog-post__body")?.innerHTML ||
          document.querySelector(".article-content")?.innerHTML ||
          document.querySelector(".post-content")?.innerHTML ||
          document.querySelector("article")?.innerHTML ||
          document.querySelector(".content")?.innerHTML ||
          document.querySelector(".blog-post")?.innerHTML;

        // Extraction de l'extrait
        const excerpt =
          document.querySelector(".article-excerpt")?.textContent?.trim() ||
          document.querySelector(".post-excerpt")?.textContent?.trim() ||
          document.querySelector(".excerpt")?.textContent?.trim() ||
          document.querySelector(".blog-post__body p")?.textContent?.trim();

        // Extraction de la date - sélecteurs plus robustes
        const publishDate =
          document
            .querySelector(".blog-post__timestamp")
            ?.textContent?.trim() ||
          document.querySelector(".publish-date")?.textContent?.trim() ||
          document.querySelector(".post-date")?.textContent?.trim() ||
          document.querySelector(".date")?.textContent?.trim() ||
          document.querySelector("time")?.textContent?.trim();

        // Extraction de l'auteur - sélecteurs plus robustes
        const author =
          document
            .querySelector(".blog-post__author-name")
            ?.textContent?.trim() ||
          document.querySelector(".author")?.textContent?.trim() ||
          document.querySelector(".post-author")?.textContent?.trim() ||
          "E2I VoIP";

        // Extraction des tags
        const tags = Array.from(
          document.querySelectorAll(
            ".tags .tag, .post-tags .tag, .blog-post__tags .tag"
          )
        )
          .map((tag) => tag.textContent?.trim())
          .filter(Boolean);

        // Extraction des catégories
        const categories = Array.from(
          document.querySelectorAll(
            ".categories .category, .post-categories .category, .blog-post__categories .category"
          )
        )
          .map((cat) => cat.textContent?.trim())
          .filter(Boolean);

        // Extraction de l'image de couverture - sélecteurs plus robustes
        const featuredImage =
          document
            .querySelector(".blog-post__featured-image img")
            ?.getAttribute("src") ||
          document.querySelector(".featured-image img")?.getAttribute("src") ||
          document.querySelector(".post-image img")?.getAttribute("src") ||
          document.querySelector("article img")?.getAttribute("src") ||
          document.querySelector(".blog-post img")?.getAttribute("src");

        // Extraction de toutes les images - sélecteurs plus robustes
        const images = Array.from(
          document.querySelectorAll(
            ".blog-post__body img, .article-content img, .post-content img, article img, .blog-post img"
          )
        )
          .map((img) => img.getAttribute("src"))
          .filter(Boolean);

        // Extraction des métadonnées SEO
        const metaDescription =
          document
            .querySelector('meta[name="description"]')
            ?.getAttribute("content") ||
          document
            .querySelector('meta[property="og:description"]')
            ?.getAttribute("content");

        const seoTitle = document.querySelector("title")?.textContent?.trim();

        return {
          title,
          content,
          excerpt,
          publishDate,
          author,
          tags,
          categories,
          featuredImage,
          images,
          metaDescription,
          seoTitle,
        };
      });

      // Validation améliorée - un article est considéré comme complet s'il a au moins un titre et du contenu
      const hasTitle = articleData.title && articleData.title.length > 0;
      const hasContent =
        articleData.content && articleData.content.length > 100; // Au moins 100 caractères

      if (hasTitle && hasContent) {
        extractedArticles.push({
          ...articleData,
          slug: article.slug,
          url: article.url,
        });

        console.log(`✅ Article extrait: ${articleData.title}`);

        // Télécharger les images
        if (articleData.images && articleData.images.length > 0) {
          await downloadImages(articleData.images, article.slug);
        }
      } else {
        console.log(`⚠️ Article incomplet: ${article.title}`);
        console.log(
          `   - Titre: ${hasTitle ? "✅" : "❌"} (${
            articleData.title?.length || 0
          } caractères)`
        );
        console.log(
          `   - Contenu: ${hasContent ? "✅" : "❌"} (${
            articleData.content?.length || 0
          } caractères)`
        );
      }

      // Pause entre les requêtes pour éviter la surcharge
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ Erreur pour ${article.url}:`, error.message);
    }
  }

  await browser.close();

  // Sauvegarder les données
  const outputPath = path.join(process.cwd(), "extracted-blog-content.json");
  await fs.writeFile(outputPath, JSON.stringify(extractedArticles, null, 2));

  console.log(`\n🎉 Extraction terminée !`);
  console.log(`📊 ${extractedArticles.length} articles extraits`);
  console.log(`💾 Données sauvegardées dans: ${outputPath}`);

  return extractedArticles;
}

async function downloadImages(imageUrls, articleSlug) {
  const imageDir = path.join(
    process.cwd(),
    "public",
    "blog-images",
    safeSlugSegment(articleSlug)
  );
  await fs.mkdir(imageDir, { recursive: true });

  console.log(`📸 Téléchargement des images pour: ${articleSlug}`);

  for (const [index, imageUrl] of imageUrls.entries()) {
    try {
      if (!imageUrl || imageUrl.startsWith("data:")) continue;

      const filename = `image-${index + 1}.jpg`;
      const filepath = path.join(imageDir, filename);

      await downloadImage(imageUrl, filepath);
      console.log(`✅ Image téléchargée: ${filename}`);

      // Pause entre les téléchargements
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(
        `❌ Erreur téléchargement image: ${imageUrl}`,
        error.message
      );
    }
  }
}

// Fonction pour explorer le blog et obtenir les vraies URLs
async function exploreBlogAndGetArticles() {
  console.log("🔍 Exploration du blog pour obtenir les vraies URLs...");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  try {
    await page.goto("https://www.e2i-voip.com/blog", {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    await page.waitForSelector("body", { timeout: 10000 });

    const blogArticles = await page.evaluate(() => {
      const articleLinks = Array.from(
        document.querySelectorAll("a[href*='/blog/']")
      )
        .map((link) => ({
          url: link.href,
          title: link.textContent?.trim() || link.getAttribute("title") || "",
          slug: link.href.split("/blog/")[1]?.split("?")[0] || "",
        }))
        .filter(
          (article) =>
            article.url.includes("/blog/") &&
            !article.url.includes("/tag/") &&
            !article.url.includes("/author/") &&
            /^[a-zA-Z0-9-]+$/.test(article.slug)
        );

      // Dédupliquer par URL
      const uniqueArticles = [];
      const seenUrls = new Set();

      for (const article of articleLinks) {
        if (!seenUrls.has(article.url)) {
          seenUrls.add(article.url);
          uniqueArticles.push(article);
        }
      }

      return uniqueArticles;
    });

    console.log(`📊 ${blogArticles.length} articles trouvés sur le blog`);

    // Afficher les premiers articles pour vérification
    blogArticles.slice(0, 5).forEach((article, index) => {
      console.log(`${index + 1}. ${article.title} -> ${article.url}`);
    });

    await browser.close();
    return blogArticles;
  } catch (error) {
    console.error("❌ Erreur lors de l'exploration:", error.message);
    await browser.close();
    return [];
  }
}

// Fonction principale
async function main() {
  try {
    // Utiliser l'exploration automatique au lieu de la liste statique
    const realArticles = await exploreBlogAndGetArticles();

    if (realArticles.length === 0) {
      console.log("❌ Aucun article trouvé sur le blog");
      return;
    }

    // Remplacer la liste statique par les articles trouvés
    articles.length = 0; // Vider la liste
    articles.push(...realArticles); // Ajouter les vrais articles

    await extractBlogContent();
  } catch (error) {
    console.error("❌ Erreur lors de l'extraction:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { extractBlogContent, downloadImages };
