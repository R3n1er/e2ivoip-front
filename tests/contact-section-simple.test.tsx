import { render, screen } from "@testing-library/react";
import { ContactSectionSimple } from "@/components/contact-section-simple";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("@/lib/analytics/track-event", () => ({
  trackEvent: jest.fn(),
}));

jest.mock("@/components/ui/cta-button", () => ({
  CTAButton: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
  CTAButtonMarine: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("ContactSectionSimple", () => {
  it("affiche le titre avec accents français corrects", () => {
    render(<ContactSectionSimple />);

    expect(screen.getByText(/Prêt à préparer la fin du/)).toBeInTheDocument();
    expect(screen.getByText(/réseau cuivre/)).toBeInTheDocument();
    // Les accents ne doivent jamais être remplacés par leurs équivalents ASCII.
    expect(screen.queryByText(/Pret a preparer/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/reseau cuivre/)).not.toBeInTheDocument();
  });
});
