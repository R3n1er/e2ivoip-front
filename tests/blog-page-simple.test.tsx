import { render, screen, waitFor } from "@testing-library/react";
import Blog from "@/app/blog/page";

const mockBlogResponse = {
  posts: [],
  total: 0,
  metadata: {
    authors: [],
    years: [],
    tags: [],
  },
};

describe("Blog Page - Test Simple", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockBlogResponse,
    } as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("se charge sans erreur", async () => {
    const { container } = render(<Blog />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(container.querySelector("main")).toBeInTheDocument();
  });

  it("affiche le titre principal", async () => {
    render(<Blog />);

    const heading = await screen.findByRole("heading", {
      level: 1,
      name: /Blog E2I VoIP/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
