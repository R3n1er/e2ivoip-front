import { render, screen } from "@testing-library/react";
import { HubSpotForm } from "@/components/hubspot";

describe("HubSpotForm container id", () => {
  beforeEach(() => {
    (window as any).hbspt = { forms: { create: jest.fn() } };
    document.body.innerHTML = "";
  });

  it("uses a stable, sanitized id between renders", () => {
    const { rerender } = render(<HubSpotForm />);

    const container = screen.getByTestId("hubspot-form-container");
    const generatedId = container.getAttribute("id");

    expect(generatedId).toBe(
      "hubspot-form-312a9f67-e613-4651-9690-4586646554a0-hubspot-form"
    );

    rerender(<HubSpotForm />);
    const rerenderedId = screen
      .getByTestId("hubspot-form-container")
      .getAttribute("id");

    expect(rerenderedId).toBe(generatedId);
  });

  it("uses the variant test id to build a deterministic container id", () => {
    render(<HubSpotForm testId="quick-contact-form" />);
    const container = screen.getByTestId("quick-contact-form-container");

    expect(container.getAttribute("id")).toBe(
      "hubspot-form-312a9f67-e613-4651-9690-4586646554a0-quick-contact-form"
    );
  });
});
