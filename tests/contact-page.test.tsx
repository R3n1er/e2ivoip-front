import { render, screen } from "@testing-library/react";
import ContactPage from "@/app/contact/page";

// Mock Next.js components
jest.mock("next/link", () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

// Mock Lineicons (temporairement désactivé - conflit avec Next.js 15)
// jest.mock("lineicons-react", () => ({
//   LineIcon: ({ name, className, ...props }: { name: string; className?: string; [key: string]: unknown }) => (
//     <i className={`lni-${name} ${className || ''}`} data-testid={`icon-${name}`} {...props} />
//   ),
// }));

// Mock SecureEmail component
jest.mock("@/components/secure-email", () => ({
  SecureEmail: ({ children }: { children: React.ReactNode }) => <span data-testid="secure-email">{children}</span>,
}));

// Mock WorkingFAQ component
jest.mock("@/components/faq-working", () => {
  const WorkingFAQ = () => (
    <div data-testid="working-faq">
      <span role="img" aria-label="FAQ">❓</span>
      FAQ Component
    </div>
  );
  WorkingFAQ.displayName = "WorkingFAQ";
  return WorkingFAQ;
});

describe("Page Contact - DaisyUI Migration", () => {
  beforeEach(() => {
    // Mock HubSpot forms
    Object.defineProperty(window, 'hbspt', {
      value: {
        forms: {
          create: jest.fn()
        }
      },
      writable: true
    });
  });

  test("La page se rend correctement avec DaisyUI", () => {
    render(<ContactPage />);
    
    // Vérifier que les éléments principaux existent (utiliser des textes partiels)
    expect(screen.getByText("Contactez nos")).toBeInTheDocument();
    expect(screen.getByText("experts VoIP")).toBeInTheDocument();
    expect(screen.getByText("Nos coordonnées")).toBeInTheDocument();
    expect(screen.getByText(/implantations/i)).toBeInTheDocument();
  });

  test("Le formulaire de contact utilise DaisyUI", () => {
    render(<ContactPage />);
    
    // Vérifier la structure DaisyUI du formulaire
    const formCard = screen.getByTestId("contact-form-card");
    expect(formCard).toHaveClass("card", "bg-white", "shadow-[4px_4px_0_0_#1F2937]");
    
    const formTitle = screen.getByTestId("contact-form-title");
    expect(formTitle).toHaveClass("card-title", "text-2xl", "font-bold", "text-white");
    
    const formBody = screen.getByTestId("contact-form-body");
    expect(formBody).toHaveClass("card-body", "p-8");
  });

  test("Les cartes de contact utilisent DaisyUI avec des emojis temporaires", () => {
    render(<ContactPage />);
    
    // Vérifier la carte hotline
    const hotlineCard = screen.getByTestId("hotline-card");
    expect(hotlineCard).toHaveClass("card", "bg-white", "border-gray-secondary/10");
    
    // Vérifier l'emoji à la place de l'icône (solution temporaire)
    expect(screen.getByText("📞")).toBeInTheDocument();
    
    // Vérifier les informations de contact
    expect(screen.getByTestId("hotline-title")).toHaveTextContent("Hotline Support");
    expect(screen.getByTestId("hotline-phone")).toHaveTextContent("0189 560 500");
  });

  test("La carte WhatsApp utilise DaisyUI avec emojis temporaires", () => {
    render(<ContactPage />);
    
    // Vérifier la carte WhatsApp
    const whatsappCard = screen.getByTestId("whatsapp-card");
    expect(whatsappCard).toHaveClass("card", "bg-white", "hover:translate-x-[2px]");
    
    // Vérifier l'emoji WhatsApp
    expect(screen.getByText("💬")).toBeInTheDocument();
    
    // Vérifier les informations WhatsApp
    expect(screen.getByTestId("whatsapp-title")).toHaveTextContent("WhatsApp Business");
    expect(screen.getByTestId("whatsapp-phone")).toHaveTextContent("0594 96 35 00");
  });

  test("Les cartes d'implantations utilisent DaisyUI avec emojis temporaires", () => {
    render(<ContactPage />);
    
    const locations = ["france", "guyane", "guadeloupe", "martinique", "reunion"];
    
    locations.forEach(location => {
      const locationCard = screen.getByTestId(`location-${location}`);
      expect(locationCard).toHaveClass("card", "bg-white/10", "backdrop-blur-sm");
    });
    
    // Vérifier qu'il y a des emojis de localisation (5 au total)
    const locationEmojis = screen.getAllByText("📍");
    expect(locationEmojis).toHaveLength(5);
  });

  test("Les numéros de téléphone sont des liens cliquables", () => {
    render(<ContactPage />);
    
    // Vérifier les liens téléphoniques
    const phoneNumbers = [
      { testId: "phone-france", href: "tel:+33189560500" },
      { testId: "phone-guyane", href: "tel:+594594963500" },
      { testId: "phone-guadeloupe", href: "tel:+590590173500" },
      { testId: "phone-martinique", href: "tel:+596596313500" },
      { testId: "phone-reunion", href: "tel:+262263085500" }
    ];
    
    phoneNumbers.forEach(phone => {
      const phoneLink = screen.getByTestId(phone.testId);
      expect(phoneLink).toHaveAttribute("href", phone.href);
      expect(phoneLink).toHaveClass("text-white/90", "text-sm", "hover:text-white");
    });
  });

  test("Les animations et transitions DaisyUI sont appliquées", () => {
    render(<ContactPage />);
    
    // Vérifier les classes de transition
    const hotlineCard = screen.getByTestId("hotline-card");
    expect(hotlineCard).toHaveClass("transition-transform");
    
    const whatsappCard = screen.getByTestId("whatsapp-card");
    expect(whatsappCard).toHaveClass("transition-transform");
  });

  test("L'accessibilité est respectée avec les emojis", () => {
    render(<ContactPage />);
    
    // Vérifier que les emojis sont bien présents et accessibles
    expect(screen.getByText("📞")).toBeInTheDocument(); // Téléphone
    expect(screen.getByText("💬")).toBeInTheDocument(); // WhatsApp
    expect(screen.getAllByText("📍")).toHaveLength(5); // Localisation (5 implantations)
    expect(screen.getByText("❓")).toBeInTheDocument(); // FAQ
    
    // Vérifier l'attribut role sur l'emoji FAQ
    expect(screen.getByLabelText("FAQ")).toBeInTheDocument();
  });

  test("Le composant FAQ est intégré", () => {
    render(<ContactPage />);
    
    // Vérifier que le composant FAQ est présent
    expect(screen.getByTestId("working-faq")).toBeInTheDocument();
  });

  test("La structure responsive est maintenue", () => {
    render(<ContactPage />);
    
    // Vérifier les classes responsive sur les grilles principales
    const mainGrid = document.querySelector('.grid.lg\\:grid-cols-2');
    expect(mainGrid).toBeInTheDocument();
    
    const locationsGrid = document.querySelector('.grid.md\\:grid-cols-2.lg\\:grid-cols-5');
    expect(locationsGrid).toBeInTheDocument();
  });

  test("Les couleurs de marque sont conservées", () => {
    render(<ContactPage />);
    
    // Vérifier les couleurs de marque dans les gradients
    const heroSection = document.querySelector('.bg-\\[\\#091421\\]');
    expect(heroSection).toBeInTheDocument();
    
    // Vérifier la carte avec bordure rouge
    const hotlineCard = screen.getByTestId("hotline-card");
    expect(hotlineCard).toHaveClass("border-gray-secondary/10");
  });
});