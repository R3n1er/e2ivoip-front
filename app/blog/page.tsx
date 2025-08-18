"use client";

import { useState, useEffect } from "react";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogPostsGrid } from "@/components/blog/blog-posts-grid";
import { BlogPagination } from "@/components/blog/blog-pagination";

import type { BlogPost } from "@/lib/contentful-blog";

interface BlogFilters {
  query: string;
  author: string;
  year: number | null;
  tags: string[];
  sortBy: "newest" | "oldest" | "relevance";
}

const POSTS_PER_PAGE = 12;

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true); // Commencer en mode chargement
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableAuthors, setAvailableAuthors] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (filters: BlogFilters, page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("pageSize", String(POSTS_PER_PAGE));
      if (filters.query) params.set("q", filters.query);

      const res = await fetch(`/api/blog/list?${params.toString()}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Erreur API: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const blogPosts: BlogPost[] = (data.posts || []).map(
        (p: Record<string, unknown>) => ({
          id: p.id as string,
          title: p.title as string,
          excerpt: p.excerpt as string,
          content: p.content,
          publishDate: p.publishDate as string,
          author: p.author as string,
          tags: (p.tags as string[]) || [],
          slug: p.slug as string,
          featuredImage: p.featuredImage, // Utiliser featuredImage directement
          featuredImageUrl: p.featuredImage, // Garder pour compatibilité
          metaDescription: p.metaDescription as string,
          seoTitle: p.seoTitle as string,
        })
      );

      // Appliquer le tri
      const sortedPosts = [...blogPosts];
      if (filters.sortBy === "newest") {
        sortedPosts.sort(
          (a, b) =>
            new Date(b.publishDate || "").getTime() -
            new Date(a.publishDate || "").getTime()
        );
      } else if (filters.sortBy === "oldest") {
        sortedPosts.sort(
          (a, b) =>
            new Date(a.publishDate || "").getTime() -
            new Date(b.publishDate || "").getTime()
        );
      }

      setPosts(sortedPosts);
      setTotalResults(data.total || blogPosts.length);
      setCurrentPage(page);

      // Extraire les facettes pour les filtres disponibles
      if (data.metadata) {
        setAvailableAuthors(data.metadata.authors || []);
        setAvailableYears(data.metadata.years || []);
        setAvailableTags(data.metadata.tags || []);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      setError(error instanceof Error ? error.message : "Erreur inconnue");
      setPosts([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    // Récupérer les filtres actuels et changer de page
    const currentFilters = {
      query: "",
      author: "",
      year: null,
      tags: [],
      sortBy: "newest" as const,
    };
    handleSearch(currentFilters, page);
  };

  // Recherche initiale au chargement
  useEffect(() => {
    handleSearch({
      query: "",
      author: "",
      year: null,
      tags: [],
      sortBy: "newest",
    });
  }, []);

  const totalPages = Math.ceil(totalResults / POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">
        {/* Hero Section - Charte PRD */}
        <section className="py-16 bg-gradient-to-r from-red-primary to-blue-marine relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                <span className="text-white">Blog</span> E2I VoIP
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Actualités, conseils et guides sur la téléphonie IP et les
                communications d&apos;entreprise
              </p>
              <div className="mt-8 flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Expertise téléphonie IP</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Conseils techniques</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-sm">Actualités secteur</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section de recherche et articles */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Composant de recherche */}
            <div className="mb-12">
              <BlogSearch
                onSearch={(filters) => {
                  setCurrentPage(1);
                  handleSearch(filters, 1);
                }}
                availableAuthors={availableAuthors}
                availableYears={availableYears}
                availableTags={availableTags}
                totalResults={totalResults}
                isLoading={loading}
              />
            </div>

            {/* Affichage des erreurs */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">
                  <strong>Erreur :</strong> {error}
                </p>
                <button
                  onClick={() =>
                    handleSearch(
                      {
                        query: "",
                        author: "",
                        year: null,
                        tags: [],
                        sortBy: "newest",
                      },
                      1
                    )
                  }
                  className="mt-2 text-red-600 hover:text-red-800 underline"
                >
                  Réessayer
                </button>
              </div>
            )}

            {/* Grille d'articles */}
            <BlogPostsGrid
              posts={posts}
              loading={loading}
              emptyMessage="Aucun article ne correspond à votre recherche."
            />

            {/* Pagination */}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          </div>
        </section>

        {/* Section CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Besoin d&apos;expertise en téléphonie IP ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Nos experts sont là pour vous accompagner dans vos projets de
              communication d&apos;entreprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/devis-en-ligne"
                className="inline-flex items-center px-8 py-3 bg-red-primary hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Demander un devis
              </a>
              <a
                href="/nos-services"
                className="inline-flex items-center px-8 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              >
                Découvrir nos services
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
