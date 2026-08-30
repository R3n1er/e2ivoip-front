import { render, screen, within } from "@testing-library/react";
import { PageBreadcrumb } from "@/components/layout/page-breadcrumb";

// Mock de usePathname par scénario.
const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("PageBreadcrumb (fil d'Ariane global)", () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
  });

  it("ne rend rien sur l'accueil", () => {
    mockUsePathname.mockReturnValue("/");
    const { container } = render(<PageBreadcrumb />);
    expect(container).toBeEmptyDOMElement();
  });

  it("ne rend rien sur l'espace juridique (LegalBreadcrumb natif des pages)", () => {
    mockUsePathname.mockReturnValue("/juridique/mentions-legales");
    const { container } = render(<PageBreadcrumb />);
    expect(container).toBeEmptyDOMElement();
  });

  it("ne rend rien sur /admin et /offline", () => {
    for (const path of ["/admin/hubspot", "/offline"]) {
      mockUsePathname.mockReturnValue(path);
      const { container } = render(<PageBreadcrumb />);
      expect(container).toBeEmptyDOMElement();
    }
  });

  it("rend Accueil › Contact sur /contact avec JSON-LD BreadcrumbList", () => {
    mockUsePathname.mockReturnValue("/contact");
    render(<PageBreadcrumb />);

    const nav = screen.getByRole("navigation", { name: "Fil d'Ariane" });
    expect(nav).toBeInTheDocument();

    const links = within(nav).getAllByRole("link");
    expect(links.map((l) => l.textContent)).toEqual(["Accueil"]);

    expect(screen.getByText("Contact")).toHaveAttribute("aria-current", "page");

    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    expect(jsonLd).not.toBeNull();
    const parsed = JSON.parse(jsonLd!.textContent ?? "{}");
    expect(parsed["@type"]).toBe("BreadcrumbList");
    expect(parsed.itemListElement).toHaveLength(2);
    expect(parsed.itemListElement[0].item).toBe("https://www.e2i-voip.com/");
  });

  it("rend la hiérarchie complète sur une page enfant services", () => {
    mockUsePathname.mockReturnValue("/telephonie-entreprise/pbx-yeastar");
    render(<PageBreadcrumb />);

    const nav = screen.getByRole("navigation", { name: "Fil d'Ariane" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((l) => ({ text: l.textContent, href: l.getAttribute("href") }))).toEqual([
      { text: "Accueil", href: "/" },
      {
        text: "Téléphonie d'entreprise",
        href: "/telephonie-entreprise",
      },
    ]);
    expect(screen.getByText("PBX Yeastar")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});
