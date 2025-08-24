import { render, screen } from "@testing-library/react";
import TrunkSIPCompteur from "@/app/telephonie-entreprise/trunk-sip-compteur/page";

describe("Page Trunk SIP au Compteur", () => {
  test("Le titre principal s'affiche correctement", () => {
    render(<TrunkSIPCompteur />);
    
    expect(screen.getByText("Trunk SIP au")).toBeInTheDocument();
    expect(screen.getByText("compteur")).toBeInTheDocument();
  });

  test("La section problématique est présente", () => {
    render(<TrunkSIPCompteur />);
    
    expect(screen.getByText(/Votre facture télécom/)).toBeInTheDocument();
    expect(screen.getByText("explose")).toBeInTheDocument();
    expect(screen.getByText("Coûts imprévisibles")).toBeInTheDocument();
    expect(screen.getByText("PABX obsolète")).toBeInTheDocument();
    expect(screen.getByText("Numéros non-locaux")).toBeInTheDocument();
  });

  test("La solution est bien présentée", () => {
    render(<TrunkSIPCompteur />);
    
    expect(screen.getByText(/Notre solution/)).toBeInTheDocument();
    expect(screen.getByText("Trunk SIP")).toBeInTheDocument();
    expect(screen.getByText("Facturation au compteur")).toBeInTheDocument();
    expect(screen.getByText("Numéros locaux DOM")).toBeInTheDocument();
  });

  test("Les tarifs sont affichés", () => {
    render(<TrunkSIPCompteur />);
    
    expect(screen.getByText("Tarification transparente")).toBeInTheDocument();
    expect(screen.getByText("0,02€/min")).toBeInTheDocument();
    expect(screen.getByText("0,015€/min")).toBeInTheDocument();
    expect(screen.getByText("Gratuit")).toBeInTheDocument();
  });

  test("Les cas d'usage sont présentés", () => {
    render(<TrunkSIPCompteur />);
    
    expect(screen.getByText("Commerce de proximité")).toBeInTheDocument();
    expect(screen.getByText("Cabinets médicaux")).toBeInTheDocument();
    expect(screen.getByText("Professions libérales")).toBeInTheDocument();
  });

  test("Le témoignage client est affiché", () => {
    render(<TrunkSIPCompteur />);
    
    expect(screen.getByText(/Avec le Trunk SIP au compteur/)).toBeInTheDocument();
    expect(screen.getByText("Dr. Marie Dubois")).toBeInTheDocument();
    expect(screen.getByText("Cabinet médical, Fort-de-France")).toBeInTheDocument();
  });

  test("Le CTA principal pointe vers devis en ligne", () => {
    render(<TrunkSIPCompteur />);
    
    const ctaButton = screen.getByRole("link", { name: /Calculer mes économies/ });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "/devis-en-ligne");
  });

  test("Le numéro de téléphone est cliquable", () => {
    render(<TrunkSIPCompteur />);
    
    const phoneLink = screen.getByRole("link", { name: /01 89 56 05 00/ });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute("href", "tel:+33189560500");
  });

  test("La FAQ est présente et fonctionnelle", () => {
    render(<TrunkSIPCompteur />);
    
    expect(screen.getByText("Questions")).toBeInTheDocument();
    expect(screen.getByText("fréquentes")).toBeInTheDocument();
    expect(screen.getByText(/Quelle est la différence entre Trunk SIP/)).toBeInTheDocument();
    expect(screen.getByText(/Puis-je garder mes numéros actuels/)).toBeInTheDocument();
  });

  test("Les éléments de réassurance sont présents", () => {
    render(<TrunkSIPCompteur />);
    
    expect(screen.getByText("Facturation transparente")).toBeInTheDocument();
    expect(screen.getByText("Numéros locaux inclus")).toBeInTheDocument();
    expect(screen.getByText("Support DOM")).toBeInTheDocument();
    expect(screen.getByText("Devis gratuit")).toBeInTheDocument();
  });
});