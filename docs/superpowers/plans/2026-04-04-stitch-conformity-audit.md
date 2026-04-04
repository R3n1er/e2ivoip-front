# Plan d'audit et adaptation Stitch Monolithe 2026 — Toutes pages (sauf accueil)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verifier et adapter chaque page du site au design Stitch Monolithe 2026, en conservant le contenu de la branche main, et en mappant les icones Material Symbols vers Lineicons.

**Architecture:** Pour chaque page : (1) recuperer la maquette Stitch via MCP, (2) recuperer le contenu main via `git show main:`, (3) adapter le style au design Stitch tout en conservant le contenu metier, (4) verifier la conformite Design System, (5) ajouter le SEO manquant (canonical, OG, JSON-LD).

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS, Lineicons, Stitch MCP, Playwright

---

## Mapping Icones Material Symbols → Lineicons

Les maquettes Stitch utilisent Material Symbols. Le projet utilise Lineicons. Voici le mapping de remplacement :

| Material Symbol | Lineicons | Usage |
|----------------|-----------|-------|
| `support_agent` | `lni lni-customer` | Support / hotline |
| `chat` | `lni lni-comments` | WhatsApp / chat |
| `location_on` | `lni lni-map-marker` | Localisations |
| `verified_user` | `lni lni-shield` | Certifications / securite |
| `security` | `lni lni-lock` | Securite VoIP |
| `precision_manufacturing` | `lni lni-cog` | Expertise technique |
| `hub` | `lni lni-network` | Reseau / connectivite |
| `keyboard_arrow_down` | `lni lni-chevron-down` | Dropdown menus |
| `person` | `lni lni-user` | Espace client |
| `phone_forwarded` | `lni lni-phone` | Telephonie |
| `smart_toy` | `lni lni-robot` | IA / assistants vocaux |
| `mic_external_on` | `lni lni-microphone` | Studio attente |
| `cloud_done` | `lni lni-cloud` | Cloud / SaaS |
| `send` | `lni lni-arrow-right` | Envoi / CTA |
| `add` | `lni lni-plus` | Accordion open |
| `language` | `lni lni-world` | International |
| `share` | `lni lni-share` | Partage |
| `account_circle` | `lni lni-user` | Compte |

---

## Inventaire des pages et priorites

### Phase 1 — Pages deja adaptees (VERIFICATION SEULEMENT)

| Page | Maquette Stitch | Status |
|------|----------------|--------|
| `/qui-sommes-nous` | `9ee5815568b6...` | Adapte — a verifier |
| `/mentions-legales` | `3a8ce738fae9...` / `cdae615e8ba7...` | Adapte — a verifier |
| `/contact` | `e41b42d0c621...` / `14d9b862f5f1...` | Adapte — a verifier |

### Phase 2 — Pages services (ADAPTATION REQUISE)

| Page | Maquette Stitch | Contenu main |
|------|----------------|--------------|
| `/telephonie-3cx` | A generer via Stitch | Oui |
| `/telephonie-entreprise/trunk-sip-compteur` | A generer via Stitch | Oui |
| `/telephonie-entreprise/trunk-sip-illimite` | A generer via Stitch | Oui |
| `/telephonie-entreprise/3cx-smb-mutualisee` | A generer via Stitch | Oui |
| `/telephonie-entreprise/pbx-yeastar` | A generer via Stitch | Oui |
| `/studio-attente` | A generer via Stitch | Oui |
| `/nos-services/assistants-vocaux-ia` | A generer via Stitch | Oui |
| `/devis-en-ligne` | Ref landing page Stitch | Oui |

### Phase 3 — Pages legales et utilitaires (ADAPTATION LEGERE)

| Page | Maquette Stitch | Contenu main |
|------|----------------|--------------|
| `/politique-confidentialite` | Style mentions-legales | Oui |
| `/assistance` | A generer via Stitch | Oui |
| `/blog` | Style Stitch generique | Oui |
| `/nos-services` (index) | Style Stitch generique | Oui |
| `/telephonie-entreprise` (index) | Style Stitch generique | Oui |
| `/telephonie-entreprise/trunk-sip` (index) | Style Stitch generique | Oui |

### Hors scope

| Page | Raison |
|------|--------|
| `/` (accueil) | Exclue explicitement |
| `/offline` | Page technique PWA |
| `/mobilite` | Page secondaire |
| `/3cx-cloud` | Redirection potentielle |
| `/blog/[slug]` | Template dynamique |
| `/blog/categorie/[slug]` | Template dynamique |

---

## Phase 1 — Verification des pages deja adaptees

### Task 1: Audit visuel des 3 pages adaptees

**Files:**
- Read: `app/qui-sommes-nous/page.tsx`
- Read: `app/mentions-legales/page.tsx`
- Read: `app/contact/page.tsx`

- [ ] **Step 1: Recuperer les maquettes Stitch a jour**

```bash
# Qui sommes-nous
mcp__stitch__get_screen projectId=5386927507224192183 screenId=9ee5815568b64f8e909e7c864ced49df

# Mentions legales (version Unified Header)
mcp__stitch__get_screen projectId=5386927507224192183 screenId=cdae615e8ba740ce81372eb8f6fee342

# Contact (version Unified Header)
mcp__stitch__get_screen projectId=5386927507224192183 screenId=14d9b862f5f14a0ab9f7ce7129a5e3d8
```

- [ ] **Step 2: Telecharger les HTML et screenshots**

```bash
curl -L -o /tmp/stitch-qui-sommes-nous-v2.html "[URL du downloadUrl]"
curl -L -o /tmp/stitch-mentions-legales-v2.html "[URL du downloadUrl]"
curl -L -o /tmp/stitch-contact-v2.html "[URL du downloadUrl]"
```

- [ ] **Step 3: Comparer chaque section avec le code actuel**

Pour chaque page, verifier :
- [ ] Hero : hauteur, layout (centre/gauche), titre taille, sous-titre, motif fond
- [ ] Sections : structure grid, espacement, borders, shadows
- [ ] Typographie : `font-black` vs `font-bold`, tracking, uppercase
- [ ] Couleurs : palette charte uniquement (#E53E3E, #2D3848, #1F2937, #091421)
- [ ] Icones : Lineicons au lieu de Material Symbols
- [ ] Boutons : `.monolith-btn` ou style Stitch (shadow, active:translate)
- [ ] SEO : canonical, OG complet, JSON-LD si pertinent
- [ ] Zero email sur toute la page

- [ ] **Step 4: Lister les ecarts et corriger**

Rapport d'ecarts avec fichier:ligne pour chaque violation.

- [ ] **Step 5: Lancer les tests Playwright existants**

```bash
npx playwright test tests/e2e/header-simple.spec.ts --reporter=line
npx playwright test tests/playwright/qui-sommes-nous.spec.ts --reporter=line
```

- [ ] **Step 6: Commit si corrections**

```bash
git add app/qui-sommes-nous/page.tsx app/mentions-legales/page.tsx app/contact/page.tsx
git commit -m "fix: alignement Stitch post-audit — qui-sommes-nous, mentions-legales, contact"
```

---

## Phase 2 — Adaptation des pages services

### Task 2: Page `/telephonie-3cx`

**Files:**
- Read: `app/telephonie-3cx/page.tsx` (dev)
- Read: `git show main:app/telephonie-3cx/page.tsx` (contenu reference)
- Modify: `app/telephonie-3cx/page.tsx`
- Test: `tests/e2e/telephonie-3cx.spec.ts` (a creer)

- [ ] **Step 1: Recuperer le contenu main**

```bash
git show main:app/telephonie-3cx/page.tsx > /tmp/main-telephonie-3cx.tsx
```

- [ ] **Step 2: Generer la maquette Stitch via MCP**

```
mcp__stitch__generate_screen_from_text
  projectId: 5386927507224192183
  deviceType: DESKTOP
  prompt: "E2I VoIP - Page produit 3CX PRO dediee. Style Monolithe Numerique 2026 (neo-brutaliste). Hero sombre bg-[#091421] avec titre text-8xl font-black uppercase aligne gauche et border-l-8 rouge. Section features en bento grid asymetrique. Tableau comparatif SMB vs PRO avec hard shadows. Section temoignage client. CTA fond rouge. Footer blanc. Palette: #E53E3E, #2D3848, #1F2937, #091421, #FFFFFF. Zero border-radius."
```

- [ ] **Step 3: Telecharger et analyser la maquette**

```bash
curl -L -o /tmp/stitch-3cx.html "[URL]"
```

- [ ] **Step 4: Adapter le style Stitch au contenu main**

Regles d'adaptation :
- Hero : `bg-[#091421]` + motif radial + titre `text-8xl font-black uppercase`
- Sections : `py-32 px-8 lg:px-24`, titres avec barre rouge `w-12 h-1 bg-red-primary`
- Cards : `border-4 border-blue-marine shadow-[12px_12px_0px_0px_#1F2937]`
- Features : icones Lineicons (voir mapping ci-dessus)
- Tableau : `border-4`, headers `bg-[#091421] text-white`
- CTA : fond rouge `bg-red-primary border-y-8 border-blue-marine`
- Boutons : style Stitch `shadow-[8px_8px] active:translate hover:translate`
- SEO : canonical `/telephonie-3cx`, OG, JSON-LD Service
- Zero email

- [ ] **Step 5: Remplacer les icones**

```
Material Symbol → Lineicons
checkmark → lni lni-checkmark-circle
close → lni lni-close
phone → lni lni-phone
video → lni lni-video
comments → lni lni-comments
mobile → lni lni-mobile
link → lni lni-link
headphone_alt → lni lni-headphone-alt
certificate → lni lni-certificate
shield → lni lni-shield
users → lni lni-users
```

- [ ] **Step 6: Ecrire test Playwright**

```typescript
// tests/e2e/telephonie-3cx.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Page 3CX PRO", () => {
  test("affiche le hero avec le titre", async ({ page }) => {
    await page.goto("/telephonie-3cx");
    await expect(page.locator("h1")).toContainText(/3CX/i);
  });

  test("affiche le tableau comparatif", async ({ page }) => {
    await page.goto("/telephonie-3cx");
    await expect(page.locator("table, [data-testid='comparison-table']")).toBeVisible();
  });

  test("le CTA devis est present", async ({ page }) => {
    await page.goto("/telephonie-3cx");
    await expect(page.getByRole("link", { name: /devis/i })).toBeVisible();
  });
});
```

- [ ] **Step 7: Lancer les tests**

```bash
npx playwright test tests/e2e/telephonie-3cx.spec.ts --reporter=line
```

- [ ] **Step 8: Commit**

```bash
git add app/telephonie-3cx/page.tsx tests/e2e/telephonie-3cx.spec.ts
git commit -m "feat: page 3CX PRO — redesign Stitch Monolithe 2026"
```

---

### Task 3: Page `/telephonie-entreprise/trunk-sip-compteur`

**Files:**
- Modify: `app/telephonie-entreprise/trunk-sip-compteur/page.tsx`
- Test: `tests/e2e/trunk-sip-compteur.spec.ts` (a creer)

Meme workflow que Task 2 :
- [ ] **Step 1:** Recuperer contenu main
- [ ] **Step 2:** Generer maquette Stitch (prompt: "Page produit Trunk SIP au compteur. Tarification usage. Hero sombre, features bento grid, calculateur economies, CTA rouge.")
- [ ] **Step 3:** Telecharger et analyser
- [ ] **Step 4:** Adapter style Stitch + contenu main
- [ ] **Step 5:** Remplacer icones Material → Lineicons
- [ ] **Step 6:** Ecrire test Playwright (hero, pricing, CTA)
- [ ] **Step 7:** Lancer tests
- [ ] **Step 8:** Commit

---

### Task 4: Page `/telephonie-entreprise/trunk-sip-illimite`

**Files:**
- Modify: `app/telephonie-entreprise/trunk-sip-illimite/page.tsx`
- Test: `tests/e2e/trunk-sip-illimite.spec.ts` (existant — adapter)

- [ ] **Step 1-8:** Meme workflow (prompt: "Page produit Trunk SIP illimite. Forfait fixe. Hero sombre, avantages, zones couvertes DOM, CTA rouge.")

---

### Task 5: Page `/telephonie-entreprise/3cx-smb-mutualisee`

**Files:**
- Modify: `app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx`
- Test: `tests/e2e/3cx-smb.spec.ts` (a creer)

- [ ] **Step 1-8:** Meme workflow (prompt: "Page produit 3CX SMB mutualisee. A partir de 15eur/mois. Hero sombre, features, comparaison avec PRO, CTA rouge.")

---

### Task 6: Page `/telephonie-entreprise/pbx-yeastar`

**Files:**
- Modify: `app/telephonie-entreprise/pbx-yeastar/page.tsx`
- Test: `tests/e2e/pbx-yeastar.spec.ts` (a creer)

- [ ] **Step 1-8:** Meme workflow (prompt: "Page produit PBX Yeastar. Solution on-premise et cloud. Hero sombre, gamme produits, certifications, CTA rouge.")

---

### Task 7: Page `/studio-attente`

**Files:**
- Modify: `app/studio-attente/page.tsx`
- Test: `tests/e2e/studio-attente.spec.ts` (a creer)

- [ ] **Step 1-8:** Meme workflow (prompt: "Page service Studio attente telephonique. Enregistrement professionnel. Hero sombre, processus en 3 etapes, exemples audio, CTA rouge.")

Icones specifiques :
```
mic_external_on → lni lni-microphone
cloud_done → lni lni-cloud
```

---

### Task 8: Page `/nos-services/assistants-vocaux-ia`

**Files:**
- Modify: `app/nos-services/assistants-vocaux-ia/page.tsx`
- Test: `tests/e2e/assistants-vocaux-ia.spec.ts` (existant — adapter)

- [ ] **Step 1-8:** Meme workflow (prompt: "Page service Assistants vocaux IA. Accueil 24/7. Hero sombre, features IA, integrations, demo, CTA rouge.")

Icones specifiques :
```
smart_toy → lni lni-robot (ou lni lni-cog si robot indisponible)
```

---

### Task 9: Page `/devis-en-ligne`

**Files:**
- Modify: `app/devis-en-ligne/page.tsx`
- Test: `tests/e2e/devis-en-ligne.spec.ts` (a creer)

- [ ] **Step 1-8:** Meme workflow (prompt: "Page devis en ligne. Formulaire HubSpot en vedette. Hero sombre, avantages 3 colonnes, formulaire full-width, FAQ, CTA.")

Note : cette page contient un formulaire HubSpot (`TallyPopupClean` ou `InlineContactForm`) — conserver le composant existant, adapter uniquement le layout.

---

## Phase 3 — Pages legales et utilitaires

### Task 10: Page `/politique-confidentialite`

**Files:**
- Modify: `app/politique-confidentialite/page.tsx`

- [ ] **Step 1:** Recuperer contenu main
- [ ] **Step 2:** Appliquer le meme layout 8/4 que mentions-legales (pas de nouvelle maquette Stitch — reutiliser le pattern)
- [ ] **Step 3:** Sections numerotees (01. Collecte, 02. Utilisation, 03. Droits, etc.)
- [ ] **Step 4:** Sidebar avec CTA contact + info DPO (sans email)
- [ ] **Step 5:** SEO : canonical, OG
- [ ] **Step 6:** Commit

---

### Task 11: Page `/assistance`

**Files:**
- Modify: `app/assistance/page.tsx`

- [ ] **Step 1-6:** Meme workflow. Hero sombre, grille de canaux support (telephone, WhatsApp, formulaire), FAQ, CTA.

---

### Task 12: Pages index (`/nos-services`, `/telephonie-entreprise`, `/telephonie-entreprise/trunk-sip`)

**Files:**
- Modify: `app/nos-services/page.tsx`
- Modify: `app/telephonie-entreprise/page.tsx`
- Modify: `app/telephonie-entreprise/trunk-sip/page.tsx`

- [ ] **Step 1:** Recuperer contenu main pour les 3 pages
- [ ] **Step 2:** Appliquer style Stitch : hero sombre, cartes services avec border-l-4, links vers sous-pages, CTA
- [ ] **Step 3:** SEO : canonical, OG
- [ ] **Step 4:** Commit groupé

---

### Task 13: Page `/blog` (index)

**Files:**
- Modify: `app/blog/page.tsx`

- [ ] **Step 1:** Recuperer contenu main
- [ ] **Step 2:** Hero sombre style Stitch, grille articles avec cards border-4
- [ ] **Step 3:** SEO : canonical, OG
- [ ] **Step 4:** Commit

---

## Phase 4 — Validation finale

### Task 14: Audit global Design System

- [ ] **Step 1: Scan Monolithe sur toutes les pages modifiees**

```bash
# Pour chaque page, verifier les patterns interdits
grep -rn "rounded-lg\|rounded-xl\|rounded-2xl\|shadow-lg\|shadow-xl\|hover:scale-105\|from-blue-900\|pink-to-indigo" app/ --include="*.tsx" | grep -v node_modules | grep -v ".test."
```

- [ ] **Step 2: Verifier zero email**

```bash
grep -rn "mailto:\|@e2i-voip\|@e2i-voip.fr" app/ --include="*.tsx"
```
Expected: 0 resultats

- [ ] **Step 3: Verifier SEO (canonical sur chaque page)**

```bash
grep -rn "canonical" app/*/page.tsx app/*/*/page.tsx | grep -v node_modules
```
Expected: chaque page a une canonical URL

- [ ] **Step 4: Verifier les imports propres (pas de shadcn Card/Badge)**

```bash
grep -rn "from.*@/components/ui/card\|from.*@/components/ui/badge" app/ --include="*.tsx"
```
Expected: 0 resultats (sauf composants existants non-modifies)

- [ ] **Step 5: Lancer tous les tests E2E**

```bash
npx playwright test --reporter=line
```

- [ ] **Step 6: Build de verification**

```bash
npm run build
```

- [ ] **Step 7: Commit final et push**

```bash
git add -A
git commit -m "feat: audit Stitch Monolithe 2026 complet — toutes pages adaptees"
git push origin dev
```

---

## Checklist icones a ajouter par page

| Page | Icones Lineicons necessaires |
|------|------------------------------|
| `/telephonie-3cx` | `checkmark-circle`, `shield`, `users`, `phone`, `video`, `comments`, `mobile`, `link`, `headphone-alt`, `certificate`, `close`, `cog` |
| `/trunk-sip-compteur` | `checkmark-circle`, `phone`, `calculator`, `stats-up`, `world` |
| `/trunk-sip-illimite` | `checkmark-circle`, `phone`, `infinite`, `map-marker`, `world` |
| `/3cx-smb-mutualisee` | `checkmark-circle`, `users`, `cloud`, `shield`, `phone` |
| `/pbx-yeastar` | `checkmark-circle`, `server`, `cloud`, `shield`, `certificate` |
| `/studio-attente` | `microphone`, `music`, `headphone-alt`, `cloud`, `play` |
| `/assistants-vocaux-ia` | `robot` (ou `cog`), `microphone`, `comments`, `phone`, `bolt-alt` |
| `/devis-en-ligne` | `calculator`, `checkmark-circle`, `phone`, `timer` |
| `/assistance` | `customer`, `comments`, `phone`, `question-circle` |
| `/blog` | `pencil-alt`, `calendar`, `tag`, `arrow-right` |

---

## Estimation

| Phase | Tasks | Pages | Temps estime |
|-------|-------|-------|-------------|
| Phase 1 | 1 | 3 (verification) | 30 min |
| Phase 2 | 2-9 | 8 (adaptation complete) | 4-6h |
| Phase 3 | 10-13 | 6 (adaptation legere) | 2-3h |
| Phase 4 | 14 | Toutes (validation) | 1h |
| **Total** | **14** | **17 pages** | **~8-10h** |

Recommandation : executer en **subagent-driven** avec un agent par task pour paralleliser Phase 2.
