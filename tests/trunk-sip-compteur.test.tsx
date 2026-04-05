import { render, screen } from "@testing-library/react";
import TrunkSIPCompteur from "../app/telephonie-entreprise/trunk-sip-compteur/page";

// Mock des composants Next.js
jest.mock("next/image", () => {
  return function MockImage({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) {
    return <img src={src} alt={alt} {...props} />;
  };
});

jest.mock("next/link", () => {
  return function MockLink({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe("Page Trunk SIP au Compteur", () => {
  test("se rend correctement", () => {
    render(<TrunkSIPCompteur />);
    const titleElements = screen.getAllByText(/Trunk SIP au compteur/i);
    expect(titleElements.length).toBeGreaterThan(0);
  });

  test("affiche le titre principal", () => {
    render(<TrunkSIPCompteur />);
    const titleElements = screen.getAllByText(/Trunk SIP au compteur/i);
    expect(titleElements.length).toBeGreaterThan(0);
  });

  test("affiche la description principale", () => {
    render(<TrunkSIPCompteur />);
    expect(
      screen.getByText(/Payez uniquement vos consommations réelles/i)
    ).toBeInTheDocument();
  });

  test("affiche les avantages clés", () => {
    render(<TrunkSIPCompteur />);
    const facturationElements = screen.getAllByText(
      /Facturation à la seconde/i
    );
    expect(facturationElements.length).toBeGreaterThan(0);

    expect(screen.getByText(/Numéros locaux gratuits/i)).toBeInTheDocument();

    const supportElements = screen.getAllByText(/Support technique local/i);
    expect(supportElements.length).toBeGreaterThan(0);
  });

  test("affiche les solutions proposées", () => {
    render(<TrunkSIPCompteur />);
    // Vérifier que la section est présente en cherchant des éléments partiels
    const trunkElements = screen.getAllByText(/Trunk SIP au compteur/i);
    expect(trunkElements.length).toBeGreaterThan(0);

    const payezElements = screen.getAllByText(
      /payez seulement ce que vous consommez/i
    );
    expect(payezElements.length).toBeGreaterThan(0);
  });

  test("affiche la section des tarifs détaillés des appels à la minute", () => {
    render(<TrunkSIPCompteur />);
    // Le titre est dans un seul élément h3
    expect(
      screen.getByText(/Tarifs des appels à la minute/i)
    ).toBeInTheDocument();
  });

  test("affiche le tableau des coûts avec tous les tarifs", () => {
    render(<TrunkSIPCompteur />);
    expect(screen.getByText(/France Fixe/i)).toBeInTheDocument();
    expect(screen.getByText(/France Mobile/i)).toBeInTheDocument();
    expect(screen.getByText(/DOM Fixe/i)).toBeInTheDocument();
    expect(screen.getByText(/DOM Mobile/i)).toBeInTheDocument();
    expect(screen.getByText(/Création numéro SDA/i)).toBeInTheDocument();

    const portabiliteElements = screen.getAllByText(/Portabilité/i);
    expect(portabiliteElements.length).toBeGreaterThan(0);
  });

  test("affiche les informations sur les DOM avec les territoires", () => {
    render(<TrunkSIPCompteur />);
    // Vérifier que les territoires DOM sont mentionnés dans le contexte des tarifs
    const guadeloupeElements = screen.getAllByText(/Guadeloupe/i);
    expect(guadeloupeElements.length).toBeGreaterThan(0);

    const martiniqueElements = screen.getAllByText(/Martinique/i);
    expect(martiniqueElements.length).toBeGreaterThan(0);

    const guyaneElements = screen.getAllByText(/Guyane/i);
    expect(guyaneElements.length).toBeGreaterThan(0);

    const reunionElements = screen.getAllByText(/Réunion/i);
    expect(reunionElements.length).toBeGreaterThan(0);

    const mayotteElements = screen.getAllByText(/Mayotte/i);
    expect(mayotteElements.length).toBeGreaterThan(0);
  });

  test('affiche les indications "Sur devis"', () => {
    render(<TrunkSIPCompteur />);
    const surDevisElements = screen.getAllByText(/Sur devis/i);
    expect(surDevisElements.length).toBeGreaterThan(0);
  });

  test("utilise les couleurs de la charte graphique", () => {
    render(<TrunkSIPCompteur />);
    // Vérifier que les classes de couleurs personnalisées sont utilisées
    const container = document.querySelector(
      ".bg-gradient-to-br.from-blue-50.to-red-50"
    );
    expect(container).toBeInTheDocument();
  });

  test("affiche la section de compatibilité IPBX", () => {
    render(<TrunkSIPCompteur />);
    // Vérifier que la section est présente en cherchant des éléments partiels
    const compatibleElements = screen.getAllByText(/Compatible avec/i);
    expect(compatibleElements.length).toBeGreaterThan(0);

    const ipbxElements = screen.getAllByText(/tous les IPBX/i);
    expect(ipbxElements.length).toBeGreaterThan(0);
  });

  test("affiche les marques compatibles", () => {
    render(<TrunkSIPCompteur />);
    // Utiliser getAllByText car 3CX apparaît plusieurs fois
    const c3xElements = screen.getAllByText(/3CX/i);
    expect(c3xElements.length).toBeGreaterThan(0);

    const yeastarElements = screen.getAllByText(/Yeastar/i);
    expect(yeastarElements.length).toBeGreaterThan(0);

    const grandstreamElements = screen.getAllByText(/Grandstream/i);
    expect(grandstreamElements.length).toBeGreaterThan(0);
  });

  test("affiche la section CTA finale", () => {
    render(<TrunkSIPCompteur />);
    // Vérifier que la section est présente en cherchant des éléments partiels
    const calculezElements = screen.getAllByText(/Calculez vos/i);
    expect(calculezElements.length).toBeGreaterThan(0);

    const economiesElements = screen.getAllByText(/économies/i);
    expect(economiesElements.length).toBeGreaterThan(0);
  });

  test("affiche les boutons d'action", () => {
    render(<TrunkSIPCompteur />);
    const devisButtons = screen.getAllByText(/Calculer mes économies/i);
    expect(devisButtons.length).toBeGreaterThan(0);

    const expertButtons = screen.getAllByText(/Parler à un expert/i);
    expect(expertButtons.length).toBeGreaterThan(0);
  });

  test("respecte la ligne éditoriale avec les mots-clés DOM-TOM", () => {
    render(<TrunkSIPCompteur />);

    // Vérifier que les éléments sont présents (même si dans des textes divisés)
    const domElements = screen.getAllByText(/DOM/i);
    expect(domElements.length).toBeGreaterThan(0);

    const antillesElements = screen.getAllByText(/Antilles/i);
    expect(antillesElements.length).toBeGreaterThan(0);

    const guyaneElements = screen.getAllByText(/Guyane/i);
    expect(guyaneElements.length).toBeGreaterThan(0);

    const reunionElements = screen.getAllByText(/Réunion/i);
    expect(reunionElements.length).toBeGreaterThan(0);

    // Vérifier la présence des sections plutôt que des textes spécifiques
    expect(screen.getByText(/Opérateur SIP DOM/i)).toBeInTheDocument();
  });
});
