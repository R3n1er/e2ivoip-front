const { Client } = require("@hubspot/api-client");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testHubSpotBlog() {
  console.log("🔍 Test de l'API HubSpot Blog...");
  
  const apiKey = process.env.HUBSPOT_API_KEY;
  if (!apiKey) {
    console.error("❌ HUBSPOT_API_KEY manquante");
    return;
  }
  
  console.log("✅ Clé API trouvée:", apiKey.substring(0, 8) + "...");
  
  try {
    const hubspot = new Client({ accessToken: apiKey });
    
    // Test direct de l'API avec une approche plus simple
    console.log("\n📰 Test: Récupération des articles...");
    try {
      // Utiliser l'API REST directement
      const response = await fetch(`https://api.hubapi.com/cms/v3/blogs/posts?hapikey=${apiKey}&limit=10`);
      const data = await response.json();
      
      if (response.ok) {
        console.log("Articles trouvés:", data.results?.length || 0);
        if (data.results) {
          data.results.forEach(post => {
            console.log(`- Article: ${post.name} (État: ${post.state}, Slug: ${post.slug})`);
          });
        }
      } else {
        console.error("❌ Erreur API:", data);
      }
      
      if (data.results?.length === 0) {
        console.log("⚠️  Aucun article trouvé. Vérifiez:");
        console.log("   1. Que des articles sont publiés dans HubSpot");
        console.log("   2. Que l'API key a les bonnes permissions");
        console.log("   3. Que le portail contient bien des articles de blog");
      }
      
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des articles:", error.message);
      if (error.response) {
        console.error("Détails:", error.response.data);
      }
    }
    
  } catch (error) {
    console.error("❌ Erreur de connexion HubSpot:", error.message);
    if (error.response) {
      console.error("Détails:", error.response.data);
    }
  }
}

testHubSpotBlog().catch(console.error);