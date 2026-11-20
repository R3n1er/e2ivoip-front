import { render, screen, within } from "@testing-library/react";
import { RelatedPosts } from "@/components/blog/related-posts";
import type { PublicBlogPost } from "@/lib/blog-types";

const article = (
  slug: string,
  title: string,
  extra: Partial<PublicBlogPost> = {}
): PublicBlogPost => ({
  id: slug,
  title,
  slug,
  excerpt: `Extrait de ${title}`,
  publishDate: "2026-11-19",
  ...extra,
});

describe("RelatedPosts", () => {
  it("n'affiche rien quand il n'y a aucun article lié", () => {
    const { container } = render(<RelatedPosts posts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("affiche l'image de couverture d'un article lié", () => {
    render(
      <RelatedPosts
        posts={[
          article("agent-vocal-ia", "Agent vocal IA", {
            featuredImageUrl: "/images/blog/agent-vocal.png",
          }),
        ]}
      />
    );

    const carte = screen.getByRole("article");
    const image = within(carte).getByTestId("related-post-cover");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent("/images/blog/agent-vocal.png"))
    );
  });

  it("se rabat sur featuredImage quand featuredImageUrl est absent", () => {
    render(
      <RelatedPosts
        posts={[
          article("fin-cuivre", "Fin du réseau cuivre", {
            featuredImage: "/images/blog/cuivre.png",
          }),
        ]}
      />
    );

    expect(screen.getByTestId("related-post-cover")).toHaveAttribute(
      "src",
      expect.stringContaining(encodeURIComponent("/images/blog/cuivre.png"))
    );
  });

  it("garde la carte sans image quand l'article n'a pas de couverture", () => {
    render(<RelatedPosts posts={[article("sans-image", "Sans image")]} />);

    expect(screen.queryByTestId("related-post-cover")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Sans image" })
    ).toHaveAttribute("href", "/blog/sans-image");
  });

  it("n'expose qu'un seul lien accessible par article (l'image est décorative)", () => {
    render(
      <RelatedPosts
        posts={[
          article("agent-vocal-ia", "Agent vocal IA", {
            featuredImageUrl: "/images/blog/agent-vocal.png",
          }),
        ]}
      />
    );

    const carte = screen.getByRole("article");
    expect(within(carte).getAllByRole("link")).toHaveLength(1);
    expect(within(carte).getByTestId("related-post-cover")).toHaveAttribute(
      "alt",
      ""
    );
  });
});
