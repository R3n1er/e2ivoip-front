import { render, screen } from "@testing-library/react";
import QuiSommesNous from "@/app/qui-sommes-nous/page";
import { vi, describe, test, expect, beforeEach } from "vitest";

// Mock des composants UI
vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div {...props}>{children}</div>
  ),
  CardContent: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div {...props}>{children}</div>
  ),
}));

vi.mock("@/components/ui/badge", () => ({
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
    
    // Vérifier que la section équipe est présente - utiliser une approche plus flexible
    const equipeContainer = screen.getByText("Rencontrez").closest("h2");
    expect(equipeContainer).toHaveTextContent("Rencontrez l'équipe");
    
    expect(screen.getByText("Notre équipe d'experts dédiés à votre succès")).toBeInTheDocument();
    
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
    
    // Vérifier les autres sections - utiliser une approche plus flexible pour les textes divisés
    const quiSommesNousContainer = screen.getByText("nous").closest("h1");
    expect(quiSommesNousContainer).toHaveTextContent("Qui sommes-nous ?");
    
    // Vérifier "Notre expertise" - utiliser une approche plus flexible
    const expertiseContainer = screen.getByText("expertise").closest("h2");
    expect(expertiseContainer).toHaveTextContent("Notre expertise");
    
    // Vérifier "Nos missions" - utiliser une approche plus flexible
    const missionsContainer = screen.getByText("missions").closest("h2");
    expect(missionsContainer).toHaveTextContent("Nos missions");
    
    // Vérifier "Notre cœur de métier" - utiliser une approche plus flexible
    const coeurMetierContainer = screen.getByText("cœur de métier").closest("h2");
    expect(coeurMetierContainer).toHaveTextContent("Notre cœur de métier");
    
    // Vérifier "Nous sommes certifiés !" - utiliser une approche plus flexible
    const certifiesContainer = screen.getByText("certifiés").closest("h2");
    expect(certifiesContainer).toHaveTextContent("Nous sommes certifiés !");
    
    // Vérifier "Nos implantations" - utiliser une approche plus flexible
    const implantationsContainer = screen.getByText("implantations").closest("h2");
    expect(implantationsContainer).toHaveTextContent("Nos implantations");
  });

  test("Les informations de contact par région sont présentes", () => {
    render(<QuiSommesNous />);
    
    // Vérifier les régions
    expect(screen.getByText("Guyane")).toBeInTheDocument();
    expect(screen.getByText("Guadeloupe")).toBeInTheDocument();
    expect(screen.getByText("Martinique")).toBeInTheDocument();
    expect(screen.getByText("La Réunion")).toBeInTheDocument();
    
    // Vérifier les numéros de téléphone
    expect(screen.getByText("+594 594 963 500")).toBeInTheDocument();
    expect(screen.getByText("+590 590 173 500")).toBeInTheDocument();
    expect(screen.getByText("+596 596 313 500")).toBeInTheDocument();
    expect(screen.getByText("+262 263 085 500")).toBeInTheDocument();
  });
});
