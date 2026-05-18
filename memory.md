# MEMORY.md — Suivi Projet E2I VoIP

> Mémoire centrale du projet : décisions, contexte, références.
> Source de vérité partagée entre l'humain et les assistants IA (Claude Code, Cursor, Copilot).
> Dernière mise à jour : 2026-05-18

---

## 🎯 Projet

**Nom** : E2I VoIP — refonte du site web
**Site existant** : https://www.e2i-voip.com
**Stack** : NextJS 15 (App Router) + DaisyUI + Tailwind + Vercel
**Repo** : `e2ivoip-front` (branche principale : `main`, dev : `dev`)
**Méthodologie** : TDD strict (RED → GREEN → REFACTOR → DOCUMENT → COMMIT → DEPLOY)

**Offres retirées du site (ne pas réintroduire sans décision produit)** : téléphonie mobile E2I (MVNO Orange, Box 4G/5G nomades), page `/mobilite`. Softphone 3CX mobile documenté via `/telephonie-3cx` uniquement.

---

## 🎨 Identité Visuelle

### Charte graphique (RÈGLE ABSOLUE)

La charte graphique officielle est **la seule source de vérité** pour les couleurs, la typographie et l'application visuelle.

**Fichiers de référence** :
- `docs/CHARTE_GRAPHIQUE.md` — version Markdown (source technique)
- `docs/Charte_Graphique_E2I_VoIP.docx` — version Word (documents commerciaux)
- `docs/BrandBrief_e2ivoip.md` — brief de marque complet (positionnement, ton, persona)

### Couleurs officielles (à respecter strictement)

| Rôle | Hex | RGB | Usage |
|---|---|---|---|
| Rouge Principal | `#E53E3E` | 229, 62, 62 | CTA, hover, accents, « 2 » dans E2I, « IP » dans VOIP |
| Bleu Marine | `#2D3848` | 45, 56, 72 | Lettres E/I dans E2I, sous-titres, accents secondaires |
| Gris Secondaire | `#818096` | 129, 128, 150 | « VO » dans VOIP, baseline, textes secondaires |
| Gris Foncé | `#1F2937` | 31, 41, 55 | Texte principal, header non scrolled |
| Blanc | `#FFFFFF` | 255, 255, 255 | Fond clair, header scrolled |

**Règle** : aucune couleur hors charte ne doit être introduite sans validation explicite.

### Variables CSS / Tailwind

```css
:root {
  --red-primary: #E53E3E;
  --blue-marine: #2D3848;
  --gray-secondary: #818096;
  --gray-dark: #1F2937;
}
```

Classes Tailwind : `text-red-primary`, `bg-red-primary`, `text-blue-marine`, `bg-blue-marine`, `text-gray-secondary`, `text-gray-dark`.

Thème DaisyUI (`e2ivoip`) : `primary` = `#E53E3E`, `secondary` = `#818096`, `accent` = `#2D3848`, `neutral` = `#1F2937`.

### Hero gradient officiel (OBLIGATOIRE)

```css
bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85
```

---

## 🧱 Stack & Conventions

| Domaine | Choix | Notes |
|---|---|---|
| UI | DaisyUI (1) → Tailwind (2) → shadcn/ui (3) | DaisyUI prioritaire systématiquement |
| Icônes | Lineicons → React Icons (fallback) | `lib/icons.ts` pour les mappings |
| État UI | Zustand | local : loading/erreur |
| État serveur | TanStack Query | mutations API |
| Validation | Zod + React Hook Form | schémas dans `lib/validation/` |
| Animations | Framer Motion via `lib/utils/lazy-motion.tsx` | ~60 KB économisés |
| Tests | Jest (unit) + Playwright (E2E) | obligatoires par feature |
| Déploiement | Vercel | preview auto sur PR, prod sur merge `main` |

---

## 📁 Structure Clé

```
e2ivoip-front/
├── app/                       # Pages NextJS (App Router)
├── components/
│   ├── hubspot/              # Universal form HubSpot
│   ├── layout/               # Header/footer
│   ├── ui/                   # DaisyUI customisés
│   └── features/             # Composants métier
├── lib/
│   ├── constants/hubspot.ts
│   ├── hooks/                # Hooks domain-organized
│   ├── utils/lazy-motion.tsx
│   └── validation/           # Schémas Zod
├── docs/
│   ├── CHARTE_GRAPHIQUE.md
│   ├── Charte_Graphique_E2I_VoIP.docx
│   └── BrandBrief_e2ivoip.md
├── tests/                    # Jest + Playwright
└── memory.md                 # CE FICHIER (suivi projet)
```

---

## 🔗 Intégrations

- **Tally** : popup conversion, ID `mDY1bl`, déclenchement 3s — composants `TallyPopupClean` + `ClientWrapperTally`
- **HubSpot** : formulaires universels via `components/hubspot/`
- **Vercel** : déploiement continu, env vars gérées via `vercel env`
- **dotenvx** : `.env` chiffré, `.env.keys` jamais committé, `.mcp.json` non tracké

---

## 🛠 Workflow Git

```bash
git checkout -b feature/nom
# TDD : tests → implémentation → refactor
npm run validate              # lint + type-check + tests + build
git add . && git commit -m "feat: description"
git push origin feature/nom
gh pr create --title "feat: description"
# Merge → auto-deploy prod via Vercel
```

**Règle absolue pre-push** : exécuter `npm run validate` et obtenir 6/6 ✅
1. Jest 2. Playwright 3. ESLint 4. TypeScript 5. `npm audit` (no high/critical) 6. Build prod

---

## 📌 Décisions & Historique Récent

- **2026-05-18** — **Suppression page `/mobilite`** : fichier `app/mobilite/page.tsx` retiré (404 naturelle). Menus et tests déjà sans lien Mobilité depuis ADR 2025-09-27. Softphone 3CX mobile couvert par `/telephonie-3cx`.
- **2026-04-28** — **Retrait du produit Mobile 4G/5G du catalogue** (offre MVNO Orange + Box 4G/5G nomades + backup 4G/5G). N'est plus commercialisé. Sections supprimées dans : `BrandBrief_e2ivoip.md` §E, `SPEC_STRATEGIE_VENTE_MARKETING.md` §4.5, `roadmap.md`, `ligne-editoriale.md`, `plan-revision-contenus.md` (page `/nos-services/box-4g-5g-secours` retirée). Conservé : mentions de "Box 4G" dans les FAQ Trunk SIP comme **type de connexion internet acceptée** (pas une offre commerciale E2I).
- **2026-04-28** — Spec stratégie vente & marketing créée (`docs/SPEC_STRATEGIE_VENTE_MARKETING.md` + `.docx` généré via `scripts/build_spec_docx.py` avec charte E2I appliquée).
- **2026-04-28** — Charte graphique convertie en `.docx` (`docs/Charte_Graphique_E2I_VoIP.docx`) pour usage dans documents commerciaux Word. Couleurs réelles appliquées (swatches, titres colorés).
- **2026-04-xx** — Phase 03 : redesign + SEO content (cf. commits `62ca4d9`, `094544a`).

---

## 🚦 Permissions Fichiers

### ✅ Auto-modification (sans permission)

- Configs : `package.json`, `next.config.js`, `tailwind.config.js`, `vercel.json`, `tsconfig.json`, `jest.config.*`, `playwright.config.*`, `.gitignore`
- Code : `app/**`, `components/**`, `lib/**`, `tests/**`, `__tests__/**`
- Docs techniques : `README.md`, `docs/api/**`, `docs/components/**`
- CI/CD : `.github/workflows/**`, `.husky/**`

### ⚠️ Permission requise

- `docs/PRD.md`
- `docs/roadmap.md`
- `docs/CHARTE_GRAPHIQUE.md` ← **ne jamais modifier sans validation explicite**
- `docs/Charte_Graphique_E2I_VoIP.docx` ← idem
- `docs/BrandBrief_e2ivoip.md` ← idem
- `.env.production`
- Schémas DB / migrations

---

## 📚 Références Externes

- NextJS : https://nextjs.org/docs
- DaisyUI : https://daisyui.com/components/
- Lineicons : https://lineicons.com/icons/
- Vercel : https://vercel.com/docs
- Playwright : https://playwright.dev/

---

*Ce fichier est maintenu manuellement. À mettre à jour à chaque décision structurante (stack, charte, workflow, intégration).*
