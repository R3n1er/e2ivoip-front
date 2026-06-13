# Handoff de session — Révision des contenus

> **Pour reprendre dans une nouvelle conversation.** Ce document résume où on en
> est et comment démarrer la révision des contenus page par page.
>
> Date du handoff : 2026-06-12 · Branche : `dev`

---

## ✅ Ce qui est DÉJÀ fait (ne pas refaire)

### SEO technique complet — LIVRÉ (commit `547a97d`)
Tout le SEO technique des pages statiques est en place et vérifié en réel :
- Sitemap (`app/sitemap.ts`) refait depuis les routes réelles — blog = home seule
- robots.txt (`app/robots.ts`) + 11 crawlers IA autorisés (GEO/AEO)
- metadata uniques sur les 4 pages qui en manquaient + metadataBase + canonical
- JSON-LD centralisé (`lib/structured-data.ts`) : Organization/LocalBusiness,
  WebSite, Service, BreadcrumbList, FAQPage
- `public/llms.txt`, FAQ partagées (`lib/faq-data.tsx`)
- `e2ivoip.fr` éliminé partout → `www.e2i-voip.com` (source : `lib/site.ts`)

`npm run validate` vert (53 suites, 319 tests, build, e2e).

### Reste côté Alban (hors code, à NE PAS coder)
- [ ] `NEXT_PUBLIC_BASE_URL=https://www.e2i-voip.com` sur Vercel
- [ ] Redirection apex → www sur Vercel
- [ ] Post-lancement : soumettre sitemap à Google Search Console + Bing Webmaster
- [ ] Blog : récupérer les slugs HubSpot (phase ultérieure, hors révision contenus)

---

## 🎯 Objectif de la PROCHAINE session : révision des contenus

**Plan de référence : `docs/plan-revision-contenus.md`** (déjà rédigé, conforme
à la ligne éditoriale). Le suivre page par page.

### Méthode (validée)
1. Je relis chaque page (contenu réel du code) et liste les corrections proposées.
2. Alban valide / arbitre les points métier (prix, cannibalisation, chiffres).
3. J'applique les corrections validées.
4. Re-vérif finale : `npm run validate` + check visuel des pages clés.

### Rappels ligne éditoriale (RÈGLE — à respecter sur toutes les pages)
- ❌ **Pas de nombre de clients** (« 100+ clients », « 500+ entreprises »)
- ✅ **15 ans** d'expérience
- ✅ **20 %** d'économies (DROM) — **sans « garanties »**
- ✅ Support **mail + téléphone, L-V 8h-18h** — ❌ jamais « 24/7 »
- ✅ Présence DOM : Guadeloupe, Martinique, Guyane (équipes) + Réunion
- ⚠️ Aucune « garantie » / SLA chiffré non tenable

---

## 📍 Par où commencer

Ordre suggéré (le plus stratégique d'abord) :
1. **`/` (accueil)** — stats hero, H1, maillage vers offres
2. **`/qui-sommes-nous`** — ✅ déjà vérifié sur `dev` : PLUS de « 100+ clients / 30% »
   (point chaud résolu). Relire quand même le reste du contenu.
3. **`/telephonie-entreprise/trunk-sip-agents-ia`** — page pivot
4. Puis dérouler le tableau des 17 pages dans `docs/plan-revision-contenus.md`

### Points d'arbitrage métier à préparer (Alban)
- **Cannibalisation 3CX** : 3 pages ciblent « 3CX » (`telephonie-3cx`,
  `3cx-cloud`, `3cx-smb-mutualisee`) → garder distinctes (définir l'angle de
  chacune) ou fusionner/rediriger ?
- **Prix** : confirmer « 15 €/utilisateur/mois » (3CX SMB) et autres tarifs publics
- **Tally compteur** : re-tester visuellement le tunnel de leads

---

## 🗂️ Fichiers clés à connaître
- `docs/plan-revision-contenus.md` — LE plan à dérouler
- `docs/PLAN-RELECTURE-MISE-EN-LIGNE.md` — audit SEO d'origine (contexte)
- `.planning/STATE.md` — état projet (gitignoré, local)
- `docs/BrandBrief_e2ivoip.md`, `design.md` — ligne éditoriale
- `docs/CHARTE_GRAPHIQUE.md` — charte (règle absolue, permission pour modifier)

---

## 🚀 Phrase d'amorçage pour la nouvelle conversation

> « Reprends la révision des contenus E2I VoIP. Lis
> `docs/HANDOFF-REVISION-CONTENUS.md` et `docs/plan-revision-contenus.md`, puis
> commence par relire la page d'accueil (`/`) et propose les corrections. »
