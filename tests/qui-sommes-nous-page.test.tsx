import { render, screen } from "@testing-library/react";
import QuiSommesNous from "../app/qui-sommes-nous/page";

// Mock des composants Header et Footer
jest.mock("@/components/header", () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

jest.mock("@/components/footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

describe("Page Qui Sommes Nous", () => {
  it("rend la page sans erreur", () => {
    render(<QuiSommesNous />);

    // Vérification des composants principaux
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("affiche le titre principal de la page", () => {
    render(<QuiSommesNous />);

    expect(
      screen.getByText("Votre opérateur de services télécom DOM-TOM")
    ).toBeInTheDocument();
  });

  it("affiche la section équipe avec le bon titre", () => {
    render(<QuiSommesNous />);

    expect(screen.getByTestId("team-section-title")).toBeInTheDocument();
    expect(
      screen.getByText("Une équipe locale et experte")
    ).toBeInTheDocument();
  });

  it("affiche tous les membres de l'équipe", () => {
    render(<QuiSommesNous />);

    expect(screen.getByText("Alban")).toBeInTheDocument();
    expect(screen.getByText("Valerie")).toBeInTheDocument();
    expect(screen.getByText("Fabien")).toBeInTheDocument();
  });

  it("affiche les rôles de l'équipe", () => {
    render(<QuiSommesNous />);

    expect(
      screen.getByText("Directeur & Customer Success Manager")
    ).toBeInTheDocument();
    expect(screen.getByText("Assistante Commerciale")).toBeInTheDocument();
    expect(screen.getByText("Technicien VoIP")).toBeInTheDocument();
  });

  it("affiche la section des certifications et partenariats", () => {
    render(<QuiSommesNous />);

    expect(
      screen.getByText("Nos certifications et partenariats")
    ).toBeInTheDocument();
  });

  it("affiche les certifications principales (3CX et Yeastar)", () => {
    render(<QuiSommesNous />);

    expect(screen.getByText("3CX Silver Partner")).toBeInTheDocument();
    expect(screen.getByText("Certifié Yeastar")).toBeInTheDocument();
  });

  it("affiche la section des partenaires matériels", () => {
    render(<QuiSommesNous />);

    expect(screen.getByText("Nos partenaires matériels")).toBeInTheDocument();
  });

  it("affiche Fanvil et Yealink comme partenaires", () => {
    render(<QuiSommesNous />);

    expect(screen.getByText("Fanvil")).toBeInTheDocument();
    expect(screen.getByText("Yealink")).toBeInTheDocument();
  });

  it("affiche les logos des certifications 3CX et Yeastar", () => {
    render(<QuiSommesNous />);

    // Vérification des logos des certifications
    const cx3Logo = screen.getByAltText(
      "Logo 3CX Bronze Partner - Certification officielle E2I VoIP"
    );
    const yeastarLogo = screen.getByAltText(
      "Logo Yeastar Certified Expert - Certification officielle E2I VoIP"
    );

    expect(cx3Logo).toBeInTheDocument();
    expect(yeastarLogo).toBeInTheDocument();
  });

  it("affiche les logos des partenaires matériels Fanvil et Yealink", () => {
    render(<QuiSommesNous />);

    // Vérification des logos des partenaires matériels
    const fanvilLogo = screen.getByAltText(
      "Logo Fanvil - Partenaire officiel E2I VoIP"
    );
    const yealinkLogo = screen.getByAltText(
      "Logo Yealink - Partenaire officiel E2I VoIP"
    );

    expect(fanvilLogo).toBeInTheDocument();
    expect(yealinkLogo).toBeInTheDocument();
  });

  it("affiche les badges de statut des partenaires", () => {
    render(<QuiSommesNous />);

    // Vérification des badges
    const badges = screen.getAllByText("Distributeur Officiel");
    expect(badges.length).toBeGreaterThan(0);

    expect(screen.getByText("Partenaire Officiel")).toBeInTheDocument();
    expect(screen.getByText("Expert Certifié")).toBeInTheDocument();
  });

  it("affiche la description des partenariats", () => {
    render(<QuiSommesNous />);

    expect(
      screen.getByText(
        "Tous nos partenaires sont sélectionnés pour leur qualité et leur fiabilité"
      )
    ).toBeInTheDocument();
  });

  it("affiche la section contact par région", () => {
    render(<QuiSommesNous />);

    // Vérifier le texte partiel car il est cassé par des éléments multiples
    expect(screen.getByText("Support local")).toBeInTheDocument();
    expect(screen.getByText("24/7")).toBeInTheDocument();
  });

  it("affiche tous les départements", () => {
    render(<QuiSommesNous />);

    expect(screen.getByText("Guyane")).toBeInTheDocument();
    expect(screen.getByText("Guadeloupe")).toBeInTheDocument();
    expect(screen.getByText("Martinique")).toBeInTheDocument();
    expect(screen.getByText("La Réunion")).toBeInTheDocument();
    expect(screen.getByText("France Métropole")).toBeInTheDocument();
  });

  it("affiche la section CTA finale", () => {
    render(<QuiSommesNous />);

    expect(screen.getByText("Calculez vos économies")).toBeInTheDocument();
    expect(screen.getByText("Parler à un expert")).toBeInTheDocument();
  });
});
