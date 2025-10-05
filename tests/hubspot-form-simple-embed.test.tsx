import { render, screen } from "@testing-library/react";
import { HubSpotFormSimpleEmbed } from "@/components/hubspot-form-simple-embed";

const DEFAULT_FORM_ID = "312a9f67-e613-4651-9690-4586646554a0";

describe("HubSpotFormSimpleEmbed", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete (window as any).hbspt;
    document
      .querySelectorAll<HTMLScriptElement>("script[data-hubspot-loader]")
      .forEach((script) => script.remove());
  });

  it("crée immédiatement le formulaire quand HubSpot est déjà chargé", () => {
    const createMock = jest.fn();
    Object.defineProperty(window, "hbspt", {
      value: { forms: { create: createMock } },
      configurable: true,
    });

    render(<HubSpotFormSimpleEmbed />);

    const container = document.getElementById(`hubspot-form-${DEFAULT_FORM_ID}`);
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByText(/chargement du formulaire/i)).toBeNull();
    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        formId: DEFAULT_FORM_ID,
        portalId: "26878201",
        region: "eu1",
      })
    );
  });

  it("injecte le script HubSpot si nécessaire puis crée le formulaire", () => {
    delete (window as any).hbspt;
    const appendChildSpy = jest.spyOn(document.head, "appendChild");

    render(<HubSpotFormSimpleEmbed />);

    expect(appendChildSpy).toHaveBeenCalled();
    const scriptEl = appendChildSpy.mock.calls[0][0] as HTMLScriptElement;
    expect(scriptEl.tagName).toBe("SCRIPT");
    expect(scriptEl.getAttribute("src")).toBe(
      "//js-eu1.hsforms.net/forms/embed/v2.js"
    );

    const createMock = jest.fn();
    Object.defineProperty(window, "hbspt", {
      value: { forms: { create: createMock } },
      configurable: true,
    });

    scriptEl.dispatchEvent(new Event("load"));

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        formId: DEFAULT_FORM_ID,
        portalId: "26878201",
        region: "eu1",
      })
    );

    appendChildSpy.mockRestore();
    scriptEl.remove();
  });
});

