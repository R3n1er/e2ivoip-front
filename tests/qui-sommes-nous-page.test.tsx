// Jest mocks
import { render, screen } from "@testing-library/react";
import QuiSommesNous from "@/app/qui-sommes-nous/page";

// Mock des composants UI
jest.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div {...props}>{children}</div>
  ),
  CardContent: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div {...props}>{children}</div>
  ),
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <span {...props}>{children}</span>
  ),
}));

describe("Page Qui sommes-nous", () => {
  beforeEach(() => {
    // Mock de window.scrollY
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });
  });

  test("La page se rend sans erreur", () => {
    expect(() => render(<QuiSommesNous />)).not.toThrow();
  });

  test("La section équipe est présente", () => {
    render(<QuiSommesNous />);
    
    // Vérifier que la section équipe est présente
    expect(screen.getByText("Une équipe")).toBeInTheDocument();
    expect(screen.getByText("locale et experte")).toBeInTheDocument();
    
    expect(screen.getByText("Des experts présents localement pour un accompagnement personnalisé")).toBeInTheDocument();
    
    // Vérifier que les membres de l'équipe sont présents
    expect(screen.getByText("Alban")).toBeInTheDocument();
    expect(screen.getByText("Valerie")).toBeInTheDocument();
    expect(screen.getByText("Fabien")).toBeInTheDocument();
    
    // Vérifier leurs rôles
    expect(screen.getByText("Directeur & Customer Success Manager")).toBeInTheDocument();
    expect(screen.getByText("Assistante Commerciale")).toBeInTheDocument();
    expect(screen.getByText("Technicien VoIP")).toBeInTheDocument();
  });

  test("Les autres sections sont présentes", () => {
    render(<QuiSommesNous />);
    
    // Vérifier le titre principal
    expect(screen.getByText("Votre opérateur de services télécom")).toBeInTheDocument();
    expect(screen.getByText("DOM-TOM")).toBeInTheDocument();
    
    // Vérifier "Notre expertise" 
    expect(screen.getByText("Excellence technique")).toBeInTheDocument();
    expect(screen.getByText("Résultats garantis")).toBeInTheDocument();
    
    // Vérifier "Nos solutions phares" (au pluriel)
    const solutionsPharesHeading = screen.getByText("solutions phares").closest("h2");
    expect(solutionsPharesHeading).toHaveTextContent("Nos solutions phares");
    
    // Vérifier "Nos certifications et partenariats"
    const certificationsHeading = screen.getByText("certifications et partenariats").closest("h2");
    expect(certificationsHeading).toHaveTextContent("Nos certifications et partenariats");
    
    // Vérifier "Support local 24/7"
    expect(screen.getByText("Support local")).toBeInTheDocument();
    expect(screen.getByText("24/7")).toBeInTheDocument();
  });

  test("Les informations de contact par région sont présentes", () => {
    render(<QuiSommesNous />);
    
    // Vérifier les régions
    expect(screen.getByText("Guyane")).toBeInTheDocument();
    expect(screen.getByText("Guadeloupe")).toBeInTheDocument();
    expect(screen.getByText("Martinique")).toBeInTheDocument();
    expect(screen.getByText("La Réunion")).toBeInTheDocument();
    expect(screen.getByText("France Métropole")).toBeInTheDocument();
    
    // Vérifier les numéros de téléphone (format affiché)
    expect(screen.getByText("0594 963 500")).toBeInTheDocument();
    expect(screen.getByText("0590 173 500")).toBeInTheDocument();
    expect(screen.getByText("0596 313 500")).toBeInTheDocument();
    expect(screen.getByText("0262 263 085 500")).toBeInTheDocument();
    expect(screen.getByText("0189 563 500")).toBeInTheDocument();
  });

  test("Les services et solutions sont présents", () => {
    render(<QuiSommesNous />);
    
    // Vérifier les solutions phares
    expect(screen.getByText("Trunk SIP éligibles DOM-TOM")).toBeInTheDocument();
    expect(screen.getByText("3CX : IPBX cloud nouvelle génération")).toBeInTheDocument();
    expect(screen.getByText("Services innovants inclus")).toBeInTheDocument();
    
    // Vérifier les certifications
    expect(screen.getByText("3CX Silver Partner")).toBeInTheDocument();
    expect(screen.getByText("Certifié Yeastar")).toBeInTheDocument();
    expect(screen.getByText("Partenaire Fanvil & Yealink")).toBeInTheDocument();
  });
});
