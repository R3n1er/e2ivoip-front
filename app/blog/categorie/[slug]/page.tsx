import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getHubSpotBlogPosts,
  getHubSpotBlogTags,
} from "@/lib/hubspot-blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { BlogTagFilter } from "@/components/blog/blog-tag-filter";
import { BlogListJsonLd } from "@/components/blog/blog-json-ld";
import Link from "next/link";

export const revalidate = 600;

const POSTS_PER_PAGE = 12;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

// ---------------------------------------------------------------------------
// generateStaticParams — pre-render all tag pages
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  try {
    const tags = await getHubSpotBlogTags();
    return tags.map((tag) => ({ slug: tag.slug }));
  } catch (error) {
    console.warn("generateStaticParams blog/categorie/[slug] error:", error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// generateMetadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getHubSpotBlogTags();
  const tag = tags.find((t) => t.slug === slug);
  const tagName = tag?.name || decodeURIComponent(slug);

  return {
    title: `${tagName} — Blog | E2I VoIP`,
    description: `Découvrez tous nos articles sur ${tagName} dans le domaine de la téléphonie IP et des communications d'entreprise.`,
    alternates: {
      canonical: `https://www.e2i-voip.com/blog/categorie/${slug}`,
    },
    openGraph: {
      title: `${tagName} — Blog | E2I VoIP`,
      description: `Découvrez tous nos articles sur ${tagName} dans le domaine de la téléphonie IP et des communications d'entreprise.`,
      type: "website",
      url: `https://www.e2i-voip.com/blog/categorie/${slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));

  // Resolve tag name from slug
  const allTags = await getHubSpotBlogTags();
  const activeTag = allTags.find((t) => t.slug === slug);

  if (!activeTag) {
    notFound();
  }

  const { posts, tags, total } = await getHubSpotBlogPosts({
    page: currentPage,
    pageSize: POSTS_PER_PAGE,
    tag: activeTag.id,
  });

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <>
      <BlogListJsonLd
        posts={posts}
        title={`${activeTag.name} — Blog E2I VoIP`}
        description={`Articles sur ${activeTag.name} — téléphonie IP et communications d'entreprise.`}
        pageUrl={`/blog/categorie/${slug}`}
      />

      <div className="min-h-screen bg-white">
        <main className="pt-16">
          {/* Hero Section — Monolithe 2026 */}
          <section className="py-20 bg-[#091421] monolith-grid-lines relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-primary mb-4">
                Catégorie
              </p>
              <h1 className="text-5xl md:text-7xl font-black tracking-[-0.04em] leading-tight text-white mb-4">
                {activeTag.name}
              </h1>
              <div className="h-2 w-32 bg-red-primary mb-6"></div>
              <p className="text-lg text-gray-400">
                {total} article{total !== 1 ? "s" : ""} dans cette catégorie
              </p>
            </div>
          </section>

          {/* Contenu */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Filtres par tag */}
              <BlogTagFilter tags={tags} activeTag={slug} />

              {/* Grille articles */}
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {posts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">
                    Aucun article
                  </p>
                  <p className="text-gray-500 mb-6">
                    Aucun article trouvé dans la catégorie &laquo;{activeTag.name}&raquo;.
                  </p>
                  <Link
                    href="/blog"
                    className="monolith-btn bg-red-primary text-white font-black uppercase tracking-[0.2em] text-xs px-8 py-4 rounded-none inline-block"
                  >
                    Voir tous les articles
                  </Link>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Pagination de la catégorie"
                  className="flex items-center justify-center gap-2 mt-8"
                >
                  {currentPage > 1 && (
                    <Link
                      href={{
                        pathname: `/blog/categorie/${slug}`,
                        query: { page: currentPage - 1 },
                      }}
                      className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border border-gray-200 text-gray-500 hover:border-red-primary hover:text-red-primary transition-colors duration-200"
                      aria-label="Page précédente"
                    >
                      <i className="lni lni-arrow-left" aria-hidden="true"></i>
                      Préc.
                    </Link>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <Link
                        key={pageNum}
                        href={{
                          pathname: `/blog/categorie/${slug}`,
                          query: { page: pageNum },
                        }}
                        className={[
                          "text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border transition-colors duration-200",
                          pageNum === currentPage
                            ? "border-red-primary text-red-primary"
                            : "border-gray-200 text-gray-500 hover:border-red-primary hover:text-red-primary",
                        ].join(" ")}
                        aria-label={`Page ${pageNum}`}
                        aria-current={
                          pageNum === currentPage ? "page" : undefined
                        }
                      >
                        {pageNum}
                      </Link>
                    )
                  )}

                  {currentPage < totalPages && (
                    <Link
                      href={{
                        pathname: `/blog/categorie/${slug}`,
                        query: { page: currentPage + 1 },
                      }}
                      className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border border-gray-200 text-gray-500 hover:border-red-primary hover:text-red-primary transition-colors duration-200"
                      aria-label="Page suivante"
                    >
                      Suiv.
                      <i className="lni lni-arrow-right" aria-hidden="true"></i>
                    </Link>
                  )}
                </nav>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
