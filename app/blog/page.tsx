import { Metadata } from "next";
import Link from "next/link";
import { getHubSpotBlogPosts } from "@/lib/hubspot-blog";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { BlogTagFilter } from "@/components/blog/blog-tag-filter";
import { BlogListJsonLd } from "@/components/blog/blog-json-ld";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Blog | E2I VoIP",
  description:
    "Actualités, conseils et guides sur la téléphonie IP et les communications d'entreprise. Expertise VoIP par E2I VoIP.",
  openGraph: {
    title: "Blog | E2I VoIP",
    description:
      "Actualités, conseils et guides sur la téléphonie IP et les communications d'entreprise.",
    type: "website",
    url: "https://www.e2i-voip.com/blog",
  },
};

const POSTS_PER_PAGE = 12;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; tag?: string }>;
}) {
  const { page: pageParam, q, tag } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));

  const { posts, tags, total } = await getHubSpotBlogPosts({
    page: currentPage,
    pageSize: POSTS_PER_PAGE,
    search: q,
    tag,
  });

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <>
      <BlogListJsonLd
        posts={posts}
        title="Blog VoIP — E2I VoIP"
        description="Actualités, guides et conseils sur la téléphonie VoIP pour les entreprises."
        pageUrl="/blog"
      />

      <div className="min-h-screen bg-white">
        <main className="pt-16">
          {/* Hero Section — Monolithe 2026 */}
          <section className="py-20 bg-[#091421] monolith-grid-lines relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-primary mb-4">
                Ressources &amp; Expertise
              </p>
              <h1 className="text-5xl md:text-7xl font-black tracking-[-0.04em] leading-tight text-white mb-4">
                Blog
              </h1>
              <div className="h-2 w-32 bg-red-primary mb-6"></div>
              <p className="text-lg text-gray-400 max-w-2xl">
                Actualités, conseils et guides sur la téléphonie IP et les
                communications d&apos;entreprise
              </p>
            </div>
          </section>

          {/* Recherche + Filtres + Grille */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Barre de recherche HTML natif */}
              <form
                method="GET"
                action="/blog"
                className="flex gap-0 mb-10 max-w-xl"
                role="search"
              >
                <input
                  type="search"
                  name="q"
                  defaultValue={q || ""}
                  placeholder="Rechercher un article…"
                  aria-label="Rechercher un article"
                  className="flex-1 border border-gray-200 px-4 py-3 text-sm text-[#091421] placeholder-gray-400 focus:outline-none focus:border-red-primary bg-white rounded-none"
                />
                <button
                  type="submit"
                  className="monolith-btn bg-red-primary text-white font-black uppercase tracking-[0.2em] text-xs px-6 py-3 rounded-none"
                  aria-label="Lancer la recherche"
                >
                  <i className="lni lni-search-alt" aria-hidden="true"></i>
                </button>
              </form>

              {/* Filtres par tag */}
              <BlogTagFilter tags={tags} activeTag={tag} />

              {/* Résumé résultats */}
              {(q || tag) && (
                <p className="text-sm text-gray-500 mb-8">
                  {total} article{total !== 1 ? "s" : ""} trouvé
                  {total !== 1 ? "s" : ""}
                  {q && (
                    <>
                      {" "}
                      pour{" "}
                      <span className="font-bold text-[#091421]">
                        &laquo;{q}&raquo;
                      </span>
                    </>
                  )}
                </p>
              )}

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
                    Aucun résultat
                  </p>
                  <p className="text-gray-500 mb-6">
                    Aucun article ne correspond à votre recherche.
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
                  aria-label="Pagination du blog"
                  className="flex items-center justify-center gap-2 mt-8"
                >
                  {/* Précédent */}
                  {currentPage > 1 && (
                    <Link
                      href={{
                        pathname: "/blog",
                        query: {
                          ...(q ? { q } : {}),
                          ...(tag ? { tag } : {}),
                          page: currentPage - 1,
                        },
                      }}
                      className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 border border-gray-200 text-gray-500 hover:border-red-primary hover:text-red-primary transition-colors duration-200"
                      aria-label="Page précédente"
                    >
                      <i className="lni lni-arrow-left" aria-hidden="true"></i>
                      Préc.
                    </Link>
                  )}

                  {/* Pages */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <Link
                        key={pageNum}
                        href={{
                          pathname: "/blog",
                          query: {
                            ...(q ? { q } : {}),
                            ...(tag ? { tag } : {}),
                            page: pageNum,
                          },
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

                  {/* Suivant */}
                  {currentPage < totalPages && (
                    <Link
                      href={{
                        pathname: "/blog",
                        query: {
                          ...(q ? { q } : {}),
                          ...(tag ? { tag } : {}),
                          page: currentPage + 1,
                        },
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
