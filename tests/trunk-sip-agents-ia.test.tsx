import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@/components/contact-form-trunk-sip-ia", () => ({
  ContactFormTrunkSipIA: () => (
    <section id="contact" data-testid="contact-form-mock">
      <h2>Parlez-nous de votre projet d&apos;interconnexion SIP</h2>
    </section>
  ),
}));

jest.mock("@/components/ui/cta-button", () => ({
  CTAButton: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="cta-button">
      {children}
    </a>
  ),
  CTAButtonSecondary: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="cta-button-secondary">
      {children}
    </a>
  ),
}));

describe("Page Trunk SIP agents IA", () => {
  let TrunkSipAgentsIA: React.ComponentType;

  beforeEach(async () => {
    const pageModule = await import(
      "@/app/telephonie-entreprise/trunk-sip-agents-ia/page"
    );
    TrunkSipAgentsIA = pageModule.default;
  });

  it("rend la page sans erreur", () => {
    render(<TrunkSipAgentsIA />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Trunk SIP agents vocaux IA DOM/i })
    ).toBeInTheDocument();
  });

  it("affiche le badge Carrier SIP DOM", () => {
    render(<TrunkSipAgentsIA />);
    expect(screen.getByText("Carrier SIP DOM")).toBeInTheDocument();
  });

  it("affiche la section problème zone DOM", () => {
    render(<TrunkSipAgentsIA />);
    expect(
      screen.getByRole("heading", {
        name: /Le blocage des plateformes IA en zone DOM/i,
      })
    ).toBeInTheDocument();
  });

  it("affiche les deux modes d'interconnexion", () => {
    render(<TrunkSipAgentsIA />);
    expect(
      screen.getByRole("heading", { name: /Trunk SIP bidirectionnel/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Redirection d'appels/i })
    ).toBeInTheDocument();
  });

  it("affiche les plateformes compatibles", () => {
    render(<TrunkSipAgentsIA />);
    expect(screen.getByText("VAPI")).toBeInTheDocument();
    expect(screen.getByText("Rounded")).toBeInTheDocument();
    expect(screen.getByText("ElevenLabs Agents")).toBeInTheDocument();
    expect(screen.getByText("Jambonz")).toBeInTheDocument();
  });

  it("affiche les cas d'usage déployés", () => {
    render(<TrunkSipAgentsIA />);
    expect(screen.getByText("Cabinets kinésithérapeutes")).toBeInTheDocument();
    expect(screen.getByText("Dépannage automobile")).toBeInTheDocument();
    expect(screen.getByText("Accueil PME 24/7")).toBeInTheDocument();
  });

  it("affiche le processus d'intégration en 5 étapes", () => {
    render(<TrunkSipAgentsIA />);
    expect(screen.getByText("Cadrage")).toBeInTheDocument();
    expect(screen.getByText("Production")).toBeInTheDocument();
  });

  it("affiche les prérequis techniques", () => {
    render(<TrunkSipAgentsIA />);
    expect(screen.getByText(/Codec G.711/i)).toBeInTheDocument();
    expect(screen.getAllByText(/SIP REFER/i).length).toBeGreaterThan(0);
  });

  it("affiche le formulaire de contact", () => {
    render(<TrunkSipAgentsIA />);
    expect(screen.getByTestId("contact-form-mock")).toBeInTheDocument();
  });
});
