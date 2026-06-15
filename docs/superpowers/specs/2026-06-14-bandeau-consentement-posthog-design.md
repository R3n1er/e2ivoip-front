# Bandeau de consentement cookies + PostHog progressif

> Spec — 2026-06-14
> Site E2I VoIP (Next.js 15, App Router). Active PostHog dès l'arrivée du visiteur
> en mode **cookieless** (conforme RGPD/ePrivacy sans consentement préalable), puis
> élève en mode **cookies persistants** après acceptation explicite via un bandeau.

## Objectif

Mesurer le trafic du site tout en respectant le RGPD / ePrivacy (recommandations CNIL) :

- **Avant tout choix** : PostHog tourne en mode mémoire (anonyme, aucun cookie). Le
  trafic agrégé est mesurable légalement sans consentement.
- **Après « Accepter »** : PostHog passe en mode complet (cookies, profil persistant
  cross-session).
- **Après « Refuser »** : PostHog reste en mode cookieless (on garde des stats
  anonymes agrégées — décision validée par Alban).

## Machine à états

| État | localStorage `e2i-cookie-consent` | Cookies | PostHog | Bandeau |
|---|---|---|---|---|
| Avant choix (1ère visite) | *(absent)* | ❌ | cookieless (`persistence: 'memory'`) | 👁️ affiché |
| Accepté | `accepted` | ✅ | complet (`persistence: 'localStorage+cookie'`) | masqué |
| Refusé | `declined` | ❌ | cookieless (inchangé) | masqué |

Règle d'affichage du bandeau : visible **si et seulement si** la clé `localStorage`
est absente.

## Principe technique clé

PostHog est **toujours** initialisé une seule fois, en cookieless. On ne ré-initialise
jamais (`init()` une seule fois — un second appel casserait la session). Le passage en
mode cookies se fait à chaud via `posthog.set_config({ persistence: 'localStorage+cookie' })`,
conformément à la doc officielle PostHog (« Dynamically Change Persistence Configuration »).

## Architecture — 3 unités isolées

### 1. `instrumentation-client.ts` (modifié)

Init PostHog en cookieless par défaut. Au boot, si le consentement a déjà été donné
lors d'une visite précédente (`localStorage === 'accepted'`), bascule immédiate en mode
cookies pour ne pas dégrader l'expérience d'un visiteur déjà consentant.

```ts
import posthog from 'posthog-js'
import { hasAcceptedCookies } from '@/lib/analytics/consent'

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com'

if (token) {
  posthog.init(token, {
    api_host: host,
    capture_pageview: 'history_change',
    capture_pageleave: 'if_capture_pageview',
    autocapture: true,
    // Cookieless par défaut : aucun cookie tant que pas de consentement.
    persistence: 'memory',
    defaults: '2025-05-24',
    loaded: (ph) => {
      // Visiteur déjà consentant lors d'une visite précédente → mode cookies direct.
      if (hasAcceptedCookies()) {
        ph.set_config({ persistence: 'localStorage+cookie' })
      }
    },
  })
}
```

### 2. `lib/analytics/consent.ts` (nouveau)

Source unique de la logique de consentement. Aucune dépendance React → testable
isolément, réutilisable depuis `instrumentation-client.ts` et le composant bandeau.

API :

- `type ConsentChoice = 'accepted' | 'declined'`
- `const CONSENT_KEY = 'e2i-cookie-consent'`
- `getConsent(): ConsentChoice | null` — lit `localStorage` (null si absent ou SSR).
- `hasAcceptedCookies(): boolean` — `getConsent() === 'accepted'`.
- `acceptCookies(): void` — écrit `'accepted'`, puis `posthog.set_config({ persistence: 'localStorage+cookie' })`.
- `declineCookies(): void` — écrit `'declined'` (PostHog reste en `'memory'`, rien à changer).

Garde SSR : toutes les fonctions vérifient `typeof window !== 'undefined'`.
Import de `posthog-js` en lazy (comme `track-event.ts`) pour ne pas alourdir le bundle.

### 3. `components/cookie-consent-banner.tsx` (nouveau)

Bandeau client, branché dans `LayoutClientChrome` (à côté de `ChatPreOverlay`, donc
présent sur toutes les pages). Pattern client interactif identique aux overlays existants.

- État local `visible` initialisé à `false`, passé à `true` dans un `useEffect` **si
  `getConsent() === null`** (évite le flash SSR — le composant ne rend rien tant que le
  client n'a pas vérifié localStorage).
- 2 boutons : « Accepter » (→ `acceptCookies()` + masquer), « Refuser » (→
  `declineCookies()` + masquer).
- Lien « En savoir plus » vers `/politique-confidentialite` (page existante, vérifiée).
- Position : barre fixe en bas (`fixed bottom-0`), z-index au-dessus du contenu, sous
  les overlays de chat si conflit.

#### Charte graphique (règle absolue — `docs/CHARTE_GRAPHIQUE.md`)

- Fond bandeau : bleu marine `#2D3848` (texte blanc).
- Bouton « Accepter » : rouge principal `#E53E3E` (action primaire).
- Bouton « Refuser » : style secondaire (bordure / fond transparent, texte blanc).
- Aucune couleur hors charte.

## Flux de données

```
1ère visite
  └─ instrumentation-client.ts → posthog.init(persistence:'memory')  [cookieless, anonyme]
  └─ CookieConsentBanner → useEffect → getConsent()===null → visible=true
       ├─ clic « Accepter » → acceptCookies() → localStorage='accepted'
       │     → posthog.set_config(persistence:'localStorage+cookie')  [cookies ON]
       └─ clic « Refuser »  → declineCookies() → localStorage='declined'  [reste cookieless]

Visite suivante (choix déjà fait)
  └─ instrumentation-client.ts → init(memory) → loaded() → si 'accepted' → set_config(cookie)
  └─ CookieConsentBanner → getConsent()!==null → visible reste false  [pas de bandeau]
```

## Tests (TDD — RED → GREEN → REFACTOR, règle projet)

### Unitaires (Jest)

`tests/consent.test.ts` (convention projet : tests unitaires dans `tests/`) :
- `getConsent()` retourne null si localStorage vide, la valeur sinon.
- `getConsent()` retourne null en contexte SSR (window indéfini).
- `acceptCookies()` écrit `'accepted'` ET appelle `set_config({ persistence: 'localStorage+cookie' })` (posthog mocké).
- `declineCookies()` écrit `'declined'` et n'appelle PAS set_config.

`tests/cookie-consent-banner.test.tsx` :
- Bandeau **non rendu** si `getConsent()` retourne une valeur (choix déjà fait).
- Bandeau **rendu** si `getConsent()` retourne null.
- Clic « Accepter » → appelle `acceptCookies()` + bandeau disparaît.
- Clic « Refuser » → appelle `declineCookies()` + bandeau disparaît.
- Lien pointe vers `/politique-confidentialite`.

### E2E (Playwright)

`tests/e2e/cookie-consent.spec.ts` :
- 1ère visite (localStorage vierge) : bandeau visible.
- Clic « Accepter » : bandeau disparaît, `localStorage['e2i-cookie-consent'] === 'accepted'`.
- Reload : bandeau ne réapparaît pas.
- (Variante) Clic « Refuser » : bandeau disparaît, valeur `'declined'`, pas de réapparition.

## Hors périmètre (YAGNI)

- Pas de 3e bouton « Personnaliser » / gestion granulaire par catégorie de cookies
  (PostHog est le seul tracker → binaire accepter/refuser suffit).
- Pas de bandeau de re-consentement périodique (expiration) — non demandé.
- Pas de gestion serveur du consentement — 100% client, suffisant pour ce besoin.

## Validation pré-push

`npm run validate` (lint + type-check + tests unitaires + e2e + audit + build) doit
rester 100% vert avant tout push (règle projet #4).

## Lien second cerveau

Mettre à jour la fiche `10-wiki/outils/posthog-e2i-voip-site.md` (SIKS-BRAIN) après
implémentation : retirer le point de vigilance « cookieless non appliqué » et documenter
le bandeau de consentement + la stratégie progressive.
