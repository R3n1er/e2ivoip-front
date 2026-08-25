/**
 * Helpers partagés par les routes d'email transactionnel.
 *
 * Ces fonctions sont la seule barrière entre un corps de requête public et
 * un email expédié depuis un domaine authentifié SPF/DKIM : elles méritent
 * une couverture propre, indépendante de la route qui les consomme.
 */
import {
  sanitize,
  escapeHtml,
  escapeHtmlMultiline,
  isValidEmail,
  sanitizeHeader,
} from "@/lib/api/email-safety";

describe("sanitize", () => {
  it("borne la longueur et retire les espaces de bord", () => {
    expect(sanitize("  Jean  ", 10)).toBe("Jean");
    expect(sanitize("a".repeat(50), 10)).toBe("a".repeat(10));
  });

  it("ramène toute valeur non textuelle à une chaîne vide", () => {
    expect(sanitize(42, 10)).toBe("");
    expect(sanitize(null, 10)).toBe("");
    expect(sanitize({ toString: () => "malin" }, 10)).toBe("");
  });
});

describe("escapeHtml", () => {
  it("neutralise les métacaractères HTML", () => {
    expect(escapeHtml('<img src=x onerror="alert(1)">')).toBe(
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"
    );
  });

  it("échappe l'esperluette avant les autres entités", () => {
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });
});

describe("escapeHtmlMultiline", () => {
  it("échappe puis convertit les retours ligne", () => {
    expect(escapeHtmlMultiline("Ligne 1\n<b>Ligne 2</b>")).toBe(
      "Ligne 1<br />&lt;b&gt;Ligne 2&lt;/b&gt;"
    );
  });
});

describe("isValidEmail", () => {
  it("accepte une adresse ordinaire", () => {
    expect(isValidEmail("jean.dupont@example.fr")).toBe(true);
  });

  it("refuse une adresse porteuse de balises ou d'espaces", () => {
    expect(isValidEmail("jean<script>@example.fr")).toBe(false);
    expect(isValidEmail("jean dupont@example.fr")).toBe(false);
    expect(isValidEmail("jean@example")).toBe(false);
  });
});

describe("sanitizeHeader", () => {
  it("écrase les retours ligne injectés dans un en-tête", () => {
    expect(sanitizeHeader("Acme\nBcc: victime@example.com")).toBe(
      "Acme Bcc: victime@example.com"
    );
    expect(sanitizeHeader("Acme\r\nBcc: x")).not.toMatch(/[\r\n]/);
  });
});
