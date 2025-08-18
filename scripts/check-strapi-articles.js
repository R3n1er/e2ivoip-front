const fs = require("fs/promises");

async function checkStrapiArticles() {
  try {
    console.log("🔍 Vérification des articles dans Strapi...");
    
    // Lire les articles extraits
    const extractedData = await fs.readFile("extracted-blog-content.json", "utf8");
    const articles = JSON.parse(extractedData);
    
    console.log(`📊 ${articles.length} articles extraits trouvés`);
    
    // Afficher un résumé des articles
    articles.forEach((article, index) => {
      console.log(`${index + 1}. "${article.title}"`);
      console.log(`   - Slug: ${article.slug}`);
      console.log(`   - Contenu: ${article.content ? article.content.length : 0} caractères`);
      console.log(`   - Image: ${article.featuredImage ? 'Oui' : 'Non'}`);
      console.log(`   - Date: ${article.publishDate}`);
      console.log("");
    });
    
    console.log("✅ Vérification terminée");
    
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }
}

checkStrapiArticles();