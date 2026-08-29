# Repositionnement SEO & éditorial — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corriger les canonicals cassés sur 9 pages, supprimer les allégations juridiquement exposées, et repositionner le discours d'entrée du site (home + `/nos-services`) de l'économie tarifaire vers l'expertise DOM et la continuité de service.

**Architecture:** Deux lots séquentiels dans une seule PR. Le lot A traite des assertions vérifiables (un canonical est correct ou non) en TDD strict. Le lot B applique des décisions éditoriales déjà arbitrées, verrouillées ensuite par des tests de non-régression. Le lot A ne dépend d'aucune décision ouverte et reste livrable seul.

**Tech Stack:** Next.js 15 App Router (Metadata API), TypeScript, Jest + Testing Library, Playwright (E2E).

**Spec de référence:** `docs/superpowers/specs/2026-08-29-repositionnement-seo-editorial-design.md`

---

## Contexte indispensable

### Comment le bug du canonical fonctionne

Next.js App Router fusionne les métadonnées du layout racine avec celles de
chaque page. `app/layout.tsx:48-50` déclare :

```ts
alternates: {
  canonical: "/",
},
```

Toute page qui ne déclare pas son propre `alternates` hérite de cette valeur.
Résultat : 9 pages disent à Google « je suis un doublon de la home ». Aucune
erreur, aucun warning — la page se construit parfaitement.

### Piège à connaître avant de commencer

`app/page.tsx` fait 136 octets et **ne déclare aucune métadonnée** : la home
tire tout du layout racine. Retirer `alternates.canonical` du layout sans
ajouter de métadonnées à `app/page.tsx` ferait perdre son canonical à la home.
Les deux modifications vont ensemble (Task 2).

### Les 9 pages sans canonical explicite

```
app/assistance/page.tsx
app/contact/page.tsx
app/nos-services/page.tsx
app/qui-sommes-nous/page.tsx
app/telephonie-3cx/page.tsx
app/telephonie-entreprise/pbx-yeastar/page.tsx
app/telephonie-entreprise/trunk-sip-agents-ia/layout.tsx
app/telephonie-entreprise/trunk-sip-compteur/page.tsx
app/telephonie-entreprise/trunk-sip-illimite/page.tsx
```

Plus `app/page.tsx` (home), qui n'a pas de bloc metadata du tout.

### Convention de test du projet

Les tests vivent dans `tests/`, en français, avec `describe`/`it`. Voir
`tests/site-metadata.test.ts` pour le style. Commande : `npx jest <fichier>`.

---

## Structure des fichiers

**Créés :**
- `tests/seo-canonical.test.ts` — garde-fou canonical sur toutes les pages
- `tests/seo-title-template.test.ts` — garde-fou title dupliqué
- `tests/repositionnement-editorial.test.tsx` — verrouillage des arbitrages du lot B

**Modifiés (lot A) :**
- `app/layout.tsx` — retrait du canonical racine
- `app/page.tsx` — ajout des métadonnées home (canonical + description)
- Les 9 pages listées — ajout de `alternates.canonical`
- 6 pages — retrait du suffixe marque dans le title
- `components/layout/footer.tsx:261` — année dynamique
- `components/about-section-simple.tsx:116` — retrait du superlatif
- `lib/structured-data.ts` — ajout de `sameAs`

**Modifiés (lot B) :**
- `components/homepage-hero-section-simple.tsx` — hero complète
- `components/about-section-simple.tsx` — stat 20%
- `app/nos-services/page.tsx` — 5 occurrences du -20%
- `app/qui-sommes-nous/page.tsx` — ancre sur le bloc TBF

---

# LOT A — Correctifs techniques

## Task 1 : Test de non-régression du canonical

**Files:**
- Create: `tests/seo-canonical.test.ts`

Ce test est le garde-fou central. Il parcourt les fichiers de `app/` qui
exportent des métadonnées et vérifie que chacun déclare un canonical. Sans
lui, le bug reviendra sur les prochaines pages créées.

Il lit le **texte source** plutôt que d'importer les modules : importer une
page Next.js déclenche la résolution de tous ses imports (composants, images,
polices), ce qui est lent et fragile en environnement Jest. Une analyse
textuelle suffit pour vérifier la présence d'une déclaration.

- [ ] **Step 1: Écrire le test qui échoue**

```ts
import { readFileSync, readdirSync, statSync } from "fs"
import path from "path"

const APP_DIR = path.join(process.cwd(), "app")

/** Parcourt app/ et retourne les fichiers .tsx contenant un export de métadonnées. */
function findMetadataFiles(dir: string): string[] {
  const found: string[] = []

  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)

    if (statSync(full).isDirectory()) {
      found.push(...findMetadataFiles(full))
      continue
    }

    if (!entry.endsWith(".tsx")) continue

    const source = readFileSync(full, "utf-8")
    if (
      source.includes("export const metadata") ||
      source.includes("export async function generateMetadata") ||
      source.includes("export function generateMetadata")
    ) {
      found.push(full)
    }
  }

  return found
}

describe("canonical SEO", () => {
  const metadataFiles = findMetadataFiles(APP_DIR)

  it("trouve des pages avec métadonnées à contrôler", () => {
    expect(metadataFiles.length).toBeGreaterThan(0)
  })

  it("le layout racine ne déclare aucun canonical par défaut", () => {
    // Un canonical à la racine est hérité par toute page n'en déclarant pas :
    // elle signale alors à Google qu'elle duplique la home.
    const rootLayout = readFileSync(
      path.join(APP_DIR, "layout.tsx"),
      "utf-8",
    )
    expect(rootLayout).not.toMatch(/alternates:\s*\{[^}]*canonical/s)
  })

  it("chaque page exportant des métadonnées déclare un canonical explicite", () => {
    const sansCanonical = metadataFiles
      .filter((file) => !readFileSync(file, "utf-8").includes("canonical"))
      .map((file) => path.relative(process.cwd(), file))

    expect(sansCanonical).toEqual([])
  })
})
```

- [ ] **Step 2: Lancer le test pour vérifier qu'il échoue**

```bash
npx jest tests/seo-canonical.test.ts
```

Attendu : 2 échecs. Le test « layout racine » échoue (le canonical y est
encore), et le test « chaque page » liste les 9 fichiers sans canonical.

- [ ] **Step 3: Commit du test rouge**

```bash
git add tests/seo-canonical.test.ts
git commit -m "test(seo): garde-fou canonical sur les pages exportant des métadonnées

Le test échoue : 9 pages héritent du canonical racine et se déclarent
doublons de la home.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 2 : Retirer le canonical racine et le déclarer sur la home

**Files:**
- Modify: `app/layout.tsx:47-50`
- Modify: `app/page.tsx`

Les deux vont ensemble : `app/page.tsx` n'a aucune métadonnée, il tire tout du
layout. Retirer le canonical racine seul ferait perdre son canonical à la home.

- [ ] **Step 1: Retirer le canonical du layout racine**

Dans `app/layout.tsx`, supprimer ces 4 lignes :

```ts
  // Canonical par défaut = racine. Chaque page surcharge avec son propre chemin.
  alternates: {
    canonical: "/",
  },
```

Ne rien mettre à la place. Une page sans canonical n'en émet aucun — neutre
pour Google, là où un canonical faux est nuisible.

- [ ] **Step 2: Lire le contenu actuel de app/page.tsx**

```bash
cat app/page.tsx
```

Le fichier fait 136 octets : c'est un wrapper qui rend un composant. Conserver
son contenu existant et **ajouter** le bloc metadata au-dessus du composant.

- [ ] **Step 3: Ajouter les métadonnées à la home**

Ajouter en haut de `app/page.tsx`, après les imports existants :

```ts
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}
```

Le `title` et la `description` restent hérités du layout racine (ils y sont
corrects pour la home). Seul le canonical devient explicite.

- [ ] **Step 4: Vérifier que les deux tests du layout passent**

```bash
npx jest tests/seo-canonical.test.ts -t "layout racine"
```

Attendu : PASS.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "fix(seo): retirer le canonical par défaut du layout racine

Toute page ne déclarant pas alternates héritait de canonical: '/' et se
signalait à Google comme doublon de la home. Le canonical de la home est
désormais déclaré explicitement dans app/page.tsx.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 3 : Déclarer le canonical sur les 9 pages orphelines

**Files:**
- Modify: `app/assistance/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/nos-services/page.tsx`
- Modify: `app/qui-sommes-nous/page.tsx`
- Modify: `app/telephonie-3cx/page.tsx`
- Modify: `app/telephonie-entreprise/pbx-yeastar/page.tsx`
- Modify: `app/telephonie-entreprise/trunk-sip-agents-ia/layout.tsx`
- Modify: `app/telephonie-entreprise/trunk-sip-compteur/page.tsx`
- Modify: `app/telephonie-entreprise/trunk-sip-illimite/page.tsx`

- [ ] **Step 1: Ajouter le bloc alternates à chaque page**

Dans chaque fichier, à l'intérieur de `export const metadata: Metadata = {`,
ajouter le bloc `alternates` correspondant à la route du fichier.

Modèle (à adapter au chemin de chaque page) :

```ts
  alternates: {
    canonical: "/qui-sommes-nous",
  },
```

Correspondance exacte fichier → valeur du canonical :

| Fichier | canonical |
|---|---|
| `app/assistance/page.tsx` | `/assistance` |
| `app/contact/page.tsx` | `/contact` |
| `app/nos-services/page.tsx` | `/nos-services` |
| `app/qui-sommes-nous/page.tsx` | `/qui-sommes-nous` |
| `app/telephonie-3cx/page.tsx` | `/telephonie-3cx` |
| `app/telephonie-entreprise/pbx-yeastar/page.tsx` | `/telephonie-entreprise/pbx-yeastar` |
| `app/telephonie-entreprise/trunk-sip-agents-ia/layout.tsx` | `/telephonie-entreprise/trunk-sip-agents-ia` |
| `app/telephonie-entreprise/trunk-sip-compteur/page.tsx` | `/telephonie-entreprise/trunk-sip-compteur` |
| `app/telephonie-entreprise/trunk-sip-illimite/page.tsx` | `/telephonie-entreprise/trunk-sip-illimite` |

Les chemins sont relatifs : `metadataBase` (déclaré dans le layout racine) les
résout en URL absolues sur `https://www.e2i-voip.com`.

- [ ] **Step 2: Vérifier que le test passe entièrement**

```bash
npx jest tests/seo-canonical.test.ts
```

Attendu : 3 tests PASS, la liste `sansCanonical` est vide.

- [ ] **Step 3: Vérifier le rendu réel des canonicals**

```bash
npm run build 2>&1 | tail -5
```

Attendu : build réussi. Le test vérifie le source ; le build vérifie que la
syntaxe TypeScript est valide.

- [ ] **Step 4: Commit**

```bash
git add app/
git commit -m "fix(seo): déclarer un canonical explicite sur les 9 pages orphelines

Ces pages héritaient du canonical racine et se déclaraient doublons de la
home, dont les trois pages Trunk SIP et /telephonie-3cx.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 4 : Corriger les titles dupliqués

**Files:**
- Create: `tests/seo-title-template.test.ts`
- Modify: `app/assistance/page.tsx:17`
- Modify: `app/contact/page.tsx:8`
- Modify: `app/nos-services/page.tsx:20`
- Modify: `app/qui-sommes-nous/page.tsx:11` et `:17`
- Modify: `app/telephonie-3cx/page.tsx:16`

Le layout racine déclare `template: "%s | E2I VoIP"`. Une page dont le title
contient déjà « E2I VoIP » produit un doublon :
`Qui sommes-nous - E2I VoIP | Opérateur télécom DOM | E2I VoIP`.

Périmètre limité aux 6 pages du périmètre audité. Les pages juridiques et le
blog présentent le même défaut — noté en fin de plan comme suite.

- [ ] **Step 1: Écrire le test qui échoue**

```ts
import { readFileSync } from "fs"
import path from "path"

/** Pages du périmètre audité dont le title ne doit pas contenir le suffixe marque. */
const PAGES = [
  "app/assistance/page.tsx",
  "app/contact/page.tsx",
  "app/nos-services/page.tsx",
  "app/qui-sommes-nous/page.tsx",
  "app/telephonie-3cx/page.tsx",
]

describe("title et template de marque", () => {
  it("le layout racine applique bien un template de suffixe", () => {
    const rootLayout = readFileSync(
      path.join(process.cwd(), "app", "layout.tsx"),
      "utf-8",
    )
    expect(rootLayout).toContain("template: `%s | ${SITE_NAME}`")
  })

  it.each(PAGES)(
    "%s ne répète pas le suffixe marque dans son title",
    (relativePath) => {
      const source = readFileSync(
        path.join(process.cwd(), relativePath),
        "utf-8",
      )

      // Toutes les déclarations title: "..." du fichier (metadata + openGraph).
      const titles = [...source.matchAll(/title:\s*"([^"]*)"/g)].map((m) => m[1])

      expect(titles.length).toBeGreaterThan(0)
      for (const title of titles) {
        expect(title).not.toContain("E2I VoIP")
      }
    },
  )
})
```

- [ ] **Step 2: Lancer le test pour vérifier qu'il échoue**

```bash
npx jest tests/seo-title-template.test.ts
```

Attendu : 5 échecs (un par page), le test du layout passe.

- [ ] **Step 3: Corriger les titles**

Retirer le segment ` - E2I VoIP` ou ` | E2I VoIP` de chaque title, y compris
dans les blocs `openGraph`. Valeurs cibles :

| Fichier | Nouveau title |
|---|---|
| `app/assistance/page.tsx:17` | `Assistance & Support \| Support technique DOM` |
| `app/contact/page.tsx:8` et `:14` | `Contact \| Experts téléphonie IP France & DOM` |
| `app/nos-services/page.tsx:20` | `Nos Services Téléphonie IP \| Solutions DOM` |
| `app/nos-services/page.tsx:26` et `:34` | `Nos Services Téléphonie IP` |
| `app/qui-sommes-nous/page.tsx:11` et `:17` | `Qui sommes-nous \| Opérateur télécom DOM` |
| `app/telephonie-3cx/page.tsx:16` | `Solutions 3CX \| Téléphonie 3CX Professionnelle` |
| `app/telephonie-3cx/page.tsx:32` | `Solutions 3CX` |

Note : `app/telephonie-3cx/page.tsx:22` vaut déjà
`Solutions 3CX - Téléphonie Professionnelle` (sans marque) — ne pas y toucher.

- [ ] **Step 4: Vérifier que le test passe**

```bash
npx jest tests/seo-title-template.test.ts
```

Attendu : 6 PASS.

- [ ] **Step 5: Commit**

```bash
git add tests/seo-title-template.test.ts app/
git commit -m "fix(seo): supprimer le suffixe marque dupliqué dans les titles

Le title.template du layout ajoute déjà ' | E2I VoIP'. Cinq pages le
contenaient déjà, produisant un doublon visible en SERP et dans les
aperçus sociaux.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 5 : Retirer le superlatif juridiquement exposé

**Files:**
- Modify: `components/about-section-simple.tsx:116`

Un superlatif absolu non prouvable (« Seul opérateur… ») relève de
l'allégation trompeuse au sens de l'article L121-2 du code de la consommation.

- [ ] **Step 1: Lire le contexte exact**

```bash
sed -n '110,122p' components/about-section-simple.tsx
```

- [ ] **Step 2: Remplacer la formulation**

Remplacer « Seul opérateur de services télécom avec Trunk SIP dédiés » par
« L'un des rares opérateurs à proposer des Trunk SIP dédiés ».

Adapter la grammaire de la phrase environnante si la suite l'exige (accord,
préposition), sans changer le sens.

- [ ] **Step 3: Vérifier qu'aucun superlatif ne subsiste**

```bash
grep -rn "Seul opérateur\|seul opérateur" app components lib
```

Attendu : aucun résultat.

- [ ] **Step 4: Commit**

```bash
git add components/about-section-simple.tsx
git commit -m "fix(legal): remplacer le superlatif absolu par une formulation défendable

'Seul opérateur' est une allégation superlative non prouvable au sens de
l'article L121-2 du code de la consommation.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 6 : Année dynamique du footer

**Files:**
- Modify: `components/layout/footer.tsx:261`

- [ ] **Step 1: Vérifier si le composant est client ou serveur**

```bash
head -3 components/layout/footer.tsx
```

Si `"use client"` est absent, c'est un Server Component : `new Date()`
s'évalue au build. Acceptable ici — le site est redéployé régulièrement — et
c'est la solution retenue par le handoff.

- [ ] **Step 2: Remplacer l'année en dur**

Ligne 261, remplacer :

```tsx
<p>&copy; 2025 E2I VoIP. Tous droits réservés.</p>
```

par :

```tsx
<p>&copy; {new Date().getFullYear()} E2I VoIP. Tous droits réservés.</p>
```

- [ ] **Step 3: Vérifier qu'aucune année en dur ne subsiste dans le footer**

```bash
grep -n "2025\|2024" components/layout/footer.tsx
```

Attendu : aucun résultat.

- [ ] **Step 4: Commit**

```bash
git add components/layout/footer.tsx
git commit -m "fix(footer): année de copyright dynamique

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 7 : Ajouter sameAs au JSON-LD

**Files:**
- Modify: `lib/structured-data.ts`

Le JSON-LD est déjà conforme : `organizationSchema()` déclare
`["Organization", "LocalBusiness"]` avec `areaServed` couvrant les quatre
territoires (ligne 147). Seul `sameAs` manque.

`sameAs` relie l'entité du site à ses profils officiels — c'est un signal de
désambiguïsation d'entité pour Google.

- [ ] **Step 1: Lire la fonction organizationSchema**

```bash
sed -n '19,60p' lib/structured-data.ts
```

- [ ] **Step 2: Demander l'URL LinkedIn à Alban**

L'URL exacte du profil LinkedIn de l'entreprise n'est pas dans le dépôt.
**Ne pas l'inventer** : une URL `sameAs` erronée pointe vers une entité qui
n'est pas E2I VoIP.

Si l'URL n'est pas disponible au moment de l'exécution, sauter cette tâche et
la signaler dans le résumé final. Le reste du lot A n'en dépend pas.

- [ ] **Step 3: Ajouter le champ sameAs**

Dans l'objet retourné par `organizationSchema()`, ajouter :

```ts
  sameAs: ["<URL LinkedIn fournie par Alban>"],
```

- [ ] **Step 4: Vérifier la validité du JSON-LD**

```bash
npx jest tests/ -t "structured" 2>&1 | tail -5
npm run type-check
```

Attendu : pas d'erreur de typage.

- [ ] **Step 5: Commit**

```bash
git add lib/structured-data.ts
git commit -m "feat(seo): ajouter sameAs au schema Organization

Signal de désambiguïsation d'entité reliant le site au profil officiel.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 7bis : Aligner les métadonnées Twitter divergentes

**Files:**
- Modify: les pages déclarant un bloc `twitter` dont le contenu diverge de
  leurs propres `title` / `description`

Une page qui ne déclare pas de bloc `twitter` hérite de celui du layout
racine : c'est correct, ne rien y ajouter. Seule la **divergence** est un
défaut — un aperçu social qui annonce autre chose que la page.

- [ ] **Step 1: Lister les pages déclarant un bloc twitter**

```bash
grep -rln "twitter:" app --include="*.tsx"
```

- [ ] **Step 2: Comparer twitter et metadata sur chaque page trouvée**

Pour chaque fichier listé :

```bash
grep -n "title:\|description:\|twitter:" <fichier>
```

Comparer le `title` / `description` du bloc `twitter` avec ceux de la page.

- [ ] **Step 3: Aligner les valeurs divergentes**

Là où le bloc `twitter` diverge, reprendre le `title` et la `description` de
la page. Ne pas toucher aux blocs `twitter` déjà cohérents, ni en créer là où
il n'y en a pas.

Si aucune divergence n'est trouvée, sauter la tâche et le signaler dans le
résumé — le finding de l'audit sera alors sans objet.

- [ ] **Step 4: Vérifier la compilation**

```bash
npm run type-check
```

Attendu : aucune erreur.

- [ ] **Step 5: Commit (uniquement si des divergences ont été corrigées)**

```bash
git add app/
git commit -m "fix(seo): aligner les métadonnées Twitter sur celles des pages

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 8 : Validation complète du lot A

- [ ] **Step 1: Lancer la validation intégrale**

```bash
npm run validate > /tmp/validate-lotA.log 2>&1; echo "EXIT_CODE=$?"
```

Attendu : `EXIT_CODE=0`.

- [ ] **Step 2: Vérifier le détail des contrôles**

```bash
grep -E "Tests:|Test Suites:|vulnerabilities|Compiled successfully" /tmp/validate-lotA.log
```

Attendu : tests passés (le nombre a augmenté avec les nouveaux tests SEO),
0 vulnérabilité, build compilé.

Si un test E2E Playwright échoue sur un title modifié, c'est une conséquence
attendue de la Task 4 : mettre à jour l'assertion du test E2E concerné, ne pas
revenir sur le correctif.

---

# LOT B — Repositionnement éditorial

## Task 9 : Test de verrouillage des arbitrages éditoriaux

**Files:**
- Create: `tests/repositionnement-editorial.test.tsx`

Ces tests ne jugent pas la qualité éditoriale : ils protègent les décisions
prises en brainstorming contre une régression future.

- [ ] **Step 1: Écrire le test qui échoue**

```tsx
import { readFileSync } from "fs"
import path from "path"

const read = (relativePath: string) =>
  readFileSync(path.join(process.cwd(), relativePath), "utf-8")

describe("repositionnement éditorial — home", () => {
  const hero = () => read("components/homepage-hero-section-simple.tsx")

  it("le H1 ne vend plus l'économie tarifaire", () => {
    expect(hero()).not.toContain("Économisez 20")
  })

  it("le H1 porte l'ancrage territorial DOM", () => {
    // Finding n°4 de l'audit : ni « DOM » ni « Antilles-Guyane » dans le H1.
    const h1Match = hero().match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
    expect(h1Match).not.toBeNull()
    expect(h1Match![1]).toContain("DOM")
  })

  it("le CTA principal ouvre une conversation, pas un devis", () => {
    // Le mot « devis » conditionne le visiteur à demander un prix.
    expect(hero()).toContain('href="/contact"')
    expect(hero()).not.toContain("Faire un devis")
  })

  it("la stat d'économie est remplacée par une preuve de déploiement", () => {
    expect(hero()).not.toMatch(/value:\s*"20%"/)
    expect(hero()).toContain("60+")
  })
})

describe("repositionnement éditorial — nos-services", () => {
  const page = () => read("app/nos-services/page.tsx")

  it("ne construit plus son argumentaire sur les 20 % d'économies", () => {
    expect(page()).not.toContain("20% d'économies")
    expect(page()).not.toContain("Prêt à économiser")
  })
})

describe("conformité juridique", () => {
  it("aucun superlatif absolu non prouvable", () => {
    expect(read("components/about-section-simple.tsx")).not.toMatch(
      /[Ss]eul opérateur/,
    )
  })
})
```

- [ ] **Step 2: Lancer le test pour vérifier qu'il échoue**

```bash
npx jest tests/repositionnement-editorial.test.tsx
```

Attendu : le test « conformité juridique » PASS (corrigé en Task 5), tous les
autres FAIL.

- [ ] **Step 3: Commit du test rouge**

```bash
git add tests/repositionnement-editorial.test.tsx
git commit -m "test(seo): verrouiller les arbitrages du repositionnement éditorial

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 10 : Ancre sur le bloc de preuve TBF

**Files:**
- Modify: `app/qui-sommes-nous/page.tsx` (bloc « Cas client emblématique », vers la ligne 291)

La stat « 60+ postes » de la hero doit pointer vers sa preuve. Le bloc TBF
n'a aujourd'hui aucune ancre HTML.

- [ ] **Step 1: Localiser le bloc**

```bash
grep -n "Cas client emblématique" app/qui-sommes-nous/page.tsx
```

- [ ] **Step 2: Ajouter l'ancre sur le conteneur du bloc**

Sur la `<div>` qui contient le titre « Cas client emblématique », ajouter
`id="cas-client-tbf"` et une marge de défilement pour que l'ancre ne soit pas
masquée par le header fixe :

```tsx
<div
  id="cas-client-tbf"
  className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8 scroll-mt-24"
>
```

`scroll-mt-24` compense la hauteur du header fixe lors du saut d'ancre.

- [ ] **Step 3: Vérifier**

```bash
grep -n 'id="cas-client-tbf"' app/qui-sommes-nous/page.tsx
```

Attendu : une occurrence.

- [ ] **Step 4: Commit**

```bash
git add app/qui-sommes-nous/page.tsx
git commit -m "feat(seo): ancre sur le bloc de preuve Groupe TBF

Permet à la statistique de la home de pointer vers sa preuve.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 11 : Réécrire la hero

**Files:**
- Modify: `components/homepage-hero-section-simple.tsx`

- [ ] **Step 1: Remplacer le tableau des stats (lignes 8-13)**

```tsx
  const stats = [
    { Icon: Globe, value: "4", label: "Territoires DOM couverts" },
    { Icon: Certificate, value: "15", label: "Années d'expertise télécom" },
    { Icon: Phone, value: "Mail & Tél", label: "Support technique France Métropolitaine et DOM" },
    { Icon: Star, value: "60+", label: "Postes migrés sur 3 territoires" },
  ];
```

- [ ] **Step 2: Remplacer le badge (lignes 39-42)**

```tsx
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-primary/10 border border-red-primary/20 text-red-300 text-sm font-medium mb-8">
            <Star size={16} className="mr-2" />
            Opérateur de services télécom · Antilles, Guyane, La Réunion
          </div>
```

- [ ] **Step 3: Remplacer le H1 (lignes 45-51)**

L'emphase rouge passe du chiffre d'économie à l'échéance réglementaire :

```tsx
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Le réseau cuivre <span className="text-red-300">s&apos;arrête en 2027</span>.
            <br />
            Votre téléphonie DOM est-elle prête&nbsp;?
          </h1>
```

- [ ] **Step 4: Remplacer le sous-titre (lignes 54-61)**

```tsx
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            Trunk SIP éligibles Antilles-Guyane et La Réunion, portabilité de
            vos numéros locaux, migration sans coupure.
            <br />
            <span className="text-gray-300 font-medium">
              Nous accompagnons les entreprises des DOM depuis 15 ans.
            </span>
          </p>
```

- [ ] **Step 5: Remplacer le CTA principal (lignes 65-67)**

```tsx
            <CTAButton href="/contact" icon={Phone}>
              Parler à un expert DOM
            </CTAButton>
```

Le CTA secondaire (Trunk SIP) reste inchangé.

- [ ] **Step 6: Rendre la stat TBF cliquable vers sa preuve**

Dans le `.map()` des stats (lignes 76-88), envelopper la stat dont la valeur
est `60+` d'un lien vers l'ancre créée en Task 10. Remplacer le corps du map :

```tsx
            {stats.map((stat, index) => {
              const content = (
                <>
                  <div className="flex items-center justify-center mb-2">
                    <stat.Icon size={24} className="text-red-300 mr-2" />
                    <span className="text-3xl font-bold font-mono tabular-nums text-white drop-shadow-lg">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm drop-shadow-md">
                    {stat.label}
                  </p>
                </>
              );

              return (
                <div key={index} className="text-center">
                  {stat.value === "60+" ? (
                    <Link
                      href="/qui-sommes-nous#cas-client-tbf"
                      className="block rounded-lg transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
```

Ajouter l'import en haut du fichier, après l'import de `Image` :

```tsx
import Link from "next/link";
```

- [ ] **Step 7: Vérifier que les tests de la hero passent**

```bash
npx jest tests/repositionnement-editorial.test.tsx -t "home"
```

Attendu : 4 PASS.

- [ ] **Step 8: Commit**

```bash
git add components/homepage-hero-section-simple.tsx
git commit -m "feat(seo): repositionner la hero sur l'expertise DOM

Le H1 quitte l'intention prix pour l'échéance cuivre 2027 et intègre
l'ancrage territorial absent jusqu'ici. Le CTA principal ouvre une
conversation de diagnostic au lieu d'un devis. La stat d'économie cède
la place à une preuve de déploiement liée au cas client TBF.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 12 : Déclasser le -20 % sur /nos-services

**Files:**
- Modify: `app/nos-services/page.tsx` lignes 22, 48, 134, 215, 385, 399

L'angle de remplacement suit la hero : continuité de service et éligibilité
DOM au lieu de l'économie tarifaire. Le titre de carte cède la place à un
bénéfice de même nature, pas à une reformulation du prix.

- [ ] **Step 1: Lire chaque occurrence dans son contexte**

```bash
grep -n "20%\|économiser\|Économies" app/nos-services/page.tsx
```

- [ ] **Step 2: Remplacer la meta description (ligne 22)**

```ts
    "Découvrez nos solutions de téléphonie IP pour entreprises. Trunk SIP DOM, 3CX PRO, interconnexion agents vocaux IA. Éligibilité Antilles-Guyane-Réunion et portabilité de vos numéros locaux ☎",
```

- [ ] **Step 3: Remplacer le bullet de bénéfice (ligne 48)**

```ts
        "Éligibilité Trunk SIP DOM",
```

- [ ] **Step 4: Remplacer le titre de carte (ligne 134)**

```ts
      title: "Continuité de service",
```

Adapter la description associée de la carte si elle mentionne les économies :
la remplacer par la continuité (migration sans coupure, portabilité des
numéros locaux).

- [ ] **Step 5: Remplacer le paragraphe (ligne 215)**

Remplacer le fragment `solutions complètes : 20% d'économies sur vos
communications et fonctionnalités` par :

```
solutions complètes : Trunk SIP éligibles dans les DOM, portabilité de vos numéros locaux et fonctionnalités
```

Conserver la suite de la phrase existante après « fonctionnalités ».

- [ ] **Step 6: Remplacer le CTA final (lignes 385 et 399)**

Ligne 385, le bloc contient `Prêt à économiser <span ...>20%</span>`. Le
remplacer intégralement — balise `<span>` comprise — par :

```tsx
                Prêt à préparer la fin du <span className="text-red-primary">cuivre</span>
```

L'emphase rouge se déplace du chiffre vers le mot porteur de tension, comme
dans la hero.

Ligne 399, remplacer le libellé `Demander un devis` par
`Parler à un expert DOM`. Vérifier le `href` du composant englobant et le
passer à `/contact` s'il pointe vers `/devis-en-ligne`.

- [ ] **Step 7: Vérifier que les tests passent**

```bash
npx jest tests/repositionnement-editorial.test.tsx
```

Attendu : tous PASS.

- [ ] **Step 8: Commit**

```bash
git add app/nos-services/page.tsx
git commit -m "feat(seo): déclasser l'argument prix sur /nos-services

La page était bâtie autour du -20 % (meta, bullet, carte, paragraphe,
CTA), créant une dissonance avec la nouvelle hero. L'argumentaire passe
sur la continuité de service et l'éligibilité DOM.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 13 : Stat 20 % dans about-section-simple

**Files:**
- Modify: `components/about-section-simple.tsx:41`

- [ ] **Step 1: Remplacer la stat**

Ligne 41, remplacer :

```tsx
    { value: "20%", label: "D'économies sur les communications DROM", Icon: Bolt },
```

par :

```tsx
    { value: "60+", label: "Postes migrés sur 3 territoires", Icon: Bolt },
```

- [ ] **Step 2: Vérifier**

```bash
grep -n "20%" components/about-section-simple.tsx
```

Attendu : aucun résultat.

- [ ] **Step 3: Commit**

```bash
git add components/about-section-simple.tsx
git commit -m "feat(seo): remplacer la stat d'économie par une preuve de déploiement

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 14 : Meta description de la home

**Files:**
- Modify: `app/layout.tsx` (champ `description`, ligne 40-41)

La description du layout sert la home. Elle ne contient aujourd'hui aucune
entité territoriale.

- [ ] **Step 1: Remplacer la description**

```ts
  description:
    "Opérateur de services télécom pour les entreprises des DOM. Trunk SIP éligibles Guadeloupe, Martinique, Guyane et La Réunion, portabilité de vos numéros locaux, 3CX et PBX Yeastar. Préparez la fin du réseau cuivre.",
```

Longueur : environ 215 caractères. Google tronque vers 155-160, mais une
description complète reste utile pour les autres moteurs et les partages.

- [ ] **Step 2: Vérifier la cohérence des descriptions sociales**

Vérifier que `openGraph.description` et `twitter.description` du layout ne
contredisent pas la nouvelle description. Les aligner sur une version courte :

```ts
    description:
      "Opérateur de services télécom des DOM : Trunk SIP éligibles Antilles-Guyane-Réunion, portabilité de vos numéros locaux, 3CX et PBX Yeastar.",
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(seo): meta description de la home avec les entités territoriales

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 15 : Validation finale et PR

- [ ] **Step 1: Validation intégrale**

```bash
npm run validate > /tmp/validate-final.log 2>&1; echo "EXIT_CODE=$?"
```

Attendu : `EXIT_CODE=0`.

Si un test E2E Playwright échoue sur un texte de hero modifié, c'est une
conséquence attendue du lot B : mettre à jour l'assertion, ne pas revenir sur
le repositionnement.

- [ ] **Step 2: Vérifier qu'aucune régression textuelle ne subsiste**

```bash
grep -rn "Seul opérateur" app components lib
grep -rn "Économisez 20\|20% d'économies" app components
grep -n "2025" components/layout/footer.tsx
```

Attendu : aucun résultat pour les deux premiers. Les pages produit
(`pbx-yeastar`, `trunk-sip-compteur`) conservent légitimement « jusqu'à 20 % »
— hors périmètre, ne pas y toucher.

- [ ] **Step 3: Relire le diff complet**

```bash
git diff origin/dev --stat
```

- [ ] **Step 4: Pousser et ouvrir la PR**

```bash
git push -u origin feat/repositionnement-seo-editorial
gh pr create --base dev \
  --title "feat(seo): repositionnement SEO technique et éditorial" \
  --body "$(cat <<'BODY'
## Contexte

Traite le handoff d'audit SEO & branding (score 58/100) en deux lots.
Spec : `docs/superpowers/specs/2026-08-29-repositionnement-seo-editorial-design.md`

## Lot A — correctifs techniques

- **Canonical** : 9 pages héritaient de `canonical: "/"` du layout racine et
  se déclaraient doublons de la home, dont les trois pages Trunk SIP et
  `/telephonie-3cx`. Le fallback racine est supprimé et chaque page déclare
  désormais son canonical. Un test empêche la régression de revenir.
- **Titles dupliqués** : le `title.template` ajoutait un suffixe marque à des
  titles qui le contenaient déjà (5 pages, blocs openGraph compris).
- **Superlatif** : « Seul opérateur » → « L'un des rares opérateurs »
  (article L121-2 du code de la consommation).
- **Footer** : année de copyright dynamique.
- **JSON-LD** : ajout de `sameAs`. Le reste était déjà conforme.

## Lot B — repositionnement éditorial

- **Hero** : le H1 quitte l'intention prix pour l'échéance cuivre 2027 et
  intègre l'ancrage territorial DOM. Le CTA principal ouvre une conversation
  de diagnostic vers `/contact` au lieu d'un devis.
- **`/nos-services`** : l'argumentaire quitte le -20 % pour la continuité de
  service et l'éligibilité DOM.
- **Stat** : « 20 % d'économies » → « 60+ postes migrés », liée au cas client
  TBF comme preuve.

Les pages produit conservent « jusqu'à 20 % » : formulation de plafond plus
défendable et légitime en bas de tunnel.

## Hors périmètre

Bloc de preuve TBF sur la home, page `/cas-client/groupe-tbf`, refonte des
pages produit « Sur devis », GEO/AEO sur le blog.

## Dette assumée

Le H1 « cuivre 2027 » a une durée de vie d'environ 18 mois et devra être
repensé fin 2027.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
BODY
)"
```

- [ ] **Step 5: Ne pas merger**

La règle du projet est explicite : le merge revient à Alban.

---

## Suites identifiées, hors périmètre de ce plan

1. **Titles dupliqués restants** : 5 pages juridiques + `/blog` présentent le
   même défaut que la Task 4 mais n'étaient pas dans le périmètre audité.
2. **Specs 3CX PRO contradictoires** : « 4 appels simultanés minimum » (home)
   contre « +50 postes » (`/qui-sommes-nous`). Donnée commerciale, arbitrage
   d'Alban requis.
3. **Lot C** : bloc de preuve TBF sur la home, page `/cas-client/groupe-tbf`,
   refonte des pages produit « Sur devis », GEO/AEO sur le blog.
4. **Warnings préexistants** : images sans `width`/`height` explicites,
   `whileInView` passé à un élément DOM, rendu dynamique de `/blog`.
