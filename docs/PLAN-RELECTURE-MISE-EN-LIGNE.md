# Plan de relecture & pré-mise en ligne — E2I VoIP

> **Objectif** : valider chaque page (contenu), corriger le SEO technique pour
> l'indexation Google/Bing, et optimiser le GEO/AEO pour la citation par les
> agents IA (ChatGPT, Perplexity, Google AI Overviews).
>
> **Statut** : diagnostic réalisé le 2026-06-12 (audit statique du code source,
> site pas encore en ligne).
>
> ✅ **DOMAINE DE PRODUCTION CONFIRMÉ (2026-06-12)** : `https://www.e2i-voip.com`
> (avec `www`, avec tiret — cohérent avec l'email `commerciaux@e2i-voip.com` du
> workflow n8n). Tout le SEO doit pointer là-dessus.
>
> ⚠️ **À corriger partout** : `e2ivoip.fr` est codé en dur dans `sitemap.ts`,
> `robots.txt` et le fallback `NEXT_PUBLIC_BASE_URL` → remplacer par
> `https://www.e2i-voip.com`. Définir aussi la variable d'env `NEXT_PUBLIC_BASE_URL`
> sur Vercel. Décider de la redirection apex → www (`e2i-voip.com` → `www.e2i-voip.com`).

---

## 🔴 Synthèse — état actuel

Le site a un **héritage SEO HubSpot non nettoyé** qui le rend, en l'état,
**partiellement inindexable correctement**. Les fondations techniques sont à
reprendre avant publication. Bonne nouvelle : le contenu et la structure HTML
(H1, headings) sont sains ; c'est surtout la couche SEO/métadonnées qui pèche.

| Axe | État | Gravité |
|-----|------|---------|
| Contenu des pages | Sain, à relire au cas par cas | 🟡 Moyen |
| Sitemap | **Fantôme** (déclare des 404, omet les vraies pages) | 🔴 Critique |
| robots.txt | Vestige HubSpot (chemins inexistants) | 🔴 Critique |
| Metadata par page | 4 pages stratégiques sans metadata | 🔴 Critique |
| Canonical / metadataBase | **Absent partout** | 🔴 Critique |
| JSON-LD / Schema.org | **Désactivé** (zéro structured data en prod) | 🔴 Critique |
| GEO (crawlers IA) | Aucun crawler IA géré, pas de llms.txt | 🟠 Important |
| FAQ structurées | Présentes en HTML, **0 schema FAQPage** | 🟠 Important |
| Images alt | 1 seule image sans alt | 🟢 Mineur |

---

## 🔴 CRITIQUE — bloquants d'indexation (à faire avant mise en ligne)

### C1 — Sitemap fantôme (`app/sitemap.ts`)
Le sitemap déclare des URL qui **n'existent pas** (héritage HubSpot) et **omet la
majorité des vraies pages**.

- **Déclare en 404** : `/services`, `/services/installation-voip`,
  `/services/maintenance-voip`, `/services/formation-voip`,
  `/services/support-technique`, `/devis`, `/ressources/guide-voip`,
  `/ressources/faq`, `/ressources/glossaire`, `/qui-sommes-nous/certifications`,
  `/qui-sommes-nous/partenaires`, `/conditions-utilisation`,
  `/blog/avantages-voip-entreprise` (+ autres slugs blog en dur)
- **Pages réelles ABSENTES du sitemap** : `/nos-services`, `/devis-en-ligne`,
  `/telephonie-3cx`, `/3cx-cloud`, `/telephonie-entreprise`,
  `/telephonie-entreprise/trunk-sip-compteur`, `…/trunk-sip-illimite`,
  `…/3cx-smb-mutualisee`, `…/pbx-yeastar`, `/assistance`, `/studio-attente`
- **Action** : régénérer le sitemap depuis les routes réelles (idéalement
  dynamiquement à partir de `app/`), avec les vrais slugs blog depuis HubSpot.

### C2 — robots.txt vestige (`public/robots.txt`)
Déclare des `Allow:` vers les mêmes chemins fantômes. Verbeux (150 lignes,
dizaines de bots) mais pointe vers des URL mortes.
- **Action** : réécrire un robots.txt propre — pages réelles, le bon sitemap,
  et la gestion des crawlers IA (voir I1). Envisager de le générer via
  `app/robots.ts` (Next natif) plutôt qu'un fichier statique.

### C3 — Metadata manquantes (4 pages stratégiques)
Pages **sans `export const metadata`** → elles héritent du titre/description
générique du layout (mauvais pour le référencement de chaque page) :
- 🔴 `/telephonie-entreprise/trunk-sip-agents-ia` (**page pivot de l'offre !**)
- 🔴 `/telephonie-entreprise` (hub catégorie)
- `/devis-en-ligne`
- `/studio-attente`
- **Action** : ajouter title + description + OG uniques et optimisés par page.

### C4 — Canonical & metadataBase absents
Aucune URL canonique définie nulle part, pas de `metadataBase` dans le layout.
→ risque de contenu dupliqué, OG/Twitter images en URL relatives cassées.
- **Action** : définir `metadataBase` (domaine prod) dans `app/layout.tsx` +
  `alternates.canonical` par page.

### C5 — JSON-LD / Schema.org désactivé
Le seul structured data (`Organization` dans `nos-services`) est **commenté**
(« temporairement désactivé pour corriger le pré-rendu »). En prod : **zéro
structured data** sur tout le site.
- **Action** : réactiver et généraliser. Au minimum :
  - `Organization` (ou `LocalBusiness`) global dans le layout
  - `Service` sur les pages produit
  - `FAQPage` sur les pages à FAQ (voir I2)
  - `BreadcrumbList` sur les pages profondes

---

## 🟠 IMPORTANT — SEO & GEO (à faire dans la foulée)

### I1 — Crawlers IA (GEO/AEO)
Aucune directive pour les bots IA dans robots.txt. Pour être **cité** par
ChatGPT/Perplexity/Google AI Overviews, il faut les **autoriser explicitement** :
- `GPTBot`, `OAI-SearchBot` (ChatGPT / OpenAI)
- `PerplexityBot` (Perplexity)
- `ClaudeBot`, `anthropic-ai` (Claude)
- `Google-Extended` (Google AI / Gemini)
- `CCBot` (Common Crawl — source d'entraînement)
- **Action** : ajouter les `User-agent: Allow` correspondants.

### I2 — FAQ → schema FAQPage
FAQ présentes en HTML sur ≥6 pages (assistance, trunk-sip-compteur,
trunk-sip-agents-ia, contact, devis…) mais **aucune en `FAQPage` JSON-LD**.
→ invisibles en rich results Google ET peu citables par les IA (qui adorent les
paires Q/R structurées).
- **Action** : générer le JSON-LD `FAQPage` à partir des FAQ existantes.

### I3 — llms.txt
Pas de `public/llms.txt` — fichier émergent qui aide les agents IA à comprendre
le site (résumé, pages clés, positionnement).
- **Action** : créer un `llms.txt` (positionnement E2I, offres, zones DOM,
  liens vers les pages clés).

### I4 — Citabilité GEO du contenu
Pour être cité par les IA, le contenu doit être **extractible en passages** :
réponses directes, phrases auto-portantes, entités claires (E2I VoIP, DOM,
Trunk SIP, 3CX, Yeastar), données chiffrées sourcées.
- **Action** : relire les intros de chaque page produit pour qu'elles répondent
  directement à « qu'est-ce que X / pour qui / combien » dès les 1ères lignes.

---

## 🟡 RELECTURE CONTENU — page par page

Pour chaque page : cohérence du message, exactitude des chiffres (rappel ligne
éditoriale : pas de nb de clients, 15 ans, 20% communications DROM, support mail
& téléphone), fautes, liens internes, CTA.

| Page | Points de vigilance connus |
|------|----------------------------|
| `/` (accueil) | Stats hero (4/15/Mail&Tél/20%), cohérence H1 |
| `/qui-sommes-nous` | ⚠️ Sur `main` une version a « 100+ clients » et « 30% » — **vérifier que c'est bien la version éditoriale corrigée qui est en prod** |
| `/telephonie-entreprise` | Hub catégorie — metadata à créer (C3) |
| `/telephonie-entreprise/trunk-sip-agents-ia` | Page pivot — metadata à créer (C3), c'est LA page à référencer |
| `/telephonie-entreprise/trunk-sip-compteur` | Tunnel de leads (tarifs cachés) — vérifier le form Tally |
| `/telephonie-entreprise/trunk-sip-illimite` | Hero centré (revu) |
| `/telephonie-entreprise/3cx-smb-mutualisee` | Prix « 15€/utilisateur » à confirmer |
| `/telephonie-entreprise/pbx-yeastar` | Vérifier `24/7` produit OK |
| `/3cx-cloud`, `/telephonie-3cx` | Doublon thématique ? vérifier la cannibalisation 3CX |
| `/nos-services` | JSON-LD à réactiver (C5), métadonnées « garanties » purgées ? |
| `/devis-en-ligne` | metadata à créer (C3) |
| `/assistance` | Cohérence horaires hotline (L-V 8h-18h) vs messages support |
| `/studio-attente` | metadata à créer (C3) |
| `/contact` | NAP (nom/adresse/tél) cohérent pour le SEO local |
| `/blog` + articles | Slugs réels (sitemap), source HubSpot |
| `/mentions-legales`, `/politique-confidentialite` | Présence légale OK |

> ⚠️ **Cannibalisation potentielle** : `/3cx-cloud`, `/telephonie-3cx`,
> `/telephonie-entreprise/3cx-smb-mutualisee` ciblent toutes « 3CX ». À vérifier
> qu'elles ne se concurrencent pas sur les mêmes requêtes.

---

## 🟢 MINEUR

- **M1** — 1 image sans `alt` (à localiser et corriger)
- **M2** — robots.txt très verbeux (150 lignes) : simplifier
- **M3** — Vérifier favicon, manifest PWA (existe), OG image par défaut

---

## SEO local (atout E2I — marché DOM)

E2I est un acteur **local DOM** (Guadeloupe, Martinique, Guyane, Réunion). C'est
un levier SEO fort, sous-exploité :
- **Schema `LocalBusiness`** avec `areaServed` (les 4 DOM) + numéros locaux
- **NAP cohérent** (nom, adresse, téléphone) sur contact + footer + schema
- Pages/sections géociblées par territoire (déjà des numéros par DOM)
- (Hors site) Google Business Profile — non vérifiable ici

---

## Ordre d'exécution recommandé

```
0. ✅ DOMAINE CONFIRMÉ : https://www.e2i-voip.com
1. C1 sitemap + C2 robots (refaire propre, domaine www.e2i-voip.com)
2. C3 metadata des 4 pages manquantes
3. C4 metadataBase + canonical (layout + pages)
4. C5 réactiver/généraliser JSON-LD (Organization + Service + FAQPage)
5. I1 crawlers IA + I3 llms.txt + I2 FAQPage
6. 🟡 relecture contenu page par page (tableau ci-dessus)
7. I4 citabilité GEO + 🟢 mineurs
8. Re-vérif finale : npm run validate + test des metadata rendues
```

---

## Ce que je peux exécuter (code) vs ce qui te revient

| Tâche | Côté code (moi) | Côté Alban |
|-------|:---:|:---:|
| Confirmer le domaine prod | — | ✅ |
| Refaire sitemap / robots | ✅ | — |
| Metadata, canonical, metadataBase | ✅ | — |
| Réactiver/écrire le JSON-LD | ✅ | — |
| Crawlers IA, llms.txt, FAQPage | ✅ | — |
| Relecture contenu (proposer corrections) | ✅ | ✅ valider |
| Vrais chiffres/textes métier si manquants | — | ✅ |
| Google Search Console / soumission sitemap | — | ✅ (post-mise en ligne) |
| Google Business Profile | — | ✅ |

---

## Références
- Audit réalisé : code source (statique), 2026-06-12
- Pages : 17 routes publiques (`app/**/page.tsx`)
- Ligne éditoriale : `docs/BrandBrief_e2ivoip.md`, `design.md`
- Charte : `docs/CHARTE_GRAPHIQUE.md`
