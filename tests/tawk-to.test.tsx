// Jest mocks
import { render } from "@testing-library/react";
import { TawkTo } from "@/components/tawk-to";

// Mock usePathname
const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock window.Tawk_API
const mockTawkAPI = {
  hideWidget: jest.fn(),
  showWidget: jest.fn(),
};

describe("TawkTo Component", () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock document.createElement pour retourner un vrai élément
    const originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, "createElement").mockImplementation((tagName) => {
      if (tagName === "script") {
        const script = originalCreateElement("script");
        script.type = "";
        script.async = false;
        script.src = "";
        script.charset = "";
        script.setAttribute = jest.fn();
        return script;
      }
      return originalCreateElement(tagName);
    });

    // Mock document.head.appendChild
    jest.spyOn(document.head, "appendChild").mockImplementation((node) => node);

    // Supprimer window.Tawk_API pour forcer le chargement du script
    if (window.Tawk_API) {
      (window as any).Tawk_API = undefined;
    }
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should load Tawk.to script on allowed pages", () => {
    mockUsePathname.mockReturnValue("/");

    render(<TawkTo />);

    expect(document.createElement).toHaveBeenCalledWith("script");
  });

  it("should hide widget on excluded pages", () => {
    mockUsePathname.mockReturnValue("/contact");

    // Mock window.Tawk_API pour ce test
    Object.defineProperty(window, "Tawk_API", {
      value: mockTawkAPI,
      writable: true,
    });

    render(<TawkTo />);

    expect(mockTawkAPI.hideWidget).toHaveBeenCalled();
  });

  it("should hide widget on devis-en-ligne page", () => {
    mockUsePathname.mockReturnValue("/devis-en-ligne");

    // Mock window.Tawk_API pour ce test
    Object.defineProperty(window, "Tawk_API", {
      value: mockTawkAPI,
      writable: true,
    });

    render(<TawkTo />);

    expect(mockTawkAPI.hideWidget).toHaveBeenCalled();
  });

  it("should use custom widget ID when provided", () => {
    mockUsePathname.mockReturnValue("/");

    render(<TawkTo widgetId="custom-widget-id" />);

    expect(document.createElement).toHaveBeenCalledWith("script");
  });

  it("should show widget when navigating from excluded to allowed page", () => {
    mockUsePathname.mockReturnValue("/contact");

    // Mock window.Tawk_API pour ce test
    Object.defineProperty(window, "Tawk_API", {
      value: mockTawkAPI,
      writable: true,
    });

    render(<TawkTo />);

    // Simuler navigation vers page autorisée
    mockUsePathname.mockReturnValue("/");
    render(<TawkTo />);

    expect(mockTawkAPI.showWidget).toHaveBeenCalled();
  });
});
