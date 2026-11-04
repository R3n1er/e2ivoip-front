import fs from "node:fs";
import path from "node:path";

/**
 * Décision Alban 2026-11-03 : l'offre 3CX SMB mutualisée couvre 3 à 8
 * utilisateurs (au-delà : 3CX PRO), avec une licence mensuelle et des frais
 * de mise en service réduits. Les téléphones de bureau y sont acceptés
 * (seule la licence 3CX Free les refuse).
 */
const lire = (f: string) => fs.readFileSync(path.join(process.cwd(), f), "utf8");

const FICHIERS_SMB = [
  "app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx",
  "app/telephonie-3cx/page.tsx",
  "app/nos-services/page.tsx",
  "app/qui-sommes-nous/page.tsx",
  "app/devis-en-ligne/page.tsx",
  "lib/constants/tally.ts",
  "lib/faq-data.tsx",
  "public/llms.txt",
];

describe("3CX SMB — 3 à 8 utilisateurs", () => {
  it.each(FICHIERS_SMB)("%s n'annonce plus « 3 à 10 utilisateurs »", (f) => {
    expect(lire(f)).not.toMatch(/3 à 10 utilisateurs|smb: "3 à 10"/i);
  });

  it("la page SMB annonce 3 à 8 utilisateurs", () => {
    expect(lire(FICHIERS_SMB[0])).toMatch(/3 à 8 utilisateurs/);
  });

  it("la page SMB met en avant la licence mensuelle et des frais de mise en service réduits", () => {
    const page = lire(FICHIERS_SMB[0]);
    expect(page).toMatch(/licence mensuelle/i);
    expect(page).toMatch(/mise en service[^.]{0,60}(réduit|allégé|diminu)/i);
  });

  it("la page SMB indique que les téléphones de bureau sont compatibles", () => {
    expect(lire(FICHIERS_SMB[0])).toMatch(/téléphones? (SIP|IP|de bureau)/i);
  });

  it("le comparatif /telephonie-3cx affiche 3 à 8 pour SMB", () => {
    expect(lire("app/telephonie-3cx/page.tsx")).toMatch(/smb: "3 à 8"/);
  });

  // Décision Alban 2026-11-03 : 150 € HT de frais d'infrastructure mutualisée
  // + 90 € HT par utilisateur, à la mise en service.
  it.each([FICHIERS_SMB[0], "public/llms.txt"])("%s affiche les frais de mise en service SMB", (f) => {
    const t = lire(f).replace(/\s+/g, " ");
    expect(t).toMatch(/150 €( |&nbsp;)?HT/);
    expect(t).toMatch(/90 €( |&nbsp;)?HT[^.]{0,30}utilisateur/);
  });
});
