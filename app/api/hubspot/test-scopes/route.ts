import { NextResponse } from "next/server";

// Fonction pour tester différents scopes
async function testScopes(
  scopes: string[]
): Promise<{ scopes: string[]; success: boolean; error?: string }> {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!accessToken) {
    return { scopes, success: false, error: "Access token manquant" };
  }

  try {
    // Test 1: Récupération des articles de blog
    const blogResponse = await fetch(
      "https://api.hubapi.com/cms/v3/blogs/posts?limit=1&archived=false&state=PUBLISHED",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!blogResponse.ok) {
      const errorData = await blogResponse.json();
      return {
        scopes,
        success: false,
        error: `Blog API error: ${blogResponse.status} - ${JSON.stringify(
          errorData
        )}`,
      };
    }

    // Test 2: Récupération des blogs
    const blogsResponse = await fetch("https://api.hubapi.com/cms/v3/blogs", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!blogsResponse.ok) {
      const errorData = await blogsResponse.json();
      return {
        scopes,
        success: false,
        error: `Blogs API error: ${blogsResponse.status} - ${JSON.stringify(
          errorData
        )}`,
      };
    }

    return { scopes, success: true };
  } catch (error) {
    return {
      scopes,
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}

export async function GET() {
  try {
    // Test avec différents ensembles de scopes
    const scopeTests = [
      {
        name: "Scopes complets (avec blog)",
        scopes: [
          "content",
          "cms.blog.read",
          "cms.blog_posts.read",
          "cms.domains.read",
          "cms.functions.read",
          "cms.knowledge_base.articles.read",
          "cms.knowledge_base.settings.read",
          "cms.membership.access_groups.read",
          "cms.performance.read",
          "oauth",
        ],
      },
      {
        name: "Scopes actuels (sans blog)",
        scopes: [
          "content",
          "cms.domains.read",
          "cms.functions.read",
          "cms.knowledge_base.articles.read",
          "cms.knowledge_base.settings.read",
          "cms.membership.access_groups.read",
          "cms.performance.read",
          "oauth",
        ],
      },
      {
        name: "Scopes minimaux",
        scopes: ["content", "oauth"],
      },
    ];

    const results = [];

    for (const test of scopeTests) {
      const result = await testScopes(test.scopes);
      results.push({
        name: test.name,
        ...result,
      });
    }

    return NextResponse.json({
      tests: results,
      recommendations: results.map((r) => ({
        name: r.name,
        recommendation: r.success ? "✅ Fonctionne" : "❌ Ne fonctionne pas",
        error: r.error,
      })),
    });
  } catch (error) {
    console.error("Erreur lors du test des scopes:", error);

    return NextResponse.json(
      {
        error: "Erreur lors du test des scopes",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}
