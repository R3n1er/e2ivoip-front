// Jest mocks
import { render, screen } from "@testing-library/react";
import { ServicesSectionSimple } from "@/components/services-section-simple";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      style,
      initial: _i,
      animate: _a,
      transition: _t,
      variants: _v,
      whileInView: _w,
      whileHover: _h,
      whileTap: _wt,
      viewport: _vp,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
      [key: string]: unknown;
    }) => (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    ),
    button: ({
      children,
      className,
      style,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
      [key: string]: unknown;
    }) => (
      <button className={className} style={style} {...props}>
        {children}
      </button>
    ),
    li: ({
      children,
      className,
      style,
      ...props
    }: {
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
      [key: string]: unknown;
    }) => (
      <li className={className} style={style} {...props}>
        {children}
      </li>
    ),
  },
}));

describe("ServicesSectionSimple - Charte Graphique PRD (Icônes Corrigées)", () => {
  it("affiche le titre avec les couleurs PRD", () => {
    render(<ServicesSectionSimple />);

    // Vérifier que le titre principal est présent
    expect(screen.getByText(/Nos solutions de/)).toBeInTheDocument();
    expect(screen.getByText("téléphonie IP")).toBeInTheDocument();
  });

  it("affiche tous les services de téléphonie IP", () => {
    render(<ServicesSectionSimple />);

    // Vérifier que tous les services sont présents.
    // Les deux cartes 3CX (SMB mutualisée et PRO dédiée) sont réunies sous une
    // seule carte « Standard téléphonique 3CX » (arbitrage Alban, 2026-09-19).
    expect(screen.getByText("Standard téléphonique 3CX")).toBeInTheDocument();
    expect(screen.getByText("Trunk SIP DOM")).toBeInTheDocument();
    expect(screen.queryByText("3CX SMB PRO")).not.toBeInTheDocument();
    expect(screen.queryByText("3CX PRO Cloud")).not.toBeInTheDocument();
    // « Solutions Mobilité » retiré du périmètre
    expect(screen.queryByText("Solutions Mobilité")).not.toBeInTheDocument();
    expect(screen.getByText("Trunk SIP agents IA")).toBeInTheDocument();
    expect(screen.getByText("Studio d'Enregistrement")).toBeInTheDocument();
  });

  it("affiche les badges de service", () => {
    render(<ServicesSectionSimple />);

    expect(screen.getByText("Populaire")).toBeInTheDocument();
    expect(screen.getByText("Idéal PME")).toBeInTheDocument();
    expect(screen.getByText("Innovation")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("affiche la section CTA avec les couleurs PRD", () => {
    render(<ServicesSectionSimple />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Nos solutions de téléphonie IP/i,
      })
    ).toBeInTheDocument();
  });

  it("utilise uniquement les couleurs PRD pour les icônes", () => {
    const { container } = render(<ServicesSectionSimple />);

    // Vérifier que les icônes utilisent les classes de couleurs PRD
    const redPrimaryIcons = container.querySelectorAll(".text-red-primary");
    expect(redPrimaryIcons.length).toBeGreaterThan(0);

    // Vérifier que les badges utilisent les bonnes classes
    const primaryBadges = container.querySelectorAll(".badge.badge-primary");
    expect(primaryBadges.length).toBeGreaterThan(0);

    // Vérifier qu'aucune autre couleur non-PRD n'est utilisée pour les icônes
    const nonPRDIcons = container.querySelectorAll(
      ".text-green-600, .text-purple-600, .text-orange-600, .text-indigo-600"
    );
    expect(nonPRDIcons.length).toBe(0);
  });

  it("les boutons CTA sont présents et fonctionnels", () => {
    render(<ServicesSectionSimple />);

    const ctaLinks = screen.getAllByRole("link", {
      name: /En savoir plus/i,
    });
    expect(ctaLinks.length).toBeGreaterThan(0);
  });

  it("pointe vers les URLs produit canoniques", () => {
    render(<ServicesSectionSimple />);

    const hrefs = screen
      .getAllByRole("link", { name: /En savoir plus/i })
      .map((link) => link.getAttribute("href"));

    expect(hrefs).toContain("/telephonie-3cx");
    expect(hrefs).toContain("/studio-attente");
    expect(hrefs).not.toContain("/telephonie-entreprise/3cx-smb-mutualisee");
    expect(hrefs).not.toContain("/3cx-pro");
    expect(hrefs).not.toContain("/nos-services/studio-attente");
  });

  it("affiche les bénéfices clés avec les bonnes couleurs", () => {
    render(<ServicesSectionSimple />);

    expect(screen.getByText(/Économies jusqu'à 20%/)).toBeInTheDocument();
    // Bénéfice « Mobilité intégrée » retiré du périmètre.
    // « Canaux dimensionnés à votre trafic » reformulé en langage de
    // dirigeant : « canal » n'était jamais expliqué nulle part sur la home.
    expect(
      screen.getByText(/Autant d'appels simultanés que nécessaire/),
    ).toBeInTheDocument();
    expect(screen.getByText(/BYOC compatible/i)).toBeInTheDocument();
  });
});
