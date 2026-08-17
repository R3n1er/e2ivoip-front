"use client";

import { useCallback, useState } from "react";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogPostsGrid } from "@/components/blog/blog-posts-grid";
import { BlogPagination } from "@/components/blog/blog-pagination";
import type { PublicBlogPost as BlogPost } from "@/lib/blog-types";

interface BlogFilters {
  query: string;
  author: string;
  year: number | null;
  tags: string[];
  sortBy: "newest" | "oldest" | "relevance";
}

interface BlogBrowserProps {
  /** Articles rendus par le serveur — affichés tant qu'aucune recherche n'est lancée. */
  initialPosts: BlogPost[];
  initialTotal: number;
  pageSize: number;
  availableAuthors: string[];
  availableYears: number[];
  availableTags: string[];
}

const EMPTY_FILTERS: BlogFilters = {
  query: "",
  author: "",
  year: null,
  tags: [],
  sortBy: "newest",
};

/**
 * Couche interactive du blog (recherche, tri, pagination).
 *
 * Le listing initial est rendu côté serveur puis passé en props : le HTML
 * contient donc déjà les articles et leurs liens, lisibles sans exécution JS.
 * Ce composant ne prend le relais qu'à la première interaction de l'utilisateur.
 */
export function BlogBrowser({
  initialPosts,
  initialTotal,
  pageSize,
  availableAuthors,
  availableYears,
  availableTags,
}: BlogBrowserProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<BlogFilters>(EMPTY_FILTERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(
    async (nextFilters: BlogFilters, page: number) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
        });
        if (nextFilters.query) params.set("q", nextFilters.query);

        const res = await fetch(`/api/blog/list?${params}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const received: BlogPost[] = data.posts ?? [];
        const sorted =
          nextFilters.sortBy === "oldest"
            ? [...received].sort(
                (a, b) =>
                  new Date(a.publishDate || "").getTime() -
                  new Date(b.publishDate || "").getTime()
              )
            : [...received].sort(
                (a, b) =>
                  new Date(b.publishDate || "").getTime() -
                  new Date(a.publishDate || "").getTime()
              );

        setPosts(sorted);
        setTotal(data.total ?? sorted.length);
        setCurrentPage(page);
        setFilters(nextFilters);
      } catch (cause) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Recherche blog impossible:", cause);
        }
        setError(
          "La recherche est momentanément indisponible. Réessayez dans quelques instants."
        );
      } finally {
        setLoading(false);
      }
    },
    [pageSize]
  );

  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <div className="mb-12">
        <BlogSearch
          onSearch={(nextFilters) => fetchPosts(nextFilters, 1)}
          availableAuthors={availableAuthors}
          availableYears={availableYears}
          availableTags={availableTags}
          totalResults={total}
          isLoading={loading}
        />
      </div>

      {error && (
        <div
          role="alert"
          className="mb-8 rounded-lg border border-red-primary/30 bg-red-primary/5 p-4"
          data-testid="blog-search-error"
        >
          <p className="text-red-primary">{error}</p>
          <button
            type="button"
            onClick={() => fetchPosts(filters, currentPage)}
            className="mt-2 font-semibold text-red-primary underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-primary focus-visible:ring-offset-2"
          >
            Réessayer
          </button>
        </div>
      )}

      <BlogPostsGrid
        posts={posts}
        loading={loading}
        emptyMessage="Aucun article ne correspond à votre recherche."
      />

      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => fetchPosts(filters, page)}
        isLoading={loading}
      />
    </>
  );
}
