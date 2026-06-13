import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt généré par Next (`app/robots.ts`) — remplace l'ancien
 * `public/robots.txt` hérité de HubSpot (qui pointait vers des URL mortes).
 *
 * Stratégie GEO/AEO : on AUTORISE explicitement les crawlers IA pour être
 * cités par ChatGPT, Perplexity, Claude et Google AI Overviews. Pour les
 * autoriser tout en gardant le contrôle, on les déclare en groupes distincts.
 *
 * Pages non indexables : /admin, /offline, et les routes techniques /api.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin/", "/offline", "/api/"];

  // Crawlers IA explicitement autorisés (citation par les agents).
  const aiBots = [
    "GPTBot", // OpenAI / ChatGPT
    "OAI-SearchBot", // ChatGPT search
    "ChatGPT-User", // ChatGPT navigation
    "PerplexityBot", // Perplexity
    "Perplexity-User",
    "ClaudeBot", // Anthropic / Claude
    "anthropic-ai",
    "Claude-Web",
    "Google-Extended", // Google AI (Gemini / AI Overviews)
    "Applebot-Extended", // Apple Intelligence
    "CCBot", // Common Crawl (source d'entraînement)
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
