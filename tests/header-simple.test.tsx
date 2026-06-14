import { render, screen, fireEvent } from "@testing-library/react";
import { HeaderSimple } from "@/components/layout/header-simple";
import "@testing-library/jest-dom";

// Mock des composants externes
jest.mock("@/components/ui/cta-button", () => ({
  CTAButton: ({ href, icon: Icon, className, children }: any) => (
    <a href={href} className={className}>
      <button className="btn btn-primary">
        {Icon && <Icon size={18} />}
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

    it("renders the E2I VoIP logo image", () => {
      render(<HeaderSimple />);

      const logo = screen.getByAltText("E2I VoIP");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", "/images/Logo-e2ivoip-solo.png");
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

      const dropdown = screen.getByText("Téléphonie d'entreprise").closest("span");
      const chevron = dropdown?.querySelector("svg");

      expect(chevron).toBeInTheDocument();
    });

    it("renders Nos services dropdown with chevron icon", () => {
      render(<HeaderSimple />);

      const dropdown = screen.getByText("Nos services").closest("a");
      const chevron = dropdown?.querySelector("svg");

      expect(chevron).toBeInTheDocument();
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
      const menuIcon = mobileButton.querySelector("svg");

      expect(menuIcon).toBeInTheDocument();

      fireEvent.click(mobileButton);

      const closeIcon = mobileButton.querySelector("svg");
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
    it("uses Phosphor SVG icons", () => {
      render(<HeaderSimple />);

      const icons = document.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });

    it("has chevron SVG icons for dropdowns", () => {
      render(<HeaderSimple />);

      // Téléphonie d'entreprise n'a pas de href → rendu dans <span>
      const telephonie = screen.getByText("Téléphonie d'entreprise").closest("span");
      // Nos services a un href → rendu dans <a>
      const nosServices = screen.getByText("Nos services").closest("a");
      expect(telephonie?.querySelector("svg")).toBeInTheDocument();
      expect(nosServices?.querySelector("svg")).toBeInTheDocument();
    });

    it("has correct menu icon for mobile", () => {
      render(<HeaderSimple />);

      const mobileButton = screen.getByRole("button", { name: /menu/i });
      expect(mobileButton.querySelector("svg")).toBeInTheDocument();
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

      const logo = screen.getByAltText("E2I VoIP");
      expect(logo).toHaveClass("h-8", "lg:h-10", "w-auto");
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
