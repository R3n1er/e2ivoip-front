import React from "react";
import { renderToStaticMarkup } from "react-dom/server.node";
import RootLayout from "@/app/layout";

jest.mock("next/font/google", () => ({
  Geist: () => ({ variable: "font-geist-sans" }),
  Geist_Mono: () => ({ variable: "font-geist-mono" }),
}));

jest.mock("@/components/layout/header-simple", () => ({
  HeaderSimple: () => <header data-testid="header-simple" />,
}));

jest.mock("@/components/layout/footer", () => ({
  Footer: () => <footer data-testid="footer" />,
}));

jest.mock("@/components/chat-preoverlay", () => ({
  ChatPreOverlay: () => <div data-testid="chat-preoverlay" />,
}));

describe("RootLayout", () => {
  it("renders the main layout without loading a Hotjar wrapper", () => {
    const markup = renderToStaticMarkup(
      RootLayout({ children: <div data-testid="page-content">Page</div> })
    );

    expect(markup).toContain('data-testid="header-simple"');
    expect(markup).toContain('data-testid="footer"');
    expect(markup).toContain('data-testid="chat-preoverlay"');
    expect(markup).toContain('data-testid="page-content"');
    expect(markup).not.toContain("hotjar");
  });
});
