# Refonte design & éditoriale — Page 3CX SMB PRO

> **Page** : `/telephonie-entreprise/3cx-smb-mutualisee`
> **Date** : 2026-06-22
> **Objectif** : refondre la structure éditoriale et le design de la page 3CX SMB PRO
> pour décrire fidèlement l'offre (serveur mutualisé multi-société, 2 formules
> tarifaires, limitations 3CX), en respectant **strictement** la charte globale.

---

## Contexte

La page actuelle a été restaurée depuis git lors de la consolidation 3CX. Son contenu
est désormais **factuellement faux** : elle affiche un tarif unique « 29 € » alors que
l'offre comporte en réalité **deux formules tarifaires**, et elle ne décrit ni
l'isolation multi-société, ni les limitations du mutualisé.

## Contraintes de charte (RÈGLE ABSOLUE — cohérence avec les autres pages produit)

Le style doit être **identique** à celui des pages produit validées (Yeastar,
trunk-sip, hub 3CX). Aucune liberté visuelle hors charte.

- **Couleurs** : uniquement `text-red-primary`, `text-blue-marine`, `text-gray-dark`,
  `text-gray-600`. Aucune couleur hors charte.
- **Hero gradient officiel** : `bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85`.
- **Typo** : Inter (globale) + IBM Plex Mono pour les chiffres (prix), comme partout.
- **Composants partagés** : `CTAButton` / `CTAButtonMarine`, cards
  `rounded-xl border border-gray-200 shadow-sm hover:shadow-md`, titres
  `text-3xl md:text-4xl font-black tracking-[-0.04em]`, icônes via `@/lib/icons`.
- **Canonical** déjà en place → `/telephonie-3cx` (anti-cannibalisation, à conserver).
- **CTA Tally** : `https://tally.so/r/44Gprk` (inchangé, flow n8n notif commerciale).

---

## Faits métier (source de vérité — validés avec Alban)

### L'offre
- **3CX SMB PRO** = téléphonie 3CX hébergée sur **serveur mutualisé**.
- **De 3 à 10 utilisateurs** (3 minimum, 10 maximum).
- **Multi-société** : plusieurs sociétés partagent l'infrastructure, mais **chaque
  société est isolée des autres de manière sécurisée** (cloisonnement).

### Tarification — DEUX formules

**Formule « Au compteur »**
- `15 € / utilisateur / mois` (licence 3CX Pro mutualisée, par utilisateur).
- **+ un Trunk SIP au compteur au niveau de l'INSTANCE** (pas par utilisateur),
  dimensionné par **canaux d'appels simultanés**, paliers **2 · 4 · 8 · 16**
  (à partir de 2 appels simultanés).
- Appels (fixes **et** mobiles) **facturés au compteur** selon la grille tarifaire
  Trunk SIP E2I.

**Formule « Illimité » (recommandée)**
- `29 € / utilisateur / mois` — **tout inclus, AUCUN Trunk SIP à ajouter**.
- Appels **fixes France métropolitaine + DOM (Antilles-Guyane-Réunion) illimités** inclus.
- Appels **mobiles facturés au compteur**.

### Limitations du mutualisé (3CX) — à présenter en TRANSPARENCE
- ❌ **Choix de la musique d'attente non disponible** (limitation 3CX mutualisé).
- ⚠️ **5 numéros dédiés maximum** (pour groupes d'appel, SVI, messages
  d'ouverture / fermeture).

### Ce qui reste personnalisable (contrepoint positif)
- ✅ **Message d'accueil personnalisé** (pré-décroché).
- ✅ **SVI / serveur vocal interactif** personnalisé.
- ✅ Messages d'ouverture / fermeture.
- ✅ App mobile 3CX, téléphones SIP Fanvil / Yealink.

---

## Structure des sections (ordre vertical)

1. **Hero** — gradient charte. H1 « 3CX SMB PRO — la téléphonie 3CX mutualisée pour
   3 à 10 utilisateurs ». Sous-titre positionnement (mutualisé, multi-société, isolé).
   Badge « De 3 à 10 utilisateurs ». 2 CTA : Demander un devis (Tally) + téléphone.

2. **C'est quoi / Pour qui** — intro auto-portante (GEO). Phrase réponse extractible :
   « La solution 3CX SMB PRO est une téléphonie 3CX professionnelle hébergée sur serveur
   mutualisé, conçue pour les TPE et PME de 3 à 10 utilisateurs. » + 3 cards :
   Mutualisé · De 3 à 10 utilisateurs · Multi-société isolé.

3. **Serveur mutualisé & isolation sécurisée** — layout 2 colonnes (texte + cards
   visuelles). Expliquer le partage d'infrastructure ET le cloisonnement sécurisé de
   chaque société. Icônes `Shield` / `Users`.

4. **Les 2 formules tarifaires** (cœur de page) — 2 cards côte à côte :
   - « Au compteur » : 15 €/util/mois + Trunk SIP au compteur.
   - « Illimité » (recommandée, `ring-2 ring-red-primary` + badge) : 29 €/util/mois,
     tout inclus.
   - Prix en IBM Plex Mono, `text-red-primary`.
   - **Encadré explicatif dédié au Trunk SIP par instance** sous les 2 cards :
     « Le Trunk SIP se dimensionne au niveau de l'instance (pas par utilisateur),
     selon le nombre d'appels simultanés. Paliers : 2 · 4 · 8 · 16 canaux. »

5. **Limitations transparentes** (« Bon à savoir ») — fond `bg-base-200`, ton honnête,
   icônes neutres (pas de rouge alarmiste). Musique d'attente non choisie · 5 numéros
   dédiés max. Phrase de bascule + lien vers `/3cx-cloud` (3CX PRO lève ces limites).

6. **Ce qui reste personnalisable** — cards positives : message d'accueil, SVI,
   messages ouverture/fermeture, app mobile, SIP Fanvil/Yealink.

7. **FAQ** — 4-5 Q/R (GEO + cohérence FAQPage) : nombre d'utilisateurs ; différence
   entre les 2 formules ; serveur mutualisé multi-société ; personnalisation accueil ;
   quand faut-il un Trunk SIP.

8. **CTA final** — gradient `from-red-primary to-blue-marine`. CTA Tally `44Gprk`.
   Mention honnête : « Support par mail et téléphone · De 3 à 10 utilisateurs ».

---

## Hors scope
- Pas de modification du flow Tally / n8n (URL inchangée).
- Pas de modification du hub `/telephonie-3cx` (déjà traité).
- Pas de schema JSON-LD nouveau dans cette itération (à voir après si besoin).

## Critères de validation
- `npm run validate` vert (lint + types + tests + build).
- Aucune couleur hors charte (vérif visuelle + grep).
- Les 2 formules tarifaires sont exactes (15 € + Trunk SIP / 29 € tout inclus).
- Les limitations sont présentes et honnêtes.
- Rendu cohérent avec les autres pages produit.
