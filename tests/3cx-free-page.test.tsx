import fs from "node:fs";
import path from "node:path";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThreeCXFreePage, { metadata } from "@/app/3cx-free/page";
import { ChoixVersion3cx } from "@/components/3cx/choix-version-3cx";
import { PAGE_BREADCRUMBS } from "@/lib/navigation/breadcrumbs";
import sitemap from "@/app/sitemap";

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), "utf8");

describe("Page /3cx-free", () => {
  it("porte un H1 3CX Free et son propre canonical", () => {
    render(<ThreeCXFreePage />);
    expect(screen.getByRole("heading", { level: 1, name: /3CX Free/i })).toBeInTheDocument();
    expect(String(metadata.alternates?.canonical)).toMatch(/\/3cx-free$/);
  });

  it("affiche les quatre prix mensuels en HT", () => {
    const { container } = render(<ThreeCXFreePage />);
    const texte = container.textContent ?? "";
    for (const prix of ["76", "96", "139", "219"]) {
      expect(texte).toMatch(new RegExp(`${prix}\\s*€\\s*HT`));
    }
    expect(texte).toMatch(/199\s*€\s*HT/);
    expect(texte).toMatch(/12 mois/);
  });

  it("explique les limites : ni postes IP, ni files d'attente", () => {
    render(<ThreeCXFreePage />);
    const limites = screen.getByRole("region", { name: /ne fait pas/i });
    expect(limites).toHaveTextContent(/postes? (IP|de bureau)/i);
    expect(limites).toHaveTextContent(/files? d'attente/i);
  });

  it("propose le mode autogéré avec renvoi vers le trunk au compteur", () => {
    render(<ThreeCXFreePage />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/telephonie-entreprise/trunk-sip-compteur");
  });

  it("intègre l'encart de choix de version", () => {
    render(<ThreeCXFreePage />);
    expect(screen.getByRole("region", { name: /quelle version 3CX/i })).toBeInTheDocument();
  });

  it("ne nomme aucun concurrent et ne se compare à personne", () => {
    const { container } = render(<ThreeCXFreePage />);
    const texte = container.textContent ?? "";
    // Liste en dur : indépendante de la PR qui crée CONCURRENTS_CITABLES.
    for (const c of ["Orange", "SFR", "Dauphin", "Digicel", "Ringover"]) {
      expect(texte).not.toContain(c);
    }
    expect(texte).not.toMatch(/IPER|moins cher|plus cher/i);
  });

  it("ne promet pas un service gratuit : seule la licence l'est", () => {
    const { container } = render(<ThreeCXFreePage />);
    const texte = (container.textContent ?? "").replace(/\s+/g, " ");
    expect(texte).not.toMatch(/standard (téléphonique )?gratuit/i);
    expect(texte).toMatch(/licence gratuite/i);
  });
});

describe("Encart « Quelle version 3CX ? »", () => {
  async function repondre(reponses: Array<"Oui" | "Non">) {
    const user = userEvent.setup();
    render(<ChoixVersion3cx />);
    for (const r of reponses) {
      const question = screen.getByRole("group");
      await user.click(within(question).getByRole("button", { name: r }));
    }
  }

  it("pose au plus trois questions et recommande 3CX Free pour un besoin simple", async () => {
    await repondre(["Non", "Non", "Non"]);
    expect(screen.getByRole("status")).toHaveTextContent(/3CX Free/);
  });

  it("oriente vers 3CX PRO dès qu'il faut des files d'attente, sans autre question", async () => {
    await repondre(["Oui"]);
    expect(screen.getByRole("status")).toHaveTextContent(/3CX PRO/);
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("oriente vers 3CX SMB pour des postes de bureau, sans 3e question", async () => {
    await repondre(["Non", "Oui"]);
    expect(screen.getByRole("status")).toHaveTextContent(/3CX SMB/);
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("oriente vers 3CX SMB au-delà de 4 appels", async () => {
    await repondre(["Non", "Non", "Oui"]);
    expect(screen.getByRole("status")).toHaveTextContent(/3CX SMB/);
    expect(screen.getByRole("status")).toHaveTextContent(/8 appels simultanés/);
  });

  it("permet de recommencer", async () => {
    const user = userEvent.setup();
    await repondre(["Oui"]);
    await user.click(screen.getByRole("button", { name: /recommencer/i }));
    expect(screen.getByRole("group")).toBeInTheDocument();
  });
});

describe("Inscriptions de /3cx-free", () => {
  it("figure dans le menu des versions 3CX", () => {
    const header = read("components/layout/header-simple.tsx");
    expect(header).toMatch(/href: "\/3cx-free"/);
  });

  it("a un fil d'Ariane", () => {
    const items = PAGE_BREADCRUMBS["/3cx-free"];
    expect(items).toBeDefined();
    expect(items[items.length - 1].href).toBeUndefined();
  });

  it("est au sitemap", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/3cx-free"))).toBe(true);
  });

  it("est référencée dans llms.txt", () => {
    expect(read("public/llms.txt")).toContain("/3cx-free)");
  });
});
