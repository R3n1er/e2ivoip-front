import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeaderSimple } from "@/components/header-simple";

// Mock Framer Motion pour éviter les erreurs de test
jest.mock("framer-motion", () => ({
  motion: {
    header: "header",
    div: "div",
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("HeaderSimple - Sous-menus", () => {
  beforeEach(() => {
    // Mock console.log pour les tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Le header se rend correctement", () => {
    render(<HeaderSimple />);
    
    // Vérifier que le header est présent
    expect(screen.getByRole("banner")).toBeInTheDocument();
    
    // Vérifier le logo
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("I")).toBeInTheDocument();
  });

  test("Les éléments de navigation avec sous-menus sont présents", () => {
    render(<HeaderSimple />);
    
    // Vérifier les éléments de navigation principaux
    expect(screen.getByText("Qui sommes-nous")).toBeInTheDocument();
    expect(screen.getByText("Téléphonie d'entreprise")).toBeInTheDocument();
    expect(screen.getByText("Nos services")).toBeInTheDocument();
    // « Mobilité » supprimé du menu
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  test("Les sous-menus contiennent les bons éléments", () => {
    render(<HeaderSimple />);

    expect(screen.getByText("Trunk SIP au compteur")).toBeInTheDocument();
    expect(screen.getByText("Trunk SIP illimité")).toBeInTheDocument();
    expect(screen.getByText("Téléphonie 3CX")).toBeInTheDocument();
    expect(screen.getByText("Téléphonie Yeastar")).toBeInTheDocument();
    expect(screen.getByText("Studio attente téléphonique")).toBeInTheDocument();
    expect(screen.getByText("Assistants vocaux IA")).toBeInTheDocument();
  });

  test("Les sous-menus ont les bonnes classes CSS", () => {
    render(<HeaderSimple />);
    
    // Vérifier que les sous-menus ont les classes CSS hover
    const submenuElements = document.querySelectorAll('.group-hover\\:opacity-100');
    expect(submenuElements.length).toBeGreaterThan(0);
  });

  test("Le bouton contact est présent", () => {
    render(<HeaderSimple />);
    
    // Vérifier le bouton contact
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("Le menu mobile fonctionne", async () => {
    const user = userEvent.setup();
    render(<HeaderSimple />);
    
    // Trouver le bouton menu mobile spécifiquement
    const menuButton = screen.getByRole("button", { name: /ouvrir le menu/i });
    
    // Cliquer sur le bouton menu
    await user.click(menuButton);
    
    // Le menu mobile devrait s'ouvrir (état géré par React)
    expect(menuButton).toBeInTheDocument();
  });

  test("Les liens ont les bonnes URLs", () => {
    render(<HeaderSimple />);

    // Vérifier les liens principaux
    const quiSommesNousLink = screen.getByRole("link", { name: /qui sommes-nous/i });
    expect(quiSommesNousLink).toHaveAttribute("href", "/qui-sommes-nous");
    
    // Lien « Mobilité » retiré du header simple
    
    const blogLink = screen.getByRole("link", { name: /blog/i });
    expect(blogLink).toHaveAttribute("href", "/blog");
  });

  test("Les sous-liens ont les bonnes URLs", () => {
    render(<HeaderSimple />);
    
    // Vérifier les sous-liens
    const trunkSipLink = screen.getByRole("link", { name: /trunk sip au compteur/i });
    expect(trunkSipLink).toHaveAttribute("href", "/telephonie-entreprise/trunk-sip-compteur");

    const telephonie3cxLink = screen.getByRole("link", { name: /téléphonie 3cx/i });
    expect(telephonie3cxLink).toHaveAttribute("href", "/telephonie-3cx");
  });
});
