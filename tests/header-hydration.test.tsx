// Jest mocks
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Header } from "@/components/header";

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

describe("Header - Test d'hydratation", () => {
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

  test("Le composant Header se rend sans erreurs d'hydratation", () => {
    // Vérifier que le composant se rend sans erreur
    expect(() => render(<Header />)).not.toThrow();

    // Vérifier que les éléments sont présents
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("I")).toBeInTheDocument();
  });

  test("Les classes CSS sont correctement appliquées", () => {
    render(<Header />);

    // Vérifier que les classes CSS sont présentes
    const header = screen.getByText("E").closest("header");
    expect(header).toHaveClass("fixed", "top-0", "w-full", "z-[100]");

    const logo = screen.getByText("E").closest("div");
    expect(logo).toHaveClass("text-xl", "lg:text-2xl", "font-bold");
  });

  test("La navigation est correctement structurée", () => {
    render(<Header />);

    // Vérifier que la navigation desktop a les bonnes classes
    const desktopNav = screen
      .getAllByText("Qui sommes-nous")
      .find((el) => el.closest("nav")?.classList.contains("lg:flex"));
    expect(desktopNav).toBeInTheDocument();

    // Vérifier que la structure du menu mobile DaisyUI est présente
    expect(document.querySelector('.drawer.drawer-end.lg\\:hidden')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-menu-button')).toBeInTheDocument();
  });

  test("Les sous-menus sont présents dans le DOM", async () => {
    render(<Header />);

    fireEvent.mouseEnter(screen.getByTestId('nav-link-qui-sommes-nous'));

    await waitFor(() => {
      expect(screen.getByTestId('submenu-link-nos-certifications')).toBeInTheDocument();
      expect(screen.getByTestId('submenu-link-nos-partenaires')).toBeInTheDocument();
    });

    expect(screen.queryByText("Notre histoire")).not.toBeInTheDocument();
    expect(screen.queryByText("Notre équipe")).not.toBeInTheDocument();
  });

  test("Le composant gère les états de scroll", () => {
    render(<Header />);

    // Vérifier que l'écouteur de scroll est ajouté
    expect(window.addEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  test("La structure des liens est correcte", () => {
    render(<Header />);

    // Vérifier que les liens ont les bonnes URLs
    const quiSommesNousElements = screen.getAllByText("Qui sommes-nous");
    const quiSommesNousLink = quiSommesNousElements.find(
      (el) => el.closest("a")?.getAttribute("href") === "/qui-sommes-nous"
    );
    expect(quiSommesNousLink).toBeInTheDocument();

    // Lien « Mobilité » retiré du header
  });
});
