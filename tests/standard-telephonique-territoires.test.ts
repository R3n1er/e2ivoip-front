import fs from "fs";
import path from "path";

import {
  STANDARD_TELEPHONE_HUB,
  STANDARD_TELEPHONE_TERRITORIES,
  standardTelephoneHref,
  getPublishedTerritories,
  getTerritory,
} from "@/lib/territoires/standard-telephonique";
import { PAGE_BREADCRUMBS } from "@/lib/navigation/breadcrumbs";
import sitemap from "@/app/sitemap";

/**
 * Contrat de la section /standard-telephonique (phase 3 SEO).
 *
 * Vérifie le registre typé, la correspondance registre ↔ fichiers physiques,
 * et l'enregistrement dans les deux oublis de registre documentés
 * (breadcrumbs + sitemap).
 */

const APP_DIR = path.join(process.cwd(), "app");

describe("Registre /standard-telephonique", () => {
  it("le hub porte le slug attendu et un titre non vide", () => {
    expect(STANDARD_TELEPHONE_HUB.slug).toBe("standard-telephonique");
    expect(STANDARD_TELEPHONE_HUB.title.length).toBeGreaterThan(10);
    expect(STANDARD_TELEPHONE_HUB.description.length).toBeGreaterThan(40);
  });

  it("les slugs de territoire sont uniques et en français", () => {
    const slugs = STANDARD_TELEPHONE_TERRITORIES.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      // pas d'accent ni d'espace dans une URL
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("standardTelephoneHref construit l'URL sous le hub", () => {
    expect(standardTelephoneHref()).toBe("/standard-telephonique");
    expect(standardTelephoneHref("guyane")).toBe(
      "/standard-telephonique/guyane",
    );
  });

  // Une version antérieure de ce test parcourait le résultat de
  // getPublishedTerritories() pour vérifier que chaque élément a
  // `published === true`. C'était vrai PAR CONSTRUCTION — la fonction est un
  // `filter(t => t.published)` — donc le test rejouait l'implémentation au
  // lieu de la vérifier, et restait vert même si les 4 territoires passaient
  // à `published: true`. On affirme désormais le résultat attendu.
  // Arbitrage Alban (2026-09-19) : les quatre territoires sont publiés.
  // La liste est affirmée en dur et dans l'ordre : publier un cinquième
  // territoire doit être une décision, pas un effet de bord.
  it("les quatre territoires DOM sont publiés", () => {
    expect(getPublishedTerritories().map((t) => t.slug)).toEqual([
      "guyane",
      "martinique",
      "guadeloupe",
      "la-reunion",
    ]);
  });

  it("getTerritory retourne le territoire demandé ou undefined", () => {
    expect(getTerritory("guyane")?.label).toBe("Guyane");
    expect(getTerritory("atlantide")).toBeUndefined();
  });

  it("chaque territoire publié porte les éléments de contenu unique exigés", () => {
    // Sans ces éléments la page serait une déclinaison dupliquée du hub.
    for (const t of getPublishedTerritories()) {
      expect(t.phone.number).toMatch(/^\d{2}( \d{2}){4}$/);
      expect(t.indicatif).toMatch(/^0\d{3}$/);
      expect(t.copper.sourceUrl).toMatch(/^https:\/\//);
      expect(t.zones.length).toBeGreaterThanOrEqual(3);
      // Contexte terrain : c'est lui qui porte la différenciation quand la
      // preuve client manque.
      expect(t.context.length).toBeGreaterThan(80);
    }
  });

  // La preuve client nommée est l'élément qu'un concurrent ne peut pas
  // reproduire. L'exception qui couvrait La Réunion est levée depuis le
  // 2026-09-20 : les quatre territoires nomment désormais un client.
  it("chaque territoire publié nomme au moins un client", () => {
    for (const t of getPublishedTerritories()) {
      expect(t.localProof.length).toBeGreaterThan(0);
    }
  });

  it("chaque client cité figure dans le carrousel public", () => {
    // Règle du registre : ne jamais inventer une référence. Un client cité
    // sur une page territoriale doit déjà être affiché publiquement —
    // c'est ce qui vaut accord de citation.
    const carrousel = fs.readFileSync(
      path.join(process.cwd(), "components/clients-carousel.tsx"),
      "utf8",
    );
    for (const t of getPublishedTerritories()) {
      for (const preuve of t.localProof) {
        // Le carrousel porte parfois une forme courte (« Groupe Lang »)
        // là où la page développe (« Groupe Lang & Associés ») : on
        // cherche donc les deux premiers mots significatifs.
        const noyau = preuve.client.split(/\s+/).slice(0, 2).join(" ");
        expect(carrousel).toContain(noyau);
      }
    }
  });

  // L'indicatif « 0262 » avait été saisi pour La Réunion alors que la ligne
  // réelle est en 02 63 : +262 est l'indicatif PAYS, 0263 le préfixe de ZONE.
  // La FAQ générait « une ligne locale en 0262 au 02 63 08 55 00 », phrase
  // auto-contradictoire partant dans le JSON-LD FAQPage.
  it("l'indicatif de chaque territoire préfixe bien son numéro réel", () => {
    for (const t of STANDARD_TELEPHONE_TERRITORIES) {
      expect(t.phone.number.replace(/\s/g, "")).toMatch(
        new RegExp(`^${t.indicatif}`),
      );
    }
  });

  it("les dates cuivre citent une source et restent communales", () => {
    for (const t of STANDARD_TELEPHONE_TERRITORIES) {
      expect(t.copper.sourceLabel.length).toBeGreaterThan(5);
      expect(t.copper.sourceUrl).toMatch(/^https:\/\//);

      // Chaque échéance nomme sa commune et porte une année : le calendrier
      // Arcep est publié commune par commune, jamais par département. Annoncer
      // une date unique pour un territoire entier est factuellement faux — la
      // page Guyane présentait Rémire-Montjoly (coupée en 2025) au futur.
      for (const c of [...t.copper.alreadyClosed, ...t.copper.scheduled]) {
        expect(c.commune.length).toBeGreaterThan(2);
        expect(c.technicalDate).toMatch(/20\d\d/);
      }
    }
  });

  it("aucune commune n'est annoncée à la fois coupée et planifiée", () => {
    for (const t of STANDARD_TELEPHONE_TERRITORIES) {
      const coupees = t.copper.alreadyClosed.map((c) => c.commune);
      for (const c of t.copper.scheduled) {
        expect(coupees).not.toContain(c.commune);
      }
    }
  });

  it("une fermeture technique planifiée suit son arrêt commercial", () => {
    for (const t of STANDARD_TELEPHONE_TERRITORIES) {
      for (const c of t.copper.scheduled) {
        if (!c.commercialDate) continue; // lot sans arrêt commercial publié
        const anneeCommerciale = Number(c.commercialDate.match(/20\d\d/)?.[0]);
        const anneeTechnique = Number(c.technicalDate.match(/20\d\d/)?.[0]);
        expect(anneeTechnique).toBeGreaterThanOrEqual(anneeCommerciale);
      }
    }
  });
});

describe("Correspondance registre ↔ fichiers physiques", () => {
  it("la page hub existe sur disque", () => {
    const p = path.join(APP_DIR, "standard-telephonique", "page.tsx");
    expect(fs.existsSync(p)).toBe(true);
  });

  // Les territoires étaient servis par un fichier chacun ; ils le sont
  // désormais par une route dynamique [territoire]. Quatre copies du même
  // gabarit auraient multiplié par quatre le coût de chaque correction
  // factuelle — et ce sont précisément les corrections répétées qui se
  // perdent, comme l'a montré `llms.txt`, oublié trois fois.
  it("la route dynamique de territoire existe sur disque", () => {
    const p = path.join(
      APP_DIR,
      "standard-telephonique",
      "[territoire]",
      "page.tsx",
    );
    expect(fs.existsSync(p)).toBe(true);
  });

  it("aucun dossier de territoire en dur ne subsiste", () => {
    // Un fichier oublié à l'ancien emplacement prendrait le pas sur la route
    // dynamique : Next.js sert la route statique en priorité, et la page
    // servie divergerait silencieusement du registre.
    for (const t of STANDARD_TELEPHONE_TERRITORIES) {
      const p = path.join(APP_DIR, "standard-telephonique", t.slug, "page.tsx");
      expect(fs.existsSync(p)).toBe(false);
    }
  });
});

/**
 * `generateStaticParams` remplace l'ancien contrôle « un dossier par
 * territoire » : c'est lui qui décide des pages réellement générées au build.
 * Associé à `dynamicParams = false`, tout slug absent renvoie 404 sans rendu.
 */
describe("Pages générées au build", () => {
  it("génère exactement les territoires publiés", async () => {
    const { generateStaticParams } = await import(
      "@/app/standard-telephonique/[territoire]/page"
    );
    const slugs = generateStaticParams().map(
      (p: { territoire: string }) => p.territoire,
    );
    expect(slugs.sort()).toEqual(
      getPublishedTerritories()
        .map((t) => t.slug)
        .sort(),
    );
  });

  it("n'autorise aucun slug hors de cette liste", async () => {
    const mod = await import("@/app/standard-telephonique/[territoire]/page");
    // Sans ce réglage, un slug inventé serait rendu à la demande et
    // répondrait 200 — la page satellite que le registre refuse.
    expect(mod.dynamicParams).toBe(false);
  });
});

describe("Oublis de registre (breadcrumbs)", () => {
  it("le hub est enregistré dans le fil d'Ariane", () => {
    const items = PAGE_BREADCRUMBS["/standard-telephonique"];
    expect(items).toBeDefined();
    expect(items[items.length - 1].href).toBeUndefined();
  });

  it("chaque territoire publié est enregistré avec le hub en intermédiaire", () => {
    for (const t of getPublishedTerritories()) {
      const href = standardTelephoneHref(t.slug);
      const items = PAGE_BREADCRUMBS[href];
      expect(items).toBeDefined();
      expect(items.some((i) => i.href === "/standard-telephonique")).toBe(true);
      expect(items[items.length - 1].href).toBeUndefined();
    }
  });
});

/**
 * Le sitemap est le seul canal qui SOUMET une URL à Google. Le code filtre
 * bien sur `getPublishedTerritories()`, mais rien ne le vérifiait : un refactor
 * remplaçant ce filtre par la liste complète aurait laissé les 12 tests verts
 * tout en soumettant 3 URL pointant sur des 404.
 */
describe("Sitemap — aucune URL fantôme", () => {
  it("un territoire est au sitemap si et seulement s'il est publié", async () => {
    const urls = (await sitemap()).map((e) => e.url);

    for (const t of STANDARD_TELEPHONE_TERRITORIES) {
      const present = urls.some((u) =>
        u.endsWith(standardTelephoneHref(t.slug)),
      );
      // `toBe(t.published)` échoue dans les DEUX sens : fuite d'un territoire
      // non publié, comme oubli d'un territoire publié.
      expect(present).toBe(t.published);
    }
  });

  it("le hub est au sitemap", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/standard-telephonique"))).toBe(true);
  });
});

/**
 * public/llms.txt est la vitrine servie aux moteurs de réponse (ChatGPT,
 * Perplexity, AI Overviews). Trois PR successives de ce dépôt l'ont oublié en
 * corrigeant le HTML — dont celle-ci, alors que le registre invoque
 * explicitement « la citabilité (Aperçu IA, Perplexity, ChatGPT) » comme motif
 * d'existence de la section.
 */
describe("public/llms.txt référence la section", () => {
  const llms = fs.readFileSync(
    path.join(process.cwd(), "public", "llms.txt"),
    "utf8",
  );

  it("le hub y figure", () => {
    expect(llms).toContain("/standard-telephonique)");
  });

  it("chaque territoire publié y figure, et aucun autre", () => {
    for (const t of STANDARD_TELEPHONE_TERRITORIES) {
      expect(llms.includes(`${standardTelephoneHref(t.slug)})`)).toBe(
        t.published,
      );
    }
  });
});

/**
 * Sens disque ⇒ registre. Les tests ci-dessus couvrent registre ⇒ disque ;
 * sans celui-ci, une page créée sous un slug absent du registre passerait
 * inaperçue, s'afficherait en production et hériterait d'un fil d'Ariane de
 * repli — le mode de défaillance que le registre prétend justement empêcher.
 */
describe("Aucune page orpheline dans la section", () => {
  it("la section ne contient que la route dynamique de territoire", () => {
    // Depuis le passage en route dynamique, le seul sous-dossier légitime
    // est `[territoire]`. Tout autre dossier serait une page en dur qui
    // court-circuiterait le registre : Next.js sert la route statique en
    // priorité, et cette page-là ne serait vérifiée par aucun des tests
    // registre ⇒ disque ci-dessus.
    const dossiers = fs
      .readdirSync(path.join(APP_DIR, "standard-telephonique"), {
        withFileTypes: true,
      })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);

    expect(dossiers).toEqual(["[territoire]"]);
  });
});
