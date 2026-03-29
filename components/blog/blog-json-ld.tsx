import type { BlogPost } from "@/lib/hubspot-blog";

const BASE_URL = "https://www.e2i-voip.com";

// ---------------------------------------------------------------------------
// BlogPostJsonLd — schema BlogPosting
// ---------------------------------------------------------------------------

interface BlogPostJsonLdProps {
  post: BlogPost;
}

export function BlogPostJsonLd({ post }: BlogPostJsonLdProps) {
  // Security: JSON.stringify escapes all special characters.
  // Content comes from our own HubSpot API (server-side only, no user input).
  // This pattern is the standard Next.js recommendation for JSON-LD injection.
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    image: post.featuredImage ? [post.featuredImage] : undefined,
    datePublished: post.publishDate,
    dateModified: post.modifiedDate || post.publishDate,
    author: {
      "@type": "Person",
      name: post.author || "E2I VoIP",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "E2I VoIP",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    url: `${BASE_URL}/blog/${post.slug}`,
  };

  // eslint-disable-next-line react/no-danger -- Safe: server-side structured data only, JSON.stringify escapes all input
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ---------------------------------------------------------------------------
// BlogListJsonLd — schema CollectionPage + ItemList
// ---------------------------------------------------------------------------

interface BlogListJsonLdProps {
  posts: BlogPost[];
  title?: string;
  description?: string;
  pageUrl?: string;
}

export function BlogListJsonLd({
  posts,
  title = "Blog VoIP — E2I VoIP",
  description = "Actualités, guides et conseils sur la téléphonie VoIP pour les entreprises.",
  pageUrl = "/blog",
}: BlogListJsonLdProps) {
  // Security: JSON.stringify escapes all special characters.
  // Content comes from our own HubSpot API (server-side only, no user input).
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${BASE_URL}${pageUrl}`,
    publisher: {
      "@type": "Organization",
      name: "E2I VoIP",
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  // eslint-disable-next-line react/no-danger -- Safe: server-side structured data only, JSON.stringify escapes all input
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
