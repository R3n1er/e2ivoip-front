import { render, screen, fireEvent } from "@testing-library/react";
import { SecureEmail, SecureMailtoButton } from "@/components/secure-email";
import { openMailto } from "@/lib/email/open-mailto";

jest.mock("@/lib/email/open-mailto", () => ({
  openMailto: jest.fn(),
}));

describe("SecureEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirige vers /contact par défaut sans mailto dans le DOM", () => {
    render(<SecureEmail address="contact" />);
    const link = screen.getByRole("link", { name: /contact@…/ });
    expect(link).toHaveAttribute("href", "/contact");
    expect(link).not.toHaveAttribute("href", expect.stringContaining("mailto:"));
    expect(screen.queryByText("contact@e2i-voip.com")).not.toBeInTheDocument();
  });

  it("ouvre mailto au clic en mode mailto", () => {
    render(<SecureEmail address="sales" mode="mailto" />);
    fireEvent.click(screen.getByRole("button", { name: /commerciaux@…/ }));
    expect(openMailto).toHaveBeenCalledWith("commerciaux@e2i-voip.com");
  });
});

describe("SecureMailtoButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("affiche un libellé personnalisé et ouvre mailto au clic", () => {
    render(
      <SecureMailtoButton address="contact" icon={require('@/lib/icons').Envelope}>
        Nous écrire
      </SecureMailtoButton>
    );

    fireEvent.click(screen.getByRole("button", { name: "Nous écrire" }));
    expect(openMailto).toHaveBeenCalledWith("contact@e2i-voip.com");
  });
});
