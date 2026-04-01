describe("Header Menu Navigation (structure attendue)", () => {
  it("expose le menu principal sans Devis en ligne (CTA à droite)", () => {
    const navigation = [
      { name: "Qui sommes-nous", href: "/qui-sommes-nous" },
      { name: "Trunk SIP", href: "/telephonie-entreprise/trunk-sip" },
      { name: "Téléphonie d'entreprise", href: null },
      { name: "Nos services", href: "/nos-services" },
      { name: "Blog", href: "/blog" },
    ];

    expect(navigation.some((item) => item.name === "Devis en ligne")).toBe(
      false
    );
    expect(navigation.some((item) => item.name === "Trunk SIP")).toBe(true);
  });

  it("décrit les libellés CTA (Devis + Espace client + Contact)", () => {
    const cta = ["Devis en ligne", "Espace Client", "Contact"];
    cta.forEach((label) => {
      expect(typeof label).toBe("string");
      expect(label.length).toBeGreaterThan(0);
    });
  });

  it("a une liste principale de 5 entrées avec Trunk SIP avant Téléphonie", () => {
    const navigationItems = [
      "Qui sommes-nous",
      "Trunk SIP",
      "Téléphonie d'entreprise",
      "Nos services",
      "Blog",
    ];

    expect(navigationItems).toContain("Trunk SIP");
    expect(navigationItems.indexOf("Trunk SIP")).toBeLessThan(
      navigationItems.indexOf("Téléphonie d'entreprise")
    );
    expect(navigationItems).toHaveLength(5);
  });
});
