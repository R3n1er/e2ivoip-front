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

describe("Header - Délai des sous-menus", () => {
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

  test("Le composant Header se rend correctement", () => {
    render(<Header />);

    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("I")).toBeInTheDocument();

    [
      "Qui sommes-nous",
      "Téléphonie d'entreprise",
      "Contact",
    ].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  test("Les sous-menus sont présents dans la structure", async () => {
    render(<Header />);

    fireEvent.mouseEnter(screen.getByTestId('nav-link-qui-sommes-nous'));
    await waitFor(() => {
      expect(screen.getByTestId('submenu-link-nos-certifications')).toBeInTheDocument();
      expect(screen.getByTestId('submenu-link-nos-partenaires')).toBeInTheDocument();
    });

    expect(screen.queryByText("Notre histoire")).not.toBeInTheDocument();
    expect(screen.queryByText("Notre équipe")).not.toBeInTheDocument();
  });

  test("La navigation mobile est présente", () => {
    render(<Header />);

    expect(document.querySelector('.drawer.drawer-end.lg\\:hidden')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-menu-button')).toBeInTheDocument();
  });

  test("Le composant gère correctement les états de scroll", () => {
    render(<Header />);

    // Vérifier que l'écouteur de scroll est ajouté
    expect(window.addEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  test("La navigation est responsive", () => {
    render(<Header />);

    // Vérifier que la navigation desktop est présente
    const quiSommesNousElements = screen.getAllByText("Qui sommes-nous");
    const desktopNav = quiSommesNousElements.find((el) =>
      el.closest("nav")?.classList.contains("lg:flex")
    );
    expect(desktopNav).toBeInTheDocument();

    // Vérifier que le bouton mobile est présent
    expect(document.querySelector('.drawer.drawer-end.lg\\:hidden')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-menu-button')).toBeInTheDocument();
  });

  test("Le logo et la tagline sont présents", () => {
    render(<Header />);

    // Vérifier que le logo est présent
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("I")).toBeInTheDocument();

    // Vérifier que la tagline est présente (en utilisant une approche plus flexible)
    const taglineContainer = screen.getByText("E").closest("div")
      ?.parentElement?.parentElement;
    expect(taglineContainer).toHaveTextContent("Solutions de Téléphonie IP");
    expect(taglineContainer).toHaveTextContent(
      "et communications d'entreprise"
    );
  });
});
