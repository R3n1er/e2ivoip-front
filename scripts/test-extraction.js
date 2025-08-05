const puppeteer = require("puppeteer");

async function exploreBlog() {
  console.log("🔍 Exploration du blog E2I VoIP...");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    console.log("📖 Accès à la page principale du blog...");

    await page.goto("https://www.e2i-voip.com/blog", {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    await page.waitForSelector("body", { timeout: 10000 });

    // Explorer la structure de la page
    const pageInfo = await page.evaluate(() => {
      // Chercher les liens d'articles
      const articleLinks = Array.from(
        document.querySelectorAll("a[href*='/blog/']")
      ).map((link) => ({
        href: link.href,
        text: link.textContent?.trim(),
        title: link.getAttribute("title"),
      }));

      // Chercher les titres d'articles
      const articleTitles = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      )
        .map((el) => el.textContent?.trim())
        .filter(Boolean);

      // Chercher les images
      const images = Array.from(document.querySelectorAll("img")).map(
        (img) => ({
          src: img.src,
          alt: img.alt,
          title: img.title,
        })
      );

      return {
        title: document.title,
        url: window.location.href,
        articleLinks,
        articleTitles,
        images,
        bodyText: document.body.textContent?.substring(0, 500),
      };
    });

    console.log("\n📊 Informations de la page:");
    console.log("Titre:", pageInfo.title);
    console.log("URL:", pageInfo.url);
    console.log("Liens d'articles trouvés:", pageInfo.articleLinks.length);
    console.log("Titres trouvés:", pageInfo.articleTitles.length);
    console.log("Images trouvées:", pageInfo.images.length);

    if (pageInfo.articleLinks.length > 0) {
      console.log("\n🔗 Liens d'articles détectés:");
      pageInfo.articleLinks.slice(0, 5).forEach((link, index) => {
        console.log(`${index + 1}. ${link.text} -> ${link.href}`);
      });
    }

    if (pageInfo.articleTitles.length > 0) {
      console.log("\n📝 Titres détectés:");
      pageInfo.articleTitles.slice(0, 5).forEach((title, index) => {
        console.log(`${index + 1}. ${title}`);
      });
    }

    // Tester le premier article trouvé
    if (pageInfo.articleLinks.length > 0) {
      const firstArticle = pageInfo.articleLinks[0];
      console.log(`\n🧪 Test d'extraction de: ${firstArticle.href}`);

      await page.goto(firstArticle.href, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

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
    }
  } catch (error) {
    console.error(`❌ Erreur lors de l'exploration:`, error.message);
  } finally {
    await browser.close();
  }
}

// Fonction principale
async function main() {
  try {
    await exploreBlog();
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { exploreBlog };
