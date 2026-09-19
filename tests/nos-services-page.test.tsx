// Jest mocks
import { render, screen } from "@testing-library/react";
import NosServices from "../app/nos-services/page";

jest.mock("@/components/layout/footer", () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

describe("Page Nos Services", () => {
  it("rend la page sans erreur", () => {
    render(<NosServices />);

    // Vérification des composants principaux (le footer est rendu par le layout)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
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
    expect(screen.getByText("Continuité de service")).toBeInTheDocument();
    expect(screen.getByText("Présents dans les DOM")).toBeInTheDocument();
    expect(screen.getByText("Infrastructure fiable")).toBeInTheDocument();
    expect(screen.getByText("Hébergement souverain")).toBeInTheDocument();
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

    // Vérification des services (sans Mobilité).
    // « 3CX SMB PRO » et « 3CX PRO Dédié » sont désormais réunis sous une seule
    // carte « Standard téléphonique 3CX » : le visiteur cherche un standard, pas
    // un nom de licence (arbitrage Alban, 2026-09-19).
    expect(screen.getByText("Standard téléphonique 3CX")).toBeInTheDocument();
    expect(screen.getByText("Trunk SIP DOM")).toBeInTheDocument();
    expect(screen.getByText("Trunk SIP agents IA")).toBeInTheDocument();
    expect(screen.getByText("Studio d'Enregistrement")).toBeInTheDocument();
    expect(screen.queryByText("3CX SMB PRO")).not.toBeInTheDocument();
    expect(screen.queryByText("3CX PRO Dédié")).not.toBeInTheDocument();
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
    expect(screen.getByText("Continuité de service")).toBeInTheDocument();
    // Utilisation de getAllByText pour gérer les éléments multiples
    const domTomElements = screen.getAllByText(/DOM/);
    expect(domTomElements.length).toBeGreaterThan(0);
    // Ligne éditoriale : aucun nombre de clients publié (cf. plan-revision-contenus.md)
    expect(screen.queryByText(/\d+\s*(\+|entreprises|clients)/i)).toBeNull();
    expect(
      screen.getByText(/15 ans d.expérience/)
    ).toBeInTheDocument();
    // Le discours ne repose plus sur l'économie tarifaire : plus aucune
    // allégation chiffrée de pourcentage sur cette page.
    expect(screen.queryByText(/20\s*%|20%/)).toBeNull();
  });

  it("affiche les badges de service appropriés", () => {
    render(<NosServices />);

    // Vérification des badges (le badge « Entreprise » a disparu avec la
    // fusion des deux cartes 3CX en un seul standard téléphonique).
    expect(screen.getByText("Populaire")).toBeInTheDocument();
    expect(screen.getByText("Idéal PME")).toBeInTheDocument();
    // Badge "Télétravail" retiré avec la suppression du service Mobilité
    // Utilisation de getAllByText pour gérer les éléments multiples
    const innovationElements = screen.getAllByText("Innovation");
    expect(innovationElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("affiche les prix des services", () => {
    render(<NosServices />);

    // Vérification des prix.
    expect(screen.getByText("À partir de 2 canaux voix")).toBeInTheDocument();
    // La carte fusionnée couvre les deux déclinaisons 3CX : le prix affiche
    // donc le plancher SMB ET le « sur devis » du PRO. Afficher le seul
    // « dès 15 € » sur une carte qui promet aussi l'instance dédiée laissait
    // croire qu'un serveur dédié coûte 15 €/utilisateur/mois.
    expect(
      screen.getByText("SMB dès 15 € HT/utilisateur/mois · PRO sur devis"),
    ).toBeInTheDocument();
    const surDevisElements = screen.getAllByText("Sur devis");
    expect(surDevisElements.length).toBeGreaterThan(0);
    expect(screen.getByText("À partir de 50€")).toBeInTheDocument();
  });

  it("affiche les fonctionnalités des services", () => {
    render(<NosServices />);

    // Vérification de quelques fonctionnalités clés
    expect(screen.getByText("Éligibilité Trunk SIP DOM")).toBeInTheDocument();
    expect(screen.getByText("Numéros locaux DOM")).toBeInTheDocument();
    expect(screen.getByText("Portabilité gratuite")).toBeInTheDocument();
    expect(screen.getByText("Canaux dimensionnés à votre trafic")).toBeInTheDocument();
    expect(screen.getByText("Formation et support dédiés")).toBeInTheDocument();
  });
});
