import type { BlogPost } from "./hubspot-blog";

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Guide complet de la téléphonie IP pour les entreprises",
    excerpt: "Découvrez comment la téléphonie IP peut transformer vos communications d'entreprise avec des économies substantielles et des fonctionnalités avancées.",
    content: "<p>La téléphonie IP révolutionne les communications d'entreprise...</p>",
    publishDate: "2024-12-01T10:00:00Z",
    modifiedDate: "2024-12-01T10:00:00Z",
    author: "E2I VoIP",
    authorId: "e2i-voip",
    tags: ["téléphonie-ip", "entreprise", "guide"],
    categories: ["Guides"],
    slug: "guide-telephonie-ip-entreprises",
    url: "/blog/guide-telephonie-ip-entreprises",
    featuredImage: "/images/blog/telephonie-ip-guide.jpg",
    metaDescription: "Guide complet pour comprendre et implémenter la téléphonie IP en entreprise",
    seoTitle: "Guide Téléphonie IP Entreprise | E2I VoIP"
  },
  {
    id: "2",
    title: "3CX vs solutions traditionnelles : comparatif détaillé",
    excerpt: "Analyse comparative entre 3CX et les solutions de téléphonie traditionnelles pour vous aider à faire le bon choix.",
    content: "<p>3CX offre de nombreux avantages par rapport aux solutions traditionnelles...</p>",
    publishDate: "2024-11-28T14:30:00Z",
    modifiedDate: "2024-11-28T14:30:00Z",
    author: "E2I VoIP",
    authorId: "e2i-voip",
    tags: ["3cx", "comparatif", "pbx"],
    categories: ["Comparatifs"],
    slug: "3cx-vs-solutions-traditionnelles",
    url: "/blog/3cx-vs-solutions-traditionnelles",
    featuredImage: "/images/blog/3cx-comparison.jpg",
    metaDescription: "Comparatif détaillé entre 3CX et les solutions de téléphonie traditionnelles",
    seoTitle: "3CX vs Solutions Traditionnelles | Comparatif E2I VoIP"
  },
  {
    id: "3",
    title: "Optimiser la qualité audio de vos appels VoIP",
    excerpt: "Conseils pratiques pour améliorer la qualité audio de vos communications VoIP et éviter les problèmes courants.",
    content: "<p>La qualité audio est cruciale pour des communications professionnelles efficaces...</p>",
    publishDate: "2024-11-25T09:15:00Z",
    modifiedDate: "2024-11-25T09:15:00Z",
    author: "E2I VoIP",
    authorId: "e2i-voip",
    tags: ["voip", "qualité-audio", "optimisation"],
    categories: ["Conseils"],
    slug: "optimiser-qualite-audio-voip",
    url: "/blog/optimiser-qualite-audio-voip",
    featuredImage: "/images/blog/audio-quality.jpg",
    metaDescription: "Guide pour optimiser la qualité audio de vos communications VoIP",
    seoTitle: "Optimiser Qualité Audio VoIP | Conseils E2I VoIP"
  },
  {
    id: "4",
    title: "Sécurité en téléphonie IP : bonnes pratiques",
    excerpt: "Les mesures de sécurité essentielles pour protéger votre infrastructure de téléphonie IP contre les menaces.",
    content: "<p>La sécurité en téléphonie IP nécessite une approche multicouche...</p>",
    publishDate: "2024-11-22T16:45:00Z",
    modifiedDate: "2024-11-22T16:45:00Z",
    author: "E2I VoIP",
    authorId: "e2i-voip",
    tags: ["sécurité", "voip", "bonnes-pratiques"],
    categories: ["Sécurité"],
    slug: "securite-telephonie-ip-bonnes-pratiques",
    url: "/blog/securite-telephonie-ip-bonnes-pratiques",
    featuredImage: "/images/blog/voip-security.jpg",
    metaDescription: "Bonnes pratiques de sécurité pour votre infrastructure de téléphonie IP",
    seoTitle: "Sécurité Téléphonie IP | Bonnes Pratiques E2I VoIP"
  },
  {
    id: "5",
    title: "Migration vers la téléphonie IP : étapes clés",
    excerpt: "Planifiez votre migration vers la téléphonie IP avec notre guide étape par étape pour une transition réussie.",
    content: "<p>La migration vers la téléphonie IP nécessite une planification minutieuse...</p>",
    publishDate: "2024-11-20T11:20:00Z",
    modifiedDate: "2024-11-20T11:20:00Z",
    author: "E2I VoIP",
    authorId: "e2i-voip",
    tags: ["migration", "téléphonie-ip", "planification"],
    categories: ["Guides"],
    slug: "migration-telephonie-ip-etapes-cles",
    url: "/blog/migration-telephonie-ip-etapes-cles",
    featuredImage: "/images/blog/migration-voip.jpg",
    metaDescription: "Guide de migration vers la téléphonie IP avec les étapes clés",
    seoTitle: "Migration Téléphonie IP | Guide E2I VoIP"
  },
  {
    id: "6",
    title: "Trunk SIP : avantages et mise en œuvre",
    excerpt: "Découvrez les avantages des Trunk SIP et comment les implémenter efficacement dans votre infrastructure.",
    content: "<p>Les Trunk SIP offrent une flexibilité et des économies importantes...</p>",
    publishDate: "2024-11-18T13:10:00Z",
    modifiedDate: "2024-11-18T13:10:00Z",
    author: "E2I VoIP",
    authorId: "e2i-voip",
    tags: ["trunk-sip", "infrastructure", "économies"],
    categories: ["Techniques"],
    slug: "trunk-sip-avantages-mise-en-oeuvre",
    url: "/blog/trunk-sip-avantages-mise-en-oeuvre",
    featuredImage: "/images/blog/trunk-sip.jpg",
    metaDescription: "Avantages des Trunk SIP et guide de mise en œuvre",
    seoTitle: "Trunk SIP Avantages | Guide E2I VoIP"
  }
];

export function getMockBlogPosts(limit: number = 100): BlogPost[] {
  return mockBlogPosts.slice(0, limit);
}

export function getMockBlogPost(slug: string): BlogPost | null {
  return mockBlogPosts.find(post => post.slug === slug) || null;
}