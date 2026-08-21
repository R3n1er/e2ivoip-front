# Titre SEO opérateur télécom DOM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Positionner la page d’accueil sur « opérateur télécom DOM » avec un titre unique et cohérent dans le HTML, Open Graph et Twitter.

**Architecture:** Conserver les métadonnées statiques du layout racine prévues par l’App Router Next.js 16. Centraliser le titre dans `lib/site.ts`, déjà source de vérité SEO, puis le réutiliser pour le titre par défaut et les deux titres sociaux ; un test unitaire couvrira la règle SEO et un test Playwright vérifiera le HTML réellement servi.

**Tech Stack:** Next.js 16 Metadata API, TypeScript, Playwright, Jest, ESLint.

---

### Task 1: Couvrir puis modifier le titre de la page d’accueil

**Files:**
- Modify: `lib/site.ts`
- Create: `tests/site-metadata.test.ts`
- Modify: `tests/playwright/metadata-sociale.spec.ts`
- Modify: `app/layout.tsx:34-69`

- [ ] **Step 1: Lire la documentation Next.js 16 installée**

Lire `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`, en particulier la section « Static metadata », et confirmer que l’export `metadata` du layout reste l’API adaptée.

- [ ] **Step 2: Écrire le test unitaire en échec**

Créer `tests/site-metadata.test.ts` :

```ts
import { HOME_PAGE_TITLE } from "@/lib/site";

describe("métadonnées de la page d'accueil", () => {
  it("cible l'opérateur télécom DOM dans une longueur SEO maîtrisée", () => {
    expect(HOME_PAGE_TITLE).toBe(
      "Opérateur de services télécom DOM | E2I VoIP",
    );
    expect(HOME_PAGE_TITLE.startsWith("Opérateur de services télécom DOM")).toBe(true);
    expect(HOME_PAGE_TITLE.length).toBeLessThanOrEqual(60);
  });
});
```

- [ ] **Step 3: Vérifier l’échec du test unitaire**

Run: `npm test -- tests/site-metadata.test.ts --runInBand`

Résultat attendu : échec TypeScript/Jest car `HOME_PAGE_TITLE` n’est pas encore exporté par `lib/site.ts`.

- [ ] **Step 4: Centraliser le titre dans la source de vérité SEO**

Ajouter à `lib/site.ts` :

```ts
/** Titre SEO de la page d'accueil, partagé avec les métadonnées sociales. */
export const HOME_PAGE_TITLE =
  "Opérateur de services télécom DOM | E2I VoIP";
```

- [ ] **Step 5: Vérifier le test unitaire**

Run: `npm test -- tests/site-metadata.test.ts --runInBand`

Résultat attendu : `1 passed` et aucun échec.

- [ ] **Step 6: Écrire le test Playwright en échec**

Étendre le test existant afin de vérifier les trois sorties réellement rendues :

```ts
import { expect, test } from "@playwright/test";

const HOME_TITLE = "Opérateur de services télécom DOM | E2I VoIP";

test("la page d'accueil expose ses métadonnées sociales", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(HOME_TITLE);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    HOME_TITLE,
  );
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    "content",
    HOME_TITLE,
  );

  const openGraphImage = page.locator('meta[property="og:image"]');
  await expect(openGraphImage).toHaveAttribute(
    "content",
    "https://www.e2i-voip.com/images/e2i-voip-partage.png",
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    "content",
    "1200",
  );
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
    "content",
    "630",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    "https://www.e2i-voip.com/images/e2i-voip-partage.png",
  );
});
```

- [ ] **Step 7: Libérer le port 3000 et vérifier l’échec Playwright**

Arrêter tout serveur de développement actif, puis exécuter :

```bash
lsof -ti :3000 | xargs kill -9 2>/dev/null || true
npx playwright test tests/playwright/metadata-sociale.spec.ts
```

Résultat attendu : échec sur le titre actuel `E2I VoIP - Solutions de téléphonie IP professionnelles`.

- [ ] **Step 8: Appliquer le titre validé aux métadonnées statiques**

Dans `app/layout.tsx`, importer `HOME_PAGE_TITLE` avec `SITE_URL` et `SITE_NAME`, puis remplacer uniquement les trois titres de la page d’accueil :

```ts
import { HOME_PAGE_TITLE, SITE_URL, SITE_NAME } from "@/lib/site";
```

```ts
title: {
  default: HOME_PAGE_TITLE,
  template: `%s | ${SITE_NAME}`,
},
```

```ts
openGraph: {
  title: HOME_PAGE_TITLE,
  description:
    "Solutions de téléphonie IP professionnelles pour optimiser vos communications d'entreprise.",
  type: "website",
  locale: "fr_FR",
  url: SITE_URL,
  siteName: SITE_NAME,
  images: [
    {
      url: "/images/e2i-voip-partage.png",
      width: 1200,
      height: 630,
      alt: "E2I VoIP — Opérateur de services télécom, spécialiste des DOM",
    },
  ],
},
```

```ts
twitter: {
  card: "summary_large_image",
  title: HOME_PAGE_TITLE,
  description:
    "Solutions de téléphonie IP professionnelles pour optimiser vos communications d'entreprise.",
  images: ["/images/e2i-voip-partage.png"],
},
```

- [ ] **Step 9: Relancer le test ciblé**

Run: `npx playwright test tests/playwright/metadata-sociale.spec.ts`

Résultat attendu : `1 passed` et aucun échec.

- [ ] **Step 10: Vérifier qu’un titre interne conserve son suffixe**

Run: `npx playwright test tests/playwright/metadata-sociale.spec.ts tests/playwright/blog-seo.spec.ts`

Résultat attendu : toutes les assertions passent ; les métadonnées propres au blog restent inchangées.

- [ ] **Step 11: Committer le changement fonctionnel**

```bash
git add app/layout.tsx lib/site.ts tests/site-metadata.test.ts tests/playwright/metadata-sociale.spec.ts
git commit -m "feat(seo): cibler le titre sur l’opérateur télécom DOM"
```

### Task 2: Documenter la décision SEO

**Files:**
- Modify: `docs/ADR.md`
- Modify: `docs/roadmap.md`

- [ ] **Step 1: Ajouter l’entrée ADR en tête de l’historique**

Ajouter après `## Historique` :

```md
### 2026-08-21 — Titre SEO de la page d’accueil ciblé sur les DOM

- **Contexte** : le titre de la page d’accueil décrivait des solutions de téléphonie IP professionnelles sans exprimer le positionnement différenciant d’E2I VoIP ni sa zone prioritaire.
- **Décision** : remplacer le titre HTML par « Opérateur de services télécom DOM | E2I VoIP » et aligner `og:title` ainsi que `twitter:title`. Les titres spécifiques des pages internes et la description SEO restent inchangés.
- **Conséquences** : l’intention « opérateur télécom DOM » apparaît dès le début du titre, la marque reste identifiable et les aperçus sociaux emploient le même message.
- **Tests associés** : `tests/playwright/metadata-sociale.spec.ts` vérifie le `<title>`, `og:title` et `twitter:title` rendus sur la page d’accueil.
```

- [ ] **Step 2: Mettre à jour la roadmap disponible**

Ajouter à la fin des notes de maintenance de `docs/roadmap.md` :

```md
> **Optimisation SEO (2026-08-21)** : titre de la page d’accueil recentré sur le positionnement « Opérateur de services télécom DOM », avec métadonnées sociales alignées. Voir `docs/ADR.md`.
```

Ne pas créer `.planning/ROADMAP.md` ou `.planning/STATE.md` : ces chemins sont documentés comme source de vérité historique mais sont absents de la branche `dev` actuelle.

- [ ] **Step 3: Contrôler la documentation**

Run: `git diff --check`

Résultat attendu : sortie vide et code de retour 0.

- [ ] **Step 4: Committer la documentation**

```bash
git add docs/ADR.md docs/roadmap.md docs/superpowers/plans/2026-08-21-titre-seo-operateur-telecom-dom.md
git commit -m "docs(seo): documenter le titre opérateur télécom DOM"
```

### Task 3: Validation complète et préparation de la PR

**Files:**
- Verify: `app/layout.tsx`
- Verify: `lib/site.ts`
- Verify: `tests/site-metadata.test.ts`
- Verify: `tests/playwright/metadata-sociale.spec.ts`
- Verify: `docs/ADR.md`
- Verify: `docs/roadmap.md`

- [ ] **Step 1: Repartir d’un serveur propre**

Arrêter le serveur actif et libérer le port :

```bash
lsof -ti :3000 | xargs kill -9 2>/dev/null || true
```

- [ ] **Step 2: Lancer les six contrôles bloquants**

Run: `npm run validate`

Résultat attendu : ESLint, TypeScript, Jest avec couverture, Playwright, audit de sécurité et build réussissent tous. Un seul échec bloque la PR.

- [ ] **Step 3: Vérifier l’hydratation CSS**

Run: `npm run dev`

Ouvrir `/`, contrôler le terminal et la console navigateur, puis arrêter le serveur. Résultat attendu : aucun warning ou erreur CSS/hydratation.

- [ ] **Step 4: Vérifier le diff final**

```bash
git status --short
git diff dev...HEAD --check
git diff dev...HEAD -- app/layout.tsx tests/playwright/metadata-sociale.spec.ts docs/ADR.md docs/roadmap.md
```

Résultat attendu : aucun fichier inattendu, aucun défaut d’espacement et uniquement le périmètre validé.

- [ ] **Step 5: Pousser la branche et ouvrir la PR vers `dev`**

```bash
git push -u origin feat/titre-seo-operateur-telecom-dom
gh pr create --base dev --title "feat(seo): cibler la page d’accueil sur l’opérateur télécom DOM" --body-file /tmp/e2ivoip-pr-titre-seo.md
```

Le corps de PR doit contenir l’objectif, les changements, les résultats Jest et Playwright, l’entrée ADR, ainsi que les risques : délai de réindexation Google et caches des plateformes sociales. Ne pas fusionner la PR.
