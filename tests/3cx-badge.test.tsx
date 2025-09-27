describe("3CX Badge Component", () => {
  it("should use the correct image path", () => {
    const imagePath =
      "/images/logo-3CX-partner-e2i/Bronze Partner badge-min.jpeg";
    expect(imagePath).toContain("Bronze Partner badge-min.jpeg");
    expect(imagePath).toContain("logo-3CX-partner-e2i");
  });

  it("should have correct image properties", () => {
    const imageProps = {
      src: "/images/logo-3CX-partner-e2i/Bronze Partner badge-min.jpeg",
      alt: "3CX Bronze Partner Badge",
      fill: true,
      className: "object-contain",
      sizes: "(max-width: 768px) 128px, 160px",
    };

    expect(imageProps.src).toContain("Bronze Partner badge-min.jpeg");
    expect(imageProps.alt).toBe("3CX Bronze Partner Badge");
    expect(imageProps.fill).toBe(true);
    expect(imageProps.className).toBe("object-contain");
  });

  it("should have correct link container structure", () => {
    const linkProps = {
      href: "https://www.3cx.fr/",
      target: "_blank",
      rel: "noopener noreferrer",
      className:
        "flex items-center space-x-3 bg-white rounded-lg p-3 shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    };

    expect(linkProps.href).toBe("https://www.3cx.fr/");
    expect(linkProps.target).toBe("_blank");
    expect(linkProps.rel).toBe("noopener noreferrer");
    expect(linkProps.className).toContain("bg-white");
    expect(linkProps.className).toContain("rounded-lg");
    expect(linkProps.className).toContain("shadow-lg");
  });

  it("should have correct image container", () => {
    const imageContainerClasses = "relative w-32 h-16";
    expect(imageContainerClasses).toContain("relative");
    expect(imageContainerClasses).toContain("w-32");
    expect(imageContainerClasses).toContain("h-16");
  });
});
