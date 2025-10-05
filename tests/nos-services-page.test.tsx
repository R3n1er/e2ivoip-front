// Jest mocks
import { render, screen } from "@testing-library/react";
import NosServices from "../app/nos-services/page";

jest.mock("@/components/layout/footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

describe("Page Nos Services", () => {
  it("rend la page sans erreur", () => {
    render(<NosServices />);

    // Vérification des composants principaux
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("affiche le titre principal avec la charte PRD", () => {
    render(<NosServices />);

    const mainTitle = screen.getByRole("heading", { level: 1 });
    expect(mainTitle).toBeInTheDocument();
    expect(mainTitle).toHaveTextContent("Nos solutions de téléphonie IP");

    // Vérification que le span rouge est présent
    const redSpan = mainTitle.querySelector("span");
    expect(redSpan).toHaveClass("text-red-primary");
  });

  it("affiche la section des bénéfices clés", () => {
    render(<NosServices />);

    // Vérification des 4 bénéfices
    expect(screen.getByText("Économies garanties")).toBeInTheDocument();
    expect(screen.getByText("Présence locale DOM")).toBeInTheDocument();
    expect(screen.getByText("Disponibilité 24/7")).toBeInTheDocument();
    expect(screen.getByText("Sécurité maximale")).toBeInTheDocument();
  });

  it("affiche les catégories de services", () => {
    render(<NosServices />);

    // Vérification des catégories restantes
    expect(screen.getByText("Téléphonie IP")).toBeInTheDocument();
    // Utilisation de getAllByText pour gérer les éléments multiples
    const innovationElements = screen.getAllByText("Innovation");
    expect(innovationElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Communication")).toBeInTheDocument();
  });

  it("affiche tous les services avec leurs détails", () => {
    render(<NosServices />);

    // Vérification des services (sans Mobilité)
    expect(screen.getByText("Trunk SIP DOM")).toBeInTheDocument();
    expect(screen.getByText("3CX SMB Mutualisé")).toBeInTheDocument();
    expect(screen.getByText("3CX PRO Dédié")).toBeInTheDocument();
    expect(screen.getByText("Assistants Vocaux IA")).toBeInTheDocument();
    expect(screen.getByText("Studio d'Enregistrement")).toBeInTheDocument();
  });

  it("respecte la charte graphique PRD", () => {
    render(<NosServices />);

    // Vérification des classes de couleurs PRD
    const redElements = document.querySelectorAll(".text-red-primary");
    const blueElements = document.querySelectorAll(".text-blue-marine");
    const grayElements = document.querySelectorAll(".text-gray-secondary");

    expect(redElements.length).toBeGreaterThan(0);
    expect(blueElements.length).toBeGreaterThan(0);
    expect(grayElements.length).toBeGreaterThan(0);
  });

  it("affiche la section CTA finale", () => {
    render(<NosServices />);

    // Vérification des boutons CTA avec getAllByText pour gérer les éléments multiples
    const auditElements = screen.getAllByText("Audit télécom gratuit");
    expect(auditElements.length).toBeGreaterThan(0);
    const devisElements = screen.getAllByText("Demander un devis");
    expect(devisElements.length).toBeGreaterThan(0);
  });

  it("respecte la ligne éditoriale E2I VoIP", () => {
    render(<NosServices />);

    // Vérification des messages clés
    expect(screen.getByText(/économies garanties/)).toBeInTheDocument();
    // Utilisation de getAllByText pour gérer les éléments multiples
    const domTomElements = screen.getAllByText(/DOM/);
    expect(domTomElements.length).toBeGreaterThan(0);
    expect(
      screen.getByText(/500 entreprises nous font confiance/)
    ).toBeInTheDocument();
    // Utilisation de getAllByText pour gérer les éléments multiples
    const thirtyPercentElements = screen.getAllByText(/30%/);
    expect(thirtyPercentElements.length).toBeGreaterThan(0);
  });

  it("affiche les badges de service appropriés", () => {
    render(<NosServices />);

    // Vérification des badges
    expect(screen.getByText("Populaire")).toBeInTheDocument();
    expect(screen.getByText("Idéal PME")).toBeInTheDocument();
    expect(screen.getByText("Entreprise")).toBeInTheDocument();
    // Badge "Télétravail" retiré avec la suppression du service Mobilité
    // Utilisation de getAllByText pour gérer les éléments multiples
    const innovationElements = screen.getAllByText("Innovation");
    expect(innovationElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("affiche les prix des services", () => {
    render(<NosServices />);

    // Vérification des prix
    expect(screen.getByText("À partir de 15€/mois")).toBeInTheDocument();
    expect(screen.getByText("15€/mois/utilisateur")).toBeInTheDocument();
    const surDevisElements = screen.getAllByText("Sur devis");
    expect(surDevisElements.length).toBeGreaterThan(0);
    expect(screen.getByText("À partir de 50€")).toBeInTheDocument();
  });

  it("affiche les fonctionnalités des services", () => {
    render(<NosServices />);

    // Vérification de quelques fonctionnalités clés
    expect(screen.getByText("Économies jusqu'à 30%")).toBeInTheDocument();
    expect(screen.getByText("Numéros locaux garantis")).toBeInTheDocument();
    expect(screen.getByText("Portabilité gratuite")).toBeInTheDocument();
    expect(screen.getByText("Support technique local")).toBeInTheDocument();
    expect(screen.getByText("Support utilisateur dédié")).toBeInTheDocument();
  });
});
