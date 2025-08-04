import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogPostsGrid } from "@/components/blog/blog-posts-grid";
import type { BlogPost } from "@/lib/hubspot-blog";

// Mock des services
vi.mock("@/lib/algolia-blog", () => ({
  searchBlogPosts: vi.fn(),
  syncHubSpotToAlgolia: vi.fn(),
  indexBlogPostsToAlgolia: vi.fn(),
}));

vi.mock("@/lib/hubspot-blog", () => ({
  getHubSpotBlogPosts: vi.fn(),
  getHubSpotBlogPost: vi.fn(),
}));

vi.mock("@/components/hubspot-tracking", () => ({
  useHubSpot: () => ({
    trackEvent: vi.fn(),
    identifyUser: vi.fn(),
    trackPageView: vi.fn(),
  }),
}));

// Mock de la fonction cn
vi.mock("@/lib/utils", () => ({
  cn: (...inputs: (string | undefined | null)[]) =>
    inputs.filter(Boolean).join(" "),
}));

// Mock Next.js
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => <img src={src} alt={alt} {...props} />,
}));

describe("Blog HubSpot + Algolia Integration", () => {
  const mockBlogPost: BlogPost = {
    id: "test-post-1",
    title: "Test Article Title",
    excerpt: "This is a test article excerpt for testing purposes.",
    content:
      "This is the full content of the test article with enough words to calculate reading time.",
    publishDate: "2024-01-15T10:00:00Z",
    modifiedDate: "2024-01-15T10:00:00Z",
    author: "Test Author",
    authorId: "author-1",
    tags: ["Téléphonie IP", "Test"],
    categories: ["Technique"],
    slug: "test-article",
    url: "https://example.com/blog/test-article",
    featuredImage: "https://example.com/image.jpg",
    metaDescription: "Test meta description",
    seoTitle: "Test SEO Title",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("BlogSearch Component", () => {
    it("should render search interface correctly", () => {
      const mockOnSearch = vi.fn();

      render(
        <BlogSearch
          onSearch={mockOnSearch}
          availableAuthors={["Author 1", "Author 2"]}
          availableYears={[2024, 2023]}
          availableTags={["Tag 1", "Tag 2"]}
          totalResults={10}
          isLoading={false}
        />
      );

      expect(
        screen.getByPlaceholderText("Rechercher dans les articles...")
      ).toBeInTheDocument();
      expect(screen.getByText("10 articles")).toBeInTheDocument();
      expect(screen.getByText("Trier par :")).toBeInTheDocument();
      expect(screen.getByText("Filtres")).toBeInTheDocument();
    });

    it("should handle search input changes", async () => {
      const mockOnSearch = vi.fn();

      render(
        <BlogSearch
          onSearch={mockOnSearch}
          availableAuthors={[]}
          availableYears={[]}
          availableTags={[]}
          totalResults={0}
          isLoading={false}
        />
      );

      const searchInput = screen.getByPlaceholderText(
        "Rechercher dans les articles..."
      );
      fireEvent.change(searchInput, { target: { value: "test query" } });

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith(
          expect.objectContaining({
            query: "test query",
          })
        );
      });
    });
  });

  describe("BlogPostsGrid Component", () => {
    it("should render blog posts correctly", () => {
      render(<BlogPostsGrid posts={[mockBlogPost]} loading={false} />);

      expect(screen.getByText("Test Article Title")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test article excerpt for testing purposes.")
      ).toBeInTheDocument();
      expect(screen.getByText("Test Author")).toBeInTheDocument();
      expect(screen.getByText("Lire l'article")).toBeInTheDocument();
    });

    it("should show loading skeleton when loading", () => {
      render(<BlogPostsGrid posts={[]} loading={true} />);

      const skeletons = document.querySelectorAll(".animate-pulse");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("should show empty state when no posts", () => {
      render(
        <BlogPostsGrid
          posts={[]}
          loading={false}
          emptyMessage="Aucun article trouvé."
        />
      );

      expect(screen.getByText("Aucun article trouvé.")).toBeInTheDocument();
    });
  });
});
