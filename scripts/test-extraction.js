const puppeteer = require("puppeteer");

async function testExtraction() {
  console.log("🧪 Test d'extraction d'un article...");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Test avec un seul article
  const testUrl = "https://www.e2i-voip.com/blog/trunk-sip-drom-guide-2025";

  try {
    console.log(`📖 Test d'extraction de: ${testUrl}`);

    await page.goto(testUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    await page.waitForSelector("body", { timeout: 10000 });

    const articleData = await page.evaluate(() => {
      // Extraction du titre
      const title =
        document.querySelector("h1")?.textContent?.trim() ||
        document.querySelector(".article-title")?.textContent?.trim() ||
        document.querySelector("title")?.textContent?.trim();

      // Extraction du contenu
      const content =
        document.querySelector(".article-content")?.innerHTML ||
        document.querySelector(".post-content")?.innerHTML ||
        document.querySelector("article")?.innerHTML ||
        document.querySelector(".content")?.innerHTML;

      // Extraction de l'extrait
      const excerpt =
        document.querySelector(".article-excerpt")?.textContent?.trim() ||
        document.querySelector(".post-excerpt")?.textContent?.trim() ||
        document.querySelector(".excerpt")?.textContent?.trim();

      // Extraction de la date
      const publishDate =
        document.querySelector(".publish-date")?.textContent?.trim() ||
        document.querySelector(".post-date")?.textContent?.trim() ||
        document.querySelector(".date")?.textContent?.trim();

      // Extraction de l'auteur
      const author =
        document.querySelector(".author")?.textContent?.trim() ||
        document.querySelector(".post-author")?.textContent?.trim() ||
        "E2I VoIP";

      // Extraction des tags
      const tags = Array.from(
        document.querySelectorAll(".tags .tag, .post-tags .tag")
      )
        .map((tag) => tag.textContent?.trim())
        .filter(Boolean);

      // Extraction des catégories
      const categories = Array.from(
        document.querySelectorAll(
          ".categories .category, .post-categories .category"
        )
      )
        .map((cat) => cat.textContent?.trim())
        .filter(Boolean);

      // Extraction de l'image de couverture
      const featuredImage =
        document.querySelector(".featured-image img")?.getAttribute("src") ||
        document.querySelector(".post-image img")?.getAttribute("src") ||
        document.querySelector("article img")?.getAttribute("src");

      // Extraction de toutes les images
      const images = Array.from(
        document.querySelectorAll(
          ".article-content img, .post-content img, article img"
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

    console.log("\n📊 Résultats de l'extraction:");
    console.log("Title:", articleData.title);
    console.log("Author:", articleData.author);
    console.log("Content length:", articleData.content?.length || 0);
    console.log("Excerpt:", articleData.excerpt);
    console.log("Tags:", articleData.tags);
    console.log("Categories:", articleData.categories);
    console.log("Featured image:", articleData.featuredImage);
    console.log("Images count:", articleData.images?.length || 0);
    console.log("Meta description:", articleData.metaDescription);
    console.log("SEO title:", articleData.seoTitle);

    if (articleData.title && articleData.content) {
      console.log("\n✅ Test réussi ! L'extraction fonctionne correctement.");
    } else {
      console.log("\n⚠️ Test partiel. Certains éléments manquent.");
    }
  } catch (error) {
    console.error(`❌ Erreur lors du test:`, error.message);
  } finally {
    await browser.close();
  }
}

// Fonction principale
async function main() {
  try {
    await testExtraction();
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { testExtraction };
