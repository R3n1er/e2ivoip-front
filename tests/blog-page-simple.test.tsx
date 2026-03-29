// tests/blog-page-simple.test.tsx
// Tests adaptés pour la nouvelle page Blog Server Component (ISR + HubSpot)

import { render, screen } from "@testing-library/react";
import BlogPage from "@/app/blog/page";

jest.mock("@/lib/hubspot-blog", () => ({
  getHubSpotBlogPosts: jest.fn().mockResolvedValue({
    posts: [],
    tags: [],
    total: 0,
    page: 1,
    pageSize: 12,
    hasNextPage: false,
  }),
}));

const defaultSearchParams = Promise.resolve({
  page: undefined,
  q: undefined,
  tag: undefined,
});

describe("Blog Page - Server Component", () => {
  it("se charge sans erreur", async () => {
    const Component = await BlogPage({ searchParams: defaultSearchParams });
    const { container } = render(Component);
    expect(container.querySelector("main")).toBeInTheDocument();
  });

  it("affiche le titre principal", async () => {
    const Component = await BlogPage({ searchParams: defaultSearchParams });
    render(Component);
    const heading = screen.getByRole("heading", { level: 1, name: /Blog/i });
    expect(heading).toBeInTheDocument();
  });
});
