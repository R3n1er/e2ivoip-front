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

  it("affiche chaque prix mensuel HT dans sa propre carte de formule", () => {
    render(<ThreeCXFreePage />);
    const cartes = within(screen.getByRole("region", { name: /formules/i })).getAllByRole("article");
    expect(cartes).toHaveLength(4);
    const attendus = [
      ["Compteur 2 appels", "76"],
      ["Compteur 4 appels", "96"],
      ["Illimité 2 appels", "139"],
      ["Illimité 4 appels", "219"],
    ];
    cartes.forEach((carte, i) => {
      const [nom, prix] = attendus[i];
      expect(within(carte).getByRole("heading", { level: 3 })).toHaveTextContent(nom);
      expect(carte.textContent?.replace(/\s+/g, " ")).toMatch(new RegExp(`${prix}\\s*€\\s*HT`));
    });
  });

  it("affiche la mise en service et l'engagement", () => {
    const { container } = render(<ThreeCXFreePage />);
    const texte = (container.textContent ?? "").replace(/\s+/g, " ");
    expect(texte).toMatch(/199\s*€\s*HT/);
    expect(texte).toMatch(/12 mois/);
  });

  it("n'imbrique pas de second landmark main (le layout en fournit un)", () => {
    const { container } = render(<ThreeCXFreePage />);
    expect(container.querySelector("main")).toBeNull();
  });

  it("le hero n'utilise que des couleurs de la charte", () => {
    expect(read("app/3cx-free/page.tsx")).not.toMatch(/red-400/);
  });

  it("aucun CTA ne pointe vers un parcours de devis sans option 3CX Free", () => {
    expect(read("app/3cx-free/page.tsx")).not.toMatch(/service=3cx-free/);
  });

  it("la meta description associe 76 € à 2 appels, pas à 4", () => {
    const d = String(metadata.description);
    expect(d.length).toBeLessThanOrEqual(160);
    expect(d).not.toMatch(/76[^.]*4 appels/);
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
      await user.click(within(screen.getByRole("group")).getByRole("button", { name: r }));
    }
    return user;
  }

  it("recommande 3CX Free pour un besoin simple, en trois réponses", async () => {
    await repondre(["Non", "Non", "Non"]);
    expect(screen.getByRole("status")).toHaveTextContent(/3CX Free/);
  });

  it("oriente vers 3CX PRO dès qu'il faut des files d'attente, sans autre question", async () => {
    await repondre(["Oui"]);
    expect(screen.getByRole("status")).toHaveTextContent(/3CX PRO/);
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("oriente vers 3CX PRO au-delà de 8 utilisateurs, sans 3e question", async () => {
    await repondre(["Non", "Oui"]);
    expect(screen.getByRole("status")).toHaveTextContent(/3CX PRO/);
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });

  it("oriente vers 3CX SMB pour des téléphones de bureau ou plus de 4 appels", async () => {
    const user = userEvent.setup();
    render(<ChoixVersion3cx />);
    for (const r of ["Non", "Non"] as const) {
      await user.click(within(screen.getByRole("group")).getByRole("button", { name: r }));
    }
    expect(screen.getByRole("group")).toHaveTextContent(/téléphones de bureau/i);
    await user.click(within(screen.getByRole("group")).getByRole("button", { name: "Oui" }));
    expect(screen.getByRole("status")).toHaveTextContent(/3CX SMB/);
    expect(screen.getByRole("status")).toHaveTextContent(/8 appels simultanés/);
  });

  it("déplace le focus sur chaque nouvelle question puis sur le résultat", async () => {
    const user = userEvent.setup();
    render(<ChoixVersion3cx />);
    await user.click(screen.getByRole("button", { name: "Non" }));
    expect(document.activeElement).toHaveTextContent(/8 utilisateurs/);
    await user.click(screen.getByRole("button", { name: "Oui" }));
    expect(document.activeElement).toHaveTextContent(/3CX PRO/);
  });

  it("ne vole pas le focus au chargement", () => {
    render(<ChoixVersion3cx />);
    expect(document.activeElement).toBe(document.body);
  });

  it("recommencer efface le résultat, revient à la question 1 et permet un second parcours", async () => {
    const user = await repondre(["Oui"]);
    await user.click(screen.getByRole("button", { name: /recommencer/i }));
    expect(screen.getByRole("status")).toHaveTextContent("");
    expect(screen.getByRole("group")).toHaveTextContent(/files d'attente/);
    expect(document.activeElement).toHaveTextContent(/files d'attente/);
    for (const rep of ["Non", "Non", "Non"]) {
      await user.click(within(screen.getByRole("group")).getByRole("button", { name: rep }));
    }
    expect(screen.getByRole("status")).toHaveTextContent(/3CX Free/);
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

  describe("formulaire de devis", () => {
    it("monte le formulaire de devis 3CX Free dans une section #devis", () => {
      const { container } = render(<ThreeCXFreePage />);
      const section = container.querySelector("section#devis");
      expect(section).not.toBeNull();
      expect(
        within(section as HTMLElement).getByRole("form", { name: "Demande de devis 3CX Free" }),
      ).toBeInTheDocument();
      expect(within(section as HTMLElement).getByRole("heading", { level: 2 })).toBeInTheDocument();
    });

    it("les ancres #devis et #rendez-vous ne passent pas sous la barre de navigation fixe", () => {
      const { container } = render(<ThreeCXFreePage />);
      for (const id of ["devis", "rendez-vous"]) {
        expect(container.querySelector(`#${id}`)?.className).toMatch(/\bscroll-mt-24\b/);
      }
    });

    it("le CTA principal du hero mène au formulaire, pas à /contact", () => {
      render(<ThreeCXFreePage />);
      const liens = screen.getAllByRole("link").map((l) => l.getAttribute("href"));
      expect(liens).toContain("#devis");
      expect(read("app/3cx-free/page.tsx")).not.toMatch(/CTAButton href="\/contact"/);
    });
  });
});
