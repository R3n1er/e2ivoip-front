// Jest mocks
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Header } from "@/components/layout/header";

// Mock des composants Next.js
jest.mock("next/link", () => ({
  __esModule: true,
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

    const items = [
      "Qui sommes-nous",
      "Téléphonie d'entreprise",
      "Nos services",
      "Blog",
      "Devis en ligne",
      "Contact",
    ];

    items.forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  test("Les sous-menus sont correctement structurés", async () => {
    render(<Header />);

    fireEvent.mouseEnter(screen.getByTestId('nav-link-qui-sommes-nous'));
    await waitFor(() => {
      expect(screen.getByTestId('submenu-link-nos-certifications')).toBeInTheDocument();
      expect(screen.getByTestId('submenu-link-nos-partenaires')).toBeInTheDocument();
    });
    expect(screen.queryByText("Notre histoire")).not.toBeInTheDocument();
    expect(screen.queryByText("Notre équipe")).not.toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByTestId("nav-dropdown-téléphonie-d'entreprise"));
    await waitFor(() => {
      expect(screen.getByTestId('submenu-link-trunk-sip-au-compteur')).toBeInTheDocument();
      expect(screen.getByTestId('submenu-link-trunk-sip-illimité')).toBeInTheDocument();
      expect(screen.getByTestId('submenu-link-3cx-pro-dédiée')).toBeInTheDocument();
      expect(screen.getByTestId('submenu-link-3cx-smb-mutualisée')).toBeInTheDocument();
      expect(screen.getByTestId('submenu-link-pbx-yeastar')).toBeInTheDocument();
    });

    fireEvent.mouseEnter(screen.getByTestId('nav-link-nos-services'));
    await waitFor(() => {
      expect(screen.getByTestId('submenu-link-studio-attente-téléphonique')).toBeInTheDocument();
      expect(screen.getByTestId('submenu-link-assistants-vocaux-ia')).toBeInTheDocument();
      expect(screen.getByTestId('submenu-link-devis-en-ligne')).toBeInTheDocument();
    });
  });

  test("Le composant est responsive", () => {
    render(<Header />);

    // Navigation desktop
    const desktopNav = screen
      .getAllByText("Qui sommes-nous")
      .find((el) => el.closest("nav")?.classList.contains("lg:flex"));
    expect(desktopNav).toBeInTheDocument();

    // Bouton mobile
    expect(document.querySelector('.drawer.drawer-end.lg\\:hidden')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-menu-button')).toBeInTheDocument();
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

    // Le lien Mobilité a été retiré du header
  });
});
