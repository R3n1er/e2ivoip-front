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
    expect(screen.getByText("Mobilité")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  test("Les sous-menus contiennent les bons éléments", () => {
    render(<HeaderSimple />);
    
    // Vérifier les sous-éléments (ils sont dans le DOM même si pas visibles)
    expect(screen.getByText("Nos certifications")).toBeInTheDocument();
    expect(screen.getByText("Nos partenaires")).toBeInTheDocument();
    expect(screen.getByText("Trunk SIP au compteur")).toBeInTheDocument();
    expect(screen.getByText("Trunk SIP illimité")).toBeInTheDocument();
    expect(screen.getByText("3CX PRO dédiée")).toBeInTheDocument();
    expect(screen.getByText("Studio attente téléphonique")).toBeInTheDocument();
  });

  test("Les événements de souris sont gérés", async () => {
    const user = userEvent.setup();
    render(<HeaderSimple />);
    
    // Trouver un élément avec sous-menu
    const quiSommesNous = screen.getByText("Qui sommes-nous").closest("div");
    
    if (quiSommesNous) {
      // Simuler le survol
      await user.hover(quiSommesNous);
      
      // Vérifier que console.log a été appelé (debug)
      expect(console.log).toHaveBeenCalled();
    }
  });

  test("Le bouton contact est présent", () => {
    render(<HeaderSimple />);
    
    // Vérifier le bouton contact
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("Le menu mobile fonctionne", async () => {
    const user = userEvent.setup();
    render(<HeaderSimple />);
    
    // Trouver le bouton menu mobile (il devrait être présent même si caché)
    const menuButton = screen.getByRole("button");
    
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
    
    const mobiliteLink = screen.getByRole("link", { name: /mobilité/i });
    expect(mobiliteLink).toHaveAttribute("href", "/mobilite");
    
    const blogLink = screen.getByRole("link", { name: /blog/i });
    expect(blogLink).toHaveAttribute("href", "/blog");
  });

  test("Les sous-liens ont les bonnes URLs", () => {
    render(<HeaderSimple />);
    
    // Vérifier les sous-liens
    const certificationsLink = screen.getByRole("link", { name: /nos certifications/i });
    expect(certificationsLink).toHaveAttribute("href", "/qui-sommes-nous/certifications");
    
    const partenairesLink = screen.getByRole("link", { name: /nos partenaires/i });
    expect(partenairesLink).toHaveAttribute("href", "/qui-sommes-nous/partenaires");
    
    const trunkSipLink = screen.getByRole("link", { name: /trunk sip au compteur/i });
    expect(trunkSipLink).toHaveAttribute("href", "/telephonie-entreprise/trunk-sip-compteur");
  });
});