import {
  decodeEmail,
  getMaskedEmailLabel,
} from "@/lib/email/decode-email";

describe("decode-email", () => {
  it("décode les trois adresses métier", () => {
    expect(decodeEmail("contact")).toBe("contact@e2i-voip.com");
    expect(decodeEmail("assistance")).toBe("assistance@e2i-voip.com");
    expect(decodeEmail("sales")).toBe("commerciaux@e2i-voip.com");
  });

  it("masque le domaine dans le libellé affiché", () => {
    expect(getMaskedEmailLabel("contact")).toBe("contact@…");
    expect(getMaskedEmailLabel("sales")).toBe("commerciaux@…");
    expect(getMaskedEmailLabel("contact")).not.toContain("e2i-voip.com");
  });
});
