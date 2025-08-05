"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogPostsGrid } from "@/components/blog/blog-posts-grid";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { searchBlogPosts } from "@/lib/algolia-blog";
import type { BlogPost } from "@/lib/hubspot-blog";
import { getMockBlogPosts } from "@/lib/mock-blog-data";

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
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableAuthors, setAvailableAuthors] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const handleSearch = async (filters: BlogFilters, page: number = 1) => {
    setLoading(true);
    try {
      // Préparer les filtres pour Algolia
      const algoliaFilters: any = {};
      if (filters.author) algoliaFilters.author = filters.author;
      if (filters.year) algoliaFilters.year = filters.year;
      if (filters.tags.length > 0) algoliaFilters.tags = filters.tags;

      // Effectuer la recherche avec pagination
      let results;
      try {
        results = await searchBlogPosts(filters.query, algoliaFilters, page);
        // Si Algolia ne retourne aucun résultat, utiliser les données de test
        if (!results.hits || results.hits.length === 0) {
          throw new Error("Aucun résultat Algolia");
        }
      } catch (algoliaError) {
        console.warn("Algolia indisponible, utilisation des données de test:", (algoliaError as Error).message);
        // Utiliser les données de test
        const mockPosts = getMockBlogPosts();
        results = {
          hits: mockPosts,
          nbHits: mockPosts.length,
          facets: {
            author: { "E2I VoIP": mockPosts.length },
            publishYear: { "2024": mockPosts.length },
            tags: mockPosts.reduce((acc, post) => {
              post.tags.forEach(tag => {
                acc[tag] = (acc[tag] || 0) + 1;
              });
              return acc;
            }, {} as Record<string, number>)
          }
        };
      }

      // Traiter les résultats
      const blogPosts = results.hits.map((hit: any) => ({
        id: hit.objectID || hit.id,
        title: hit.title,
        excerpt: hit.excerpt,
        content: hit.content,
        publishDate: hit.publishDate,
        modifiedDate: hit.modifiedDate,
        author: hit.author,
        authorId: hit.authorId,
        tags: hit.tags || [],
        categories: hit.categories || [],
        slug: hit.slug,
        url: hit.url,
        featuredImage: hit.featuredImage,
        metaDescription: hit.metaDescription,
        seoTitle: hit.seoTitle,
      }));

      // Appliquer le tri
      let sortedPosts = [...blogPosts];
      if (filters.sortBy === "newest") {
        sortedPosts.sort(
          (a, b) =>
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
        );
      } else if (filters.sortBy === "oldest") {
        sortedPosts.sort(
          (a, b) =>
            new Date(a.publishDate).getTime() -
            new Date(b.publishDate).getTime()
        );
      }
      // Pour "relevance", Algolia gère déjà le tri par pertinence

      setPosts(sortedPosts);
      setTotalResults(results.nbHits || 0);
      setCurrentPage(page);

      // Extraire les facettes pour les filtres disponibles
      if (results.facets) {
        if (results.facets.author) {
          setAvailableAuthors(Object.keys(results.facets.author));
        }
        if (results.facets.publishYear) {
          setAvailableYears(
            Object.keys(results.facets.publishYear).map(Number)
          );
        }
        if (results.facets.tags) {
          setAvailableTags(Object.keys(results.facets.tags));
        }
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
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
      <Header />

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

      <Footer />
    </div>
  );
}
