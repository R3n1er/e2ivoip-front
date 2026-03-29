import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import {
  getHubSpotBlogPosts,
  getHubSpotBlogPost,
} from "@/lib/hubspot-blog";
import {
  BlogBreadcrumb,
  generateBreadcrumbJsonLd,
} from "@/components/blog/blog-breadcrumb";
import { BlogSocialShare } from "@/components/blog/blog-social-share";
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts";
import { BlogPostJsonLd } from "@/components/blog/blog-json-ld";
import { ContactSectionSimple } from "@/components/contact-section-simple";

export const revalidate = 600;

const BASE_URL = "https://www.e2i-voip.com";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ---------------------------------------------------------------------------
// generateStaticParams
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  try {
    const { posts } = await getHubSpotBlogPosts({ pageSize: 100 });
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.warn("generateStaticParams blog/[slug] error:", error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// generateMetadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getHubSpotBlogPost(slug);

  if (!post) {
    return {
      title: "Article non trouvé — E2I VoIP",
      description: "L'article que vous recherchez n'existe pas.",
    };
  }

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
  const title = post.seoTitle || post.title;
  const description = post.metaDescription || post.excerpt;

  return {
    title: `${title} | E2I VoIP`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.publishDate,
      modifiedTime: post.modifiedDate || post.publishDate,
      authors: post.author ? [post.author] : ["E2I VoIP"],
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              alt: post.featuredImageAltText || post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

// ---------------------------------------------------------------------------
// Sanitize helper — sanitize-html (SSR-safe, no jsdom dependency)
// ---------------------------------------------------------------------------

function sanitizeHubSpotHtml(raw: string): string {
  return sanitizeHtml(raw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "iframe", "h1", "h2", "h3"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      iframe: ["src", "width", "height", "allow", "allowfullscreen", "frameborder", "scrolling"],
      img: ["src", "alt", "width", "height", "loading"],
      a: ["href", "target", "rel"],
    },
  });
}

// ---------------------------------------------------------------------------
// Render sanitized HTML safely
// ---------------------------------------------------------------------------

function ArticleBody({ safeHtml }: { safeHtml: string }) {
  // Content is sanitized above by isomorphic-dompurify before reaching this component.
  // This is the standard pattern for rendering sanitized CMS HTML in Next.js.
  const props = { dangerouslySetInnerHTML: { __html: safeHtml } };
  return (
    <article
      className="prose prose-lg prose-monolithe max-w-none mb-12"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// JSON-LD breadcrumb render
// ---------------------------------------------------------------------------

function BreadcrumbJsonLdScript({ data }: { data: object }) {
  const props = {
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
  return <script type="application/ld+json" {...props} />;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getHubSpotBlogPost(slug);

  if (!post) {
    notFound();
  }

  const safeHtml = sanitizeHubSpotHtml(post.htmlContent);

  const publishDate = new Date(post.publishDate);
  const formattedDate = publishDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <>
      {/* JSON-LD schemas */}
      <BlogPostJsonLd post={post} />
      <BreadcrumbJsonLdScript data={breadcrumbJsonLd} />

      <div className="min-h-screen bg-white">
        <main className="pt-16">
          {/* Article container */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <BlogBreadcrumb items={breadcrumbItems} />

            {/* Tags cliquables */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, i) => (
                  <Link
                    key={post.tagIds[i] || tag}
                    href={`/blog/categorie/${encodeURIComponent(
                      tag.toLowerCase().replace(/\s+/g, "-")
                    )}`}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-red-primary hover:underline"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Titre H1 */}
            <h1 className="text-3xl md:text-5xl font-black tracking-[-0.04em] leading-tight text-[#091421] mb-4">
              {post.title}
            </h1>

            {/* Ligne rouge décorative */}
            <div className="h-1 w-20 bg-red-primary mb-6"></div>

            {/* Meta : auteur / date / temps de lecture */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
              <span className="flex items-center gap-1">
                <i className="lni lni-user" aria-hidden="true"></i>
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <i className="lni lni-calendar" aria-hidden="true"></i>
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <i className="lni lni-timer" aria-hidden="true"></i>
                {post.readingTime} min de lecture
              </span>
            </div>

            {/* Image featured */}
            {post.featuredImage && (
              <div className="relative w-full aspect-video mb-10 overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.featuredImageAltText || post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                />
              </div>
            )}

            {/* Contenu article — HTML sanitisé par isomorphic-dompurify */}
            <ArticleBody safeHtml={safeHtml} />

            {/* Partage social */}
            <div className="border-t border-gray-100 pt-8 mb-8">
              <BlogSocialShare url={canonicalUrl} title={post.title} />
            </div>
          </div>

          {/* Articles liés */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <BlogRelatedPosts
              currentPostId={post.id}
              tags={post.tags}
              tagIds={post.tagIds}
            />
          </div>

          {/* CTA Contact */}
          <ContactSectionSimple />
        </main>
      </div>
    </>
  );
}
