import { render, screen, within } from "@testing-library/react";
import Blog from "@/app/blog/page";
import { getBlogMetadata, getBlogPosts } from "@/lib/blog-source";

// La page est un Server Component asynchrone : les données sont lues au rendu,
// plus via `fetch` après hydratation. On simule donc la source directement.
jest.mock("@/lib/blog-source", () => ({
  getBlogPosts: jest.fn(),
  getBlogMetadata: jest.fn(),
}));

jest.mock("@/components/blog/blog-browser", () => ({
  BlogBrowser: ({ initialPosts }: { initialPosts: { id: string }[] }) => (
    <div data-testid="blog-browser" data-count={initialPosts.length} />
  ),
}));

const mockGetBlogPosts = getBlogPosts as jest.MockedFunction<typeof getBlogPosts>;
const mockGetBlogMetadata = getBlogMetadata as jest.MockedFunction<
  typeof getBlogMetadata
>;

const article = (id: string, slug: string, title: string) => ({
  id,
  title,
  slug,
  excerpt: "",
  content: "",
  author: "Alban",
  publishDate: "2026-01-01",
  modifiedDate: "2026-01-01",
  metaDescription: "",
  seoTitle: title,
  tags: [],
  categories: [],
  url: `/blog/${slug}`,
});

/** Résout le Server Component avant de le confier au moteur de rendu. */
async function renderBlog() {
  const ui = await Blog();
  return render(ui);
}

describe("Blog Page — rendu serveur", () => {
  beforeEach(() => {
    mockGetBlogMetadata.mockResolvedValue({
      authors: [],
      years: [],
      tags: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche le titre principal", async () => {
    mockGetBlogPosts.mockResolvedValue({ posts: [], total: 0 });

    await renderBlog();

    expect(
      screen.getByRole("heading", { level: 1, name: /Blog E2I VoIP/i })
    ).toBeInTheDocument();
  });

  it("rend un lien par article, sans exécution côté client", async () => {
    mockGetBlogPosts.mockResolvedValue({
      posts: [
        article("1", "comparaison-3cx-vs-ringover", "Comparaison 3CX vs Ringover"),
        article("2", "fin-du-cuivre-2030", "Fin du réseau cuivre en 2030"),
      ],
      total: 2,
    });

    await renderBlog();

    const navigation = screen.getByRole("navigation", {
      name: "Tous les articles du blog",
    });
    const liens = within(navigation).getAllByRole("link");

    expect(liens).toHaveLength(2);
    expect(liens[0]).toHaveAttribute("href", "/blog/comparaison-3cx-vs-ringover");
    expect(liens[1]).toHaveAttribute("href", "/blog/fin-du-cuivre-2030");
  });

  it("transmet les articles à la couche interactive", async () => {
    mockGetBlogPosts.mockResolvedValue({
      posts: [article("1", "un-article", "Un article")],
      total: 1,
    });

    await renderBlog();

    expect(screen.getByTestId("blog-browser")).toHaveAttribute(
      "data-count",
      "1"
    );
  });

  it("reste servie si la source d'articles est indisponible", async () => {
    // Le blog dépend de HUBSPOT_ACCESS_TOKEN : une panne ne doit pas faire
    // tomber la page, qui garde son hero, ses CTA et son maillage.
    const erreur = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    mockGetBlogPosts.mockRejectedValue(new Error("HubSpot indisponible"));

    await renderBlog();

    expect(
      screen.getByRole("heading", { level: 1, name: /Blog E2I VoIP/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: "Tous les articles du blog" })
    ).not.toBeInTheDocument();

    erreur.mockRestore();
  });

  it("expose un JSON-LD Blog décrivant les articles", async () => {
    mockGetBlogPosts.mockResolvedValue({
      posts: [article("1", "un-article", "Un article")],
      total: 1,
    });

    const { container } = await renderBlog();

    const blocs = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]')
    ).flatMap((script) => {
      const parsed = JSON.parse(script.textContent || "{}");
      return Array.isArray(parsed) ? parsed : [parsed];
    });

    const blog = blocs.find((bloc) => bloc["@type"] === "Blog");
    expect(blog).toBeDefined();
    expect(blog.blogPost).toHaveLength(1);
    expect(blocs.some((bloc) => bloc["@type"] === "BreadcrumbList")).toBe(true);
  });
});
