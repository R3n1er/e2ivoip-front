import { render, screen, fireEvent } from "@testing-library/react";
import { HeaderSimple } from "@/components/header-simple";
import "@testing-library/jest-dom";

// Mock des composants externes
jest.mock("@/components/ui/cta-button", () => ({
  CTAButton: ({ href, icon, className, children }: any) => (
    <a href={href} className={className}>
      <button className="btn btn-primary">
        {icon && <i className={`lni lni-${icon.replace("lni-", "")}`} />}
        {children}
      </button>
    </a>
  ),
}));

describe("HeaderSimple Component", () => {
  describe("Rendering Tests", () => {
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
        "Téléphonie d'entreprise",
        "Mobilité",
        "Nos services",
        "Blog",
        "Devis en ligne",
      ];

      navItems.forEach((item) => {
        const navItem = screen.getByText(item);
        expect(navItem).toHaveClass("text-gray-700", "hover:text-red-primary");
      });
    });

    it("renders contact button with correct styling", () => {
      render(<HeaderSimple />);

      const contactButton = screen.getByText("Contact");
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

    // Lien « Mobilité » retiré du header simple

    it("has correct href for Blog link", () => {
      render(<HeaderSimple />);

      const link = screen.getByRole("link", { name: "Blog" });
      expect(link).toHaveAttribute("href", "/blog");
    });

    it("has correct href for Devis en ligne link", () => {
      render(<HeaderSimple />);

      const link = screen.getByRole("link", { name: "Devis en ligne" });
      expect(link).toHaveAttribute("href", "/devis-en-ligne");
    });

    it("has correct href for Contact button", () => {
      render(<HeaderSimple />);

      const contactLink = screen.getByRole("link", { name: /Contact/i });
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
        /Trunk SIP|3CX|PBX|Studio|Assistants/i
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

      // Vérifier que le menu mobile s'ouvre correctement
      expect(mobileButton).toHaveAttribute("aria-label", "Fermer le menu");

      // Vérifier que les éléments de navigation sont présents dans le menu mobile
      const mobileNavItems = screen.getAllByText(
        /Qui sommes-nous|Téléphonie|Nos services|Blog|Devis/i
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

    it("hides contact button on mobile screens", () => {
      render(<HeaderSimple />);

      const contactButton = screen.getByText("Contact").closest("div");
      expect(contactButton).toHaveClass("hidden", "lg:flex");
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
      expect(chevrons.length).toBe(2); // Téléphonie d'entreprise + Nos services
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
      expect(logo).toHaveClass("text-xl", "lg:text-2xl", "font-bold");
    });

    it("has proper transition classes", () => {
      render(<HeaderSimple />);

      const navItems = screen.getAllByText(
        /Qui sommes-nous|Blog|Devis/i
      );
      navItems.forEach((item) => {
        expect(item).toHaveClass("transition-colors", "duration-200");
      });
    });
  });
});
