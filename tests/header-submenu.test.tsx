import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/header";

// Mock Next.js components
jest.mock("next/link", () => {
  return ({
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
  );
});

// Mock Lineicons
jest.mock("lineicons-react", () => ({
  LineIcon: ({
    name,
    className,
    ...props
  }: {
    name: string;
    className?: string;
    [key: string]: unknown;
  }) => (
    <i
      className={`lni-${name} ${className || ""}`}
      data-testid={`icon-${name}`}
      {...props}
    />
  ),
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    header: ({ children, ...props }: any) => (
      <header {...props}>{children}</header>
    ),
    div: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe("Header avec sous-menus DaisyUI", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });

    // Reset all mocks
    jest.clearAllMocks();
  });

  test("Le header se rend avec DaisyUI et Lineicons", () => {
    render(<Header />);

    // Vérifier le logo avec data-testid
    expect(screen.getByTestId("logo")).toBeInTheDocument();

    // Vérifier les icônes Lineicons
    expect(
      screen.getByTestId("icon-chevron-down-qui-sommes-nous")
    ).toBeInTheDocument();
    const phoneIcons = screen.getAllByTestId("icon-lni-phone");
    expect(phoneIcons.length).toBeGreaterThan(0);

    // Vérifier les boutons DaisyUI
    expect(screen.getByTestId("header-contact-button")).toHaveClass("btn");
  });

  test("Les liens de navigation principaux sont présents", () => {
    render(<Header />);

    // Vérifier les liens principaux avec data-testid
    expect(screen.getByTestId("nav-link-qui-sommes-nous")).toBeInTheDocument();
    expect(
      screen.getByTestId("nav-dropdown-téléphonie-d'entreprise")
    ).toBeInTheDocument();
    // Lien « Mobilité » retiré du header
    expect(screen.getByTestId("nav-link-nos-services")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-blog")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-devis-en-ligne")).toBeInTheDocument();
  });

  test("Les sous-menus s'affichent au hover", async () => {
    render(<Header />);

    // Tester le sous-menu "Qui sommes-nous"
    const quiSommesNousLink = screen.getByTestId("nav-link-qui-sommes-nous");
    await user.hover(quiSommesNousLink);

    await waitFor(() => {
      expect(screen.getByTestId("submenu-qui-sommes-nous")).toBeInTheDocument();
    });

    // Vérifier les liens du sous-menu
    expect(
      screen.getByTestId("submenu-link-nos-certifications")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("submenu-link-nos-partenaires")
    ).toBeInTheDocument();
  });

  test("Les sous-menus téléphonie s'affichent correctement", async () => {
    render(<Header />);

    // Tester le sous-menu "Téléphonie d'entreprise"
    const telephonieDrop = screen.getByTestId(
      "nav-dropdown-téléphonie-d'entreprise"
    );
    await user.hover(telephonieDrop);

    await waitFor(() => {
      expect(
        screen.getByTestId("submenu-téléphonie-d'entreprise")
      ).toBeInTheDocument();
    });

    // Vérifier tous les liens du sous-menu téléphonie
    expect(
      screen.getByTestId("submenu-link-trunk-sip-au-compteur")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("submenu-link-trunk-sip-illimité")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("submenu-link-3cx-pro-dédiée")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("submenu-link-3cx-smb-mutualisée")
    ).toBeInTheDocument();
    expect(screen.getByTestId("submenu-link-pbx-yeastar")).toBeInTheDocument();
  });

  test("Les sous-menus services s'affichent correctement", async () => {
    render(<Header />);

    // Tester le sous-menu "Nos services"
    const servicesLink = screen.getByTestId("nav-link-nos-services");
    await user.hover(servicesLink);

    await waitFor(() => {
      expect(screen.getByTestId("submenu-nos-services")).toBeInTheDocument();
    });

    // Vérifier les liens du sous-menu services
    expect(
      screen.getByTestId("submenu-link-studio-attente-téléphonique")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("submenu-link-assistants-vocaux-ia")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("submenu-link-devis-en-ligne")
    ).toBeInTheDocument();
  });

  test("Le menu mobile DaisyUI fonctionne", async () => {
    render(<Header />);

    // Vérifier le bouton du menu mobile
    const mobileMenuButton = screen.getByTestId("mobile-menu-button");
    expect(mobileMenuButton).toBeInTheDocument();
    expect(mobileMenuButton).toHaveClass("btn");

    // Cliquer pour ouvrir le menu mobile
    await user.click(mobileMenuButton);

    // Vérifier que le menu mobile s'ouvre
    await waitFor(() => {
      expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
    });

    // Vérifier les liens mobiles
    expect(
      screen.getByTestId("mobile-link-qui-sommes-nous")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mobile-contact-button")).toHaveClass("btn");
  });

  test("Les sous-menus mobiles s'affichent", () => {
    render(<Header />);

    // Dans le menu mobile, les sous-menus doivent être visibles directement
    expect(
      screen.getByTestId("mobile-submenu-nos-certifications")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mobile-submenu-trunk-sip-au-compteur")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("mobile-submenu-studio-attente-téléphonique")
    ).toBeInTheDocument();
  });

  test("L'accessibilité des icônes est respectée", () => {
    render(<Header />);

    // Vérifier les icônes avec aria-hidden
    const chevronIcons = screen.getAllByTestId(/icon-chevron-down/);
    chevronIcons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    // Vérifier les icônes avec aria-label dans le menu mobile
    const mobileMenuIcon = screen.getByTestId("icon-lni-menu");
    expect(mobileMenuIcon).toHaveAttribute("aria-label", "Ouvrir le menu");
    expect(mobileMenuIcon).toHaveAttribute("role", "img");
  });

  test("Les styles DaisyUI sont appliqués", () => {
    render(<Header />);

    // Vérifier les classes DaisyUI
    expect(screen.getByTestId("header-contact-button")).toHaveClass(
      "btn",
      "btn-primary"
    );
    expect(screen.getByTestId("mobile-contact-button")).toHaveClass(
      "btn",
      "btn-primary"
    );
    expect(screen.getByTestId("mobile-menu-button")).toHaveClass(
      "btn",
      "btn-square",
      "btn-ghost"
    );
  });

  test("Les liens pointent vers les bonnes URLs", () => {
    render(<Header />);

    // Vérifier les URLs des liens principaux
    expect(screen.getByTestId("nav-link-qui-sommes-nous")).toHaveAttribute(
      "href",
      "/qui-sommes-nous"
    );
    // Lien « Mobilité » retiré du header
    expect(screen.getByTestId("nav-link-blog")).toHaveAttribute(
      "href",
      "/blog"
    );

    // Vérifier les URLs des boutons contact
    expect(
      screen.getByTestId("header-contact-button").closest("a")
    ).toHaveAttribute("href", "/contact");
    expect(
      screen.getByTestId("mobile-contact-button").closest("a")
    ).toHaveAttribute("href", "/contact");
  });

  test("La transformation de l'icône chevron fonctionne", async () => {
    render(<Header />);

    // Tester la rotation de l'icône chevron
    const quiSommesNousLink = screen.getByTestId("nav-link-qui-sommes-nous");
    const chevronIcon = screen.getByTestId("icon-chevron-down-qui-sommes-nous");

    // Vérifier l'état initial
    expect(chevronIcon).not.toHaveClass("rotate-180");

    // Hover pour ouvrir le sous-menu
    await user.hover(quiSommesNousLink);

    await waitFor(() => {
      expect(chevronIcon).toHaveClass("rotate-180");
    });
  });
});
