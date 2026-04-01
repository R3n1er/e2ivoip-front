import { render, screen, fireEvent } from "@testing-library/react";
import { HeaderSimple } from "@/components/layout/header-simple";
import "@testing-library/jest-dom";

describe("HeaderSimple Component", () => {
  describe("Rendering Tests", () => {
    it("utilise un conteneur large et des marges horizontales réduites", () => {
      render(<HeaderSimple />);

      const container = screen.getByTestId("header-simple-container");
      expect(container).toHaveClass("max-w-screen-2xl", "mx-auto", "w-full");
      expect(container).toHaveClass("px-2", "sm:px-3", "lg:px-4");
    });

    it("renders header with permanent white background", () => {
      render(<HeaderSimple />);

      const header = screen.getByRole("banner");
      expect(header).toHaveClass(
        "bg-white/95",
        "backdrop-blur-md",
        "shadow-lg",
        "border-b",
        "border-gray-200"
      );
    });

    it("renders E2I logo with correct colors", () => {
      render(<HeaderSimple />);

      const logoE = screen.getByText("E");
      const logo2 = screen.getByText("2");
      const logoI = screen.getByText("I");

      expect(logoE).toHaveClass("text-red-primary");
      expect(logo2).toHaveClass("text-blue-marine");
      expect(logoI).toHaveClass("text-red-primary");
    });

    it("renders company description with correct styling", () => {
      render(<HeaderSimple />);

      const description = screen.getByText(
        "Solutions de Téléphonie IP et communications d'entreprise"
      );
      expect(description).toHaveClass("text-gray-secondary");
    });

    it("renders all navigation items with correct styling", () => {
      render(<HeaderSimple />);

      const navItems = [
        "Qui sommes-nous",
        "Trunk SIP",
        "Téléphonie d'entreprise",
        "Nos services",
        "Blog",
      ];

      navItems.forEach((item) => {
        const navItem = screen.getByText(item);
        expect(navItem).toHaveClass("text-gray-700", "hover:text-red-primary");
      });
    });

    it("renders contact button with correct styling", () => {
      render(<HeaderSimple />);

      const contactButton = screen.getByTestId("header-simple-contact-link");
      expect(contactButton).toBeInTheDocument();
    });

    it("renders mobile menu button with correct styling", () => {
      render(<HeaderSimple />);

      const mobileButton = screen.getByRole("button", { name: /menu/i });
      expect(mobileButton).toHaveClass("lg:hidden");
    });
  });

  describe("Navigation Functionality", () => {
    it("has correct href for Qui sommes-nous link", () => {
      render(<HeaderSimple />);

      const link = screen.getByRole("link", { name: "Qui sommes-nous" });
      expect(link).toHaveAttribute("href", "/qui-sommes-nous");
    });

    it("has correct href for Trunk SIP overview link", () => {
      render(<HeaderSimple />);

      const link = screen.getByTestId("header-simple-nav-trunk-sip");
      expect(link).toHaveAttribute("href", "/telephonie-entreprise/trunk-sip");
    });

    it("has correct href for Blog link", () => {
      render(<HeaderSimple />);

      const link = screen.getByRole("link", { name: "Blog" });
      expect(link).toHaveAttribute("href", "/blog");
    });

    it("has correct href for Devis en ligne link", () => {
      render(<HeaderSimple />);

      const link = screen.getByTestId("header-simple-devis-link");
      expect(link).toHaveAttribute("href", "/devis-en-ligne");
    });

    it("has correct href for Contact button", () => {
      render(<HeaderSimple />);

      const contactLink = screen.getByTestId("header-simple-contact-link");
      expect(contactLink).toHaveAttribute("href", "/contact");
    });
  });

  describe("Dropdown Menus", () => {
    it("renders Téléphonie d'entreprise dropdown with chevron icon", () => {
      render(<HeaderSimple />);

      const dropdown = screen.getByText("Téléphonie d'entreprise");
      const chevron = dropdown.querySelector(".lni-chevron-down");

      expect(chevron).toBeInTheDocument();
      expect(chevron).toHaveClass("text-gray-600");
    });

    it("renders Nos services dropdown with chevron icon", () => {
      render(<HeaderSimple />);

      const dropdown = screen.getByText("Nos services");
      const chevron = dropdown.querySelector(".lni-chevron-down");

      expect(chevron).toBeInTheDocument();
      expect(chevron).toHaveClass("text-gray-600");
    });

    it("dropdown items have correct hover states", () => {
      render(<HeaderSimple />);

      const dropdownItems = screen.getAllByText(
        /Trunk SIP au compteur|3CX|PBX|Studio|Assistants/i
      );

      dropdownItems.forEach((item) => {
        expect(item).toHaveClass("hover:bg-red-50", "hover:text-red-primary");
      });
    });
  });

  describe("Mobile Menu Functionality", () => {
    it("toggles mobile menu when button is clicked", () => {
      render(<HeaderSimple />);

      const mobileButton = screen.getByRole("button", { name: /menu/i });
      const menuIcon = mobileButton.querySelector(".lni-menu");

      expect(menuIcon).toBeInTheDocument();

      fireEvent.click(mobileButton);

      const closeIcon = mobileButton.querySelector(".lni-close");
      expect(closeIcon).toBeInTheDocument();
    });

    it("mobile menu items have correct styling", () => {
      render(<HeaderSimple />);

      const mobileButton = screen.getByRole("button", { name: /menu/i });
      fireEvent.click(mobileButton);

      expect(mobileButton).toHaveAttribute("aria-label", "Fermer le menu");

      const mobileNavItems = screen.getAllByText(
        /Qui sommes-nous|Trunk SIP|Téléphonie|Nos services|Blog/i
      );
      expect(mobileNavItems.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility Tests", () => {
    it("has proper ARIA labels for navigation", () => {
      render(<HeaderSimple />);

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("has proper button roles for interactive elements", () => {
      render(<HeaderSimple />);

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("has proper link roles for navigation items", () => {
      render(<HeaderSimple />);

      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe("Responsive Design Tests", () => {
    it("hides mobile menu button on large screens", () => {
      render(<HeaderSimple />);

      const mobileButton = screen.getByRole("button", { name: /menu/i });
      expect(mobileButton).toHaveClass("lg:hidden");
    });

    it("hides navigation on mobile screens", () => {
      render(<HeaderSimple />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("hidden", "lg:flex");
    });

    it("affiche le bloc CTA en flex (toujours visible dans la barre)", () => {
      render(<HeaderSimple />);

      const cta = screen.getByTestId("header-simple-cta-desktop");
      expect(cta).toHaveClass("flex", "shrink-0");
    });
  });

  describe("Icon Usage Tests", () => {
    it("uses Lineicons for all icons", () => {
      render(<HeaderSimple />);

      const icons = document.querySelectorAll(".lni");
      expect(icons.length).toBeGreaterThan(0);

      icons.forEach((icon) => {
        expect(icon.className).toMatch(/lni-/);
      });
    });

    it("has correct chevron icons for dropdowns", () => {
      render(<HeaderSimple />);

      const chevrons = document.querySelectorAll(".lni-chevron-down");
      expect(chevrons.length).toBe(3);
    });

    it("has correct menu icons for mobile", () => {
      render(<HeaderSimple />);

      const menuIcon = document.querySelector(".lni-menu");
      expect(menuIcon).toBeInTheDocument();
    });
  });

  describe("CSS Classes Validation", () => {
    it("uses DaisyUI classes where appropriate", () => {
      render(<HeaderSimple />);

      const header = screen.getByRole("banner");
      expect(header).toHaveClass("fixed", "top-0", "w-full", "z-[100]");
    });

    it("uses Tailwind utility classes correctly", () => {
      render(<HeaderSimple />);

      const logo = screen.getByText("E").closest("div");
      expect(logo).toHaveClass(
        "text-xl",
        "sm:text-2xl",
        "lg:text-3xl",
        "font-bold",
        "leading-none"
      );
    });

    it("has proper transition classes", () => {
      render(<HeaderSimple />);

      const navItems = screen.getAllByText(/Qui sommes-nous|Blog|Trunk SIP/i);
      navItems.forEach((item) => {
        expect(item).toHaveClass("transition-colors", "duration-200");
      });
    });
  });
});
