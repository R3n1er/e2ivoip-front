// Jest mocks
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/header";

// Mock des composants Next.js
jest.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock de framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    header: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <header {...props}>{children}</header>,
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...props}>{children}</div>,
    button: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock des composants UI
jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <button {...props}>{children}</button>,
}));

jest.mock("@/components/ui/sheet", () => ({
  Sheet: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <div {...props}>{children}</div>,
  SheetContent: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <div {...props}>{children}</div>,
  SheetTrigger: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => <div {...props}>{children}</div>,
}));

describe("Header - Test d'intégration", () => {
  beforeEach(() => {
    // Mock de window.scrollY
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });

    // Mock des événements de scroll
    global.window.addEventListener = jest.fn();
    global.window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("Le composant Header se rend sans erreur", () => {
    expect(() => render(<Header />)).not.toThrow();
  });

  test("Tous les éléments de navigation sont présents", () => {
    render(<Header />);

    // Navigation principale
    expect(screen.getAllByText("Qui sommes-nous")).toHaveLength(2);
    expect(screen.getAllByText("Téléphonie d'entreprise")).toHaveLength(2);
    expect(screen.getAllByText("Mobilité")).toHaveLength(2);
    expect(screen.getAllByText("Nos services")).toHaveLength(2);
    expect(screen.getAllByText("Blog")).toHaveLength(2);
    expect(screen.getAllByText("Devis en ligne")).toHaveLength(3); // Principal + Sous-menu + Mobile
    expect(screen.getAllByText("Contact")).toHaveLength(2);
  });

  test("Les sous-menus sont correctement structurés", () => {
    render(<Header />);

    // Sous-menu "Qui sommes-nous"
    expect(screen.getByText("Nos certifications")).toBeInTheDocument();
    expect(screen.getByText("Nos partenaires")).toBeInTheDocument();
    
    // Vérifier que "Notre histoire" et "Notre équipe" ne sont PAS dans le sous-menu
    expect(screen.queryByText("Notre histoire")).not.toBeInTheDocument();
    expect(screen.queryByText("Notre équipe")).not.toBeInTheDocument();

    // Sous-menu "Téléphonie d'entreprise"
    expect(screen.getByText("Trunk SIP au compteur")).toBeInTheDocument();
    expect(screen.getByText("Trunk SIP illimité")).toBeInTheDocument();
    expect(screen.getByText("3CX PRO dédiée")).toBeInTheDocument();
    expect(screen.getByText("3CX SMB mutualisée")).toBeInTheDocument();
    expect(screen.getByText("PBX Yeastar")).toBeInTheDocument();

    // Sous-menu "Nos services"
    expect(screen.getByText("Studio attente téléphonique")).toBeInTheDocument();
    expect(screen.getByText("Assistants vocaux IA")).toBeInTheDocument();
    
    // "Devis en ligne" apparaît dans le sous-menu "Nos services"
    const devisEnLigneElements = screen.getAllByText("Devis en ligne");
    expect(devisEnLigneElements).toHaveLength(3);
  });

  test("Le composant est responsive", () => {
    render(<Header />);

    // Navigation desktop
    const desktopNav = screen
      .getAllByText("Qui sommes-nous")
      .find((el) => el.closest("nav")?.classList.contains("lg:flex"));
    expect(desktopNav).toBeInTheDocument();

    // Bouton mobile
    const mobileButton = screen
      .getAllByRole("button")
      .find((button) => button.classList.contains("lg:hidden"));
    expect(mobileButton).toBeInTheDocument();
  });

  test("Le logo et la branding sont présents", () => {
    render(<Header />);

    // Logo E2I
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("I")).toBeInTheDocument();

    // Tagline
    const taglineContainer = screen.getByText("E").closest("div")
      ?.parentElement?.parentElement;
    expect(taglineContainer).toHaveTextContent("Solutions de Téléphonie IP");
    expect(taglineContainer).toHaveTextContent(
      "et communications d'entreprise"
    );
  });

  test("Les liens de navigation pointent vers les bonnes URLs", () => {
    render(<Header />);

    // Vérifier quelques liens clés
    const quiSommesNousElements = screen.getAllByText("Qui sommes-nous");
    const quiSommesNousLink = quiSommesNousElements.find(
      (el) => el.closest("a")?.getAttribute("href") === "/qui-sommes-nous"
    );
    expect(quiSommesNousLink).toBeInTheDocument();

    const mobiliteElements = screen.getAllByText("Mobilité");
    const mobiliteLink = mobiliteElements.find(
      (el) => el.closest("a")?.getAttribute("href") === "/mobilite"
    );
    expect(mobiliteLink).toBeInTheDocument();
  });
});
