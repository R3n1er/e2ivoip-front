import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/header";

// Mock Next.js components
jest.mock("next/link", () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

// Mock Lineicons
jest.mock("lineicons-react", () => ({
  LineIcon: ({ name, className, ...props }: { name: string; className?: string; [key: string]: unknown }) => (
    <i className={`lni-${name} ${className || ''}`} data-testid={`icon-${name}`} {...props} />
  ),
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe("Header DaisyUI avec sous-menus", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    });
    jest.clearAllMocks();
  });

  test("Le header se rend correctement avec DaisyUI", () => {
    render(<Header />);
    
    // Vérifier que le header principal existe
    expect(screen.getByTestId("main-header")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  test("Les éléments dropdown DaisyUI sont présents", () => {
    render(<Header />);
    
    // Vérifier que les éléments avec sous-menus ont les classes DaisyUI
    const dropdownElements = document.querySelectorAll('.dropdown');
    expect(dropdownElements.length).toBeGreaterThan(0);
    
    // Vérifier que les dropdown-content existent
    const dropdownContent = document.querySelectorAll('.dropdown-content');
    expect(dropdownContent.length).toBeGreaterThan(0);
  });

  test("Les icônes Lineicons sont présentes", () => {
    render(<Header />);
    
    // Vérifier les icônes chevron-down
    expect(screen.getAllByTestId("icon-lni-chevron-down")).toHaveLength(3); // 3 menus avec sous-menus
    
    // Vérifier les icônes de téléphone
    expect(screen.getAllByTestId("icon-lni-phone")).toHaveLength(2); // desktop + mobile
  });

  test("Les liens de navigation sont correctement configurés", () => {
    render(<Header />);
    
    // Vérifier les liens principaux
    expect(screen.getByTestId("nav-link-qui-sommes-nous")).toHaveAttribute("href", "/qui-sommes-nous");
    expect(screen.getByTestId("nav-link-mobilité")).toHaveAttribute("href", "/mobilite");
    expect(screen.getByTestId("nav-link-blog")).toHaveAttribute("href", "/blog");
    
    // Vérifier les dropdowns
    expect(screen.getByTestId("nav-dropdown-téléphonie-d'entreprise")).toBeInTheDocument();
  });

  test("Les sous-menus contiennent les bons liens", () => {
    render(<Header />);
    
    // Vérifier les liens des sous-menus
    expect(screen.getByTestId("submenu-link-nos-certifications")).toBeInTheDocument();
    expect(screen.getByTestId("submenu-link-trunk-sip-au-compteur")).toBeInTheDocument();
    expect(screen.getByTestId("submenu-link-studio-attente-téléphonique")).toBeInTheDocument();
  });

  test("Le menu mobile DaisyUI fonctionne", () => {
    render(<Header />);
    
    // Vérifier la structure drawer DaisyUI
    const drawer = document.querySelector('.drawer');
    expect(drawer).toBeInTheDocument();
    
    const drawerToggle = document.querySelector('.drawer-toggle');
    expect(drawerToggle).toBeInTheDocument();
    
    const drawerContent = document.querySelector('.drawer-content');
    expect(drawerContent).toBeInTheDocument();
    
    const drawerSide = document.querySelector('.drawer-side');
    expect(drawerSide).toBeInTheDocument();
  });

  test("Les boutons DaisyUI sont correctement stylés", () => {
    render(<Header />);
    
    // Vérifier le bouton contact desktop
    const contactButton = screen.getByTestId("header-contact-button");
    expect(contactButton).toHaveClass("btn", "btn-primary");
    
    // Vérifier le bouton mobile
    const mobileButton = screen.getByTestId("mobile-menu-button");
    expect(mobileButton).toHaveClass("btn", "btn-square", "btn-ghost");
  });

  test("Les animations Framer Motion sont appliquées", () => {
    render(<Header />);
    
    // Vérifier que les éléments motion existent (via les mocks)
    const header = screen.getByTestId("main-header");
    expect(header).toBeInTheDocument();
    
    // Vérifier les sous-menus avec animations
    const submenus = document.querySelectorAll('[data-testid^="submenu-"]');
    expect(submenus.length).toBeGreaterThan(0);
  });

  test("L'accessibilité est respectée", () => {
    render(<Header />);
    
    // Vérifier les rôles
    const dropdownTriggers = document.querySelectorAll('[role="button"]');
    expect(dropdownTriggers.length).toBeGreaterThan(0);
    
    // Vérifier les aria-hidden sur les icônes décoratives
    const chevronIcons = screen.getAllByTestId("icon-lni-chevron-down");
    chevronIcons.forEach(icon => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  test("La structure des sous-menus DaisyUI est correcte", () => {
    render(<Header />);
    
    // Vérifier que les sous-menus ont la classe menu
    const menus = document.querySelectorAll('.menu');
    expect(menus.length).toBeGreaterThan(0);
    
    // Vérifier les classes DaisyUI correctes
    const dropdownContents = document.querySelectorAll('.dropdown-content');
    dropdownContents.forEach(content => {
      expect(content).toHaveClass('menu', 'bg-base-100', 'rounded-box');
    });
  });

  test("Le z-index des sous-menus est correct pour éviter les conflits", () => {
    render(<Header />);
    
    // Vérifier que les sous-menus ont un z-index élevé
    const dropdownContents = document.querySelectorAll('.dropdown-content');
    dropdownContents.forEach(content => {
      expect(content).toHaveClass('z-[9999]');
    });
  });
});