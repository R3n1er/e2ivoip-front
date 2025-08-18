const fs = require("fs");

// Configuration
const STRAPI_URL = "http://localhost:1337";
const STRAPI_TOKEN = "temp_token_for_import_123456789";

async function importArticles() {
  try {
    console.log("🚀 Début de l'import des articles dans Strapi...");
    
    // Lire les articles extraits
    const extractedData = fs.readFileSync("extracted-blog-content.json", "utf8");
    const articles = JSON.parse(extractedData);
    
    console.log(`📖 ${articles.length} articles trouvés pour l'import`);
    
    // Créer quelques articles de test
    const testArticles = articles.slice(0, 3);
    
    for (const article of testArticles) {
      console.log(`📝 Préparation de: ${article.title}`);
      
      const strapiData = {
        data: {
          title: article.title,
          slug: article.slug,
          content: article.content || "",
          excerpt: article.excerpt || "",
          publishDate: new Date().toISOString(),
          author: article.author || "E2I VoIP",
          tags: article.tags || [],
          categories: article.categories || [],
          metaDescription: article.metaDescription || "",
          seoTitle: article.seoTitle || article.title,
          status: "published",
          originalUrl: article.url,
          readingTime: Math.ceil((article.content?.length || 0) / 200),
        },
      };
      
      console.log(`✅ Article préparé: ${article.title}`);
      console.log(`   - Contenu: ${strapiData.data.content.length} caractères`);
      console.log(`   - Slug: ${strapiData.data.slug}`);
    }
    
    console.log("🎉 Préparation terminée !");
    console.log("ℹ️  Pour l'import réel, Strapi doit être démarré avec un token API valide");
    
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }
}

importArticles();