# Bandeau consentement cookies + PostHog progressif — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Activer PostHog dès l'arrivée du visiteur en mode cookieless (conforme RGPD sans consentement), puis élever en mode cookies persistants après acceptation via un bandeau de consentement.

**Architecture:** PostHog est initialisé une seule fois en `persistence: 'memory'`. Le passage en mode cookies se fait à chaud via `posthog.set_config()` (pas de ré-init). Un module `consent.ts` centralise la logique (testable, sans React) ; un composant `CookieConsentBanner` branché dans `LayoutClientChrome` gère l'UI ; le choix est mémorisé dans `localStorage`.

**Tech Stack:** Next.js 15 (App Router), `posthog-js` 1.372, React, Jest + Testing Library, Playwright, Tailwind (couleurs charte `#2D3848` / `#E53E3E`).

---

## File Structure

| Fichier | Rôle |
|---|---|
| `lib/analytics/consent.ts` (créer) | Logique de consentement : lecture/écriture localStorage + bascule persistance PostHog. Sans React. |
| `instrumentation-client.ts` (modifier) | Init PostHog cookieless + bascule cookies au boot si déjà consentant. |
| `components/cookie-consent-banner.tsx` (créer) | Bandeau UI client, 2 boutons, charte. |
| `components/layout/layout-client-chrome.tsx` (modifier) | Branche le bandeau (présent sur toutes les pages). |
| `tests/consent.test.ts` (créer) | Tests unitaires du module consent. |
| `tests/cookie-consent-banner.test.tsx` (créer) | Tests unitaires du bandeau. |
| `tests/e2e/cookie-consent.spec.ts` (créer) | Test e2e du parcours complet. |

---

## Task 1 : Module `consent.ts` — lecture du consentement

**Files:**
- Create: `lib/analytics/consent.ts`
- Test: `tests/consent.test.ts`

- [ ] **Step 1 : Écrire le test qui échoue (getConsent)**

```ts
// tests/consent.test.ts
import { getConsent, hasAcceptedCookies, CONSENT_KEY } from '@/lib/analytics/consent'

describe('getConsent', () => {
  beforeEach(() => localStorage.clear())

  it('retourne null si aucun choix mémorisé', () => {
    expect(getConsent()).toBeNull()
  })

  it('retourne la valeur mémorisée', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    expect(getConsent()).toBe('accepted')
  })

  it('hasAcceptedCookies est vrai seulement si accepted', () => {
    expect(hasAcceptedCookies()).toBe(false)
    localStorage.setItem(CONSENT_KEY, 'declined')
    expect(hasAcceptedCookies()).toBe(false)
    localStorage.setItem(CONSENT_KEY, 'accepted')
    expect(hasAcceptedCookies()).toBe(true)
  })
})
```

- [ ] **Step 2 : Lancer le test, vérifier l'échec**

Run: `npx jest tests/consent.test.ts -t getConsent`
Expected: FAIL — `Cannot find module '@/lib/analytics/consent'`

- [ ] **Step 3 : Implémenter la lecture**

```ts
// lib/analytics/consent.ts
export type ConsentChoice = 'accepted' | 'declined'
export const CONSENT_KEY = 'e2i-cookie-consent'

export function getConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(CONSENT_KEY)
  return value === 'accepted' || value === 'declined' ? value : null
}

export function hasAcceptedCookies(): boolean {
  return getConsent() === 'accepted'
}
```

- [ ] **Step 4 : Lancer le test, vérifier le succès**

Run: `npx jest tests/consent.test.ts -t getConsent`
Expected: PASS (3 tests)

- [ ] **Step 5 : Commit**

```bash
git add lib/analytics/consent.ts tests/consent.test.ts
git commit -m "feat(consent): lecture du choix de consentement cookies (localStorage)"
```

---

## Task 2 : Module `consent.ts` — écriture + bascule PostHog

**Files:**
- Modify: `lib/analytics/consent.ts`
- Test: `tests/consent.test.ts`

- [ ] **Step 1 : Écrire le test qui échoue (accept/decline)**

Ajouter à `tests/consent.test.ts` :

```ts
import { acceptCookies, declineCookies } from '@/lib/analytics/consent'

const setConfigMock = jest.fn()
jest.mock('posthog-js', () => ({
  __esModule: true,
  default: { set_config: (...args: unknown[]) => setConfigMock(...args) },
}))

describe('acceptCookies / declineCookies', () => {
  beforeEach(() => {
    localStorage.clear()
    setConfigMock.mockClear()
  })

  it('acceptCookies mémorise accepted et active les cookies PostHog', async () => {
    await acceptCookies()
    expect(localStorage.getItem(CONSENT_KEY)).toBe('accepted')
    expect(setConfigMock).toHaveBeenCalledWith({ persistence: 'localStorage+cookie' })
  })

  it('declineCookies mémorise declined sans toucher la persistance', async () => {
    await declineCookies()
    expect(localStorage.getItem(CONSENT_KEY)).toBe('declined')
    expect(setConfigMock).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2 : Lancer le test, vérifier l'échec**

Run: `npx jest tests/consent.test.ts -t "acceptCookies"`
Expected: FAIL — `acceptCookies is not a function`

- [ ] **Step 3 : Implémenter l'écriture + bascule (import lazy posthog)**

Ajouter à `lib/analytics/consent.ts` :

```ts
export async function acceptCookies(): Promise<void> {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_KEY, 'accepted')
  const { default: posthog } = await import('posthog-js')
  posthog.set_config({ persistence: 'localStorage+cookie' })
}

export function declineCookies(): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_KEY, 'declined')
  // PostHog reste en persistence:'memory' (cookieless) — rien à changer.
}
```

- [ ] **Step 4 : Lancer le test, vérifier le succès**

Run: `npx jest tests/consent.test.ts`
Expected: PASS (tous)

- [ ] **Step 5 : Commit**

```bash
git add lib/analytics/consent.ts tests/consent.test.ts
git commit -m "feat(consent): accept/decline + bascule persistance PostHog"
```

---

## Task 3 : Init PostHog cookieless dans `instrumentation-client.ts`

**Files:**
- Modify: `instrumentation-client.ts`

Pas de test unitaire dédié (fichier d'amorçage Next.js exécuté au runtime ; couvert par l'e2e Task 6). Vérification par build + e2e.

- [ ] **Step 1 : Modifier l'init pour cookieless + bascule au boot**

Remplacer le bloc `posthog.init(...)` de `instrumentation-client.ts` par :

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
    // Cookieless par défaut : aucun cookie tant que pas de consentement (RGPD).
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

- [ ] **Step 2 : Vérifier le type-check**

Run: `npm run type-check`
Expected: PASS (No errors found)

- [ ] **Step 3 : Commit**

```bash
git add instrumentation-client.ts
git commit -m "feat(analytics): PostHog cookieless par défaut, cookies au consentement"
```

---

## Task 4 : Composant `CookieConsentBanner` — affichage conditionnel

**Files:**
- Create: `components/cookie-consent-banner.tsx`
- Test: `tests/cookie-consent-banner.test.tsx`

- [ ] **Step 1 : Écrire le test qui échoue (visibilité)**

```tsx
// tests/cookie-consent-banner.test.tsx
import { render, screen } from '@testing-library/react'
import { CookieConsentBanner } from '@/components/cookie-consent-banner'
import * as consent from '@/lib/analytics/consent'

jest.mock('@/lib/analytics/consent')

describe('CookieConsentBanner — visibilité', () => {
  it('ne rend rien si un choix a déjà été fait', () => {
    jest.spyOn(consent, 'getConsent').mockReturnValue('accepted')
    const { container } = render(<CookieConsentBanner />)
    expect(container).toBeEmptyDOMElement()
  })

  it('affiche le bandeau si aucun choix mémorisé', () => {
    jest.spyOn(consent, 'getConsent').mockReturnValue(null)
    render(<CookieConsentBanner />)
    expect(screen.getByRole('button', { name: /accepter/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /refuser/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2 : Lancer le test, vérifier l'échec**

Run: `npx jest tests/cookie-consent-banner.test.tsx -t visibilité`
Expected: FAIL — module introuvable

- [ ] **Step 3 : Implémenter le composant (affichage conditionnel + charte)**

```tsx
// components/cookie-consent-banner.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getConsent, acceptCookies, declineCookies } from "@/lib/analytics/consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Côté client uniquement : on n'affiche que si aucun choix n'a été fait.
    if (getConsent() === null) setVisible(true);
  }, []);

  const handleAccept = useCallback(async () => {
    await acceptCookies();
    setVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    declineCookies();
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#2D3848] text-white px-4 py-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed">
          Nous utilisons des cookies pour mesurer l&apos;audience du site et
          améliorer votre expérience.{" "}
          <Link href="/politique-confidentialite" className="underline">
            En savoir plus
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={handleDecline}
            className="rounded border border-white/60 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded bg-[#E53E3E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c53030]"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4 : Lancer le test, vérifier le succès**

Run: `npx jest tests/cookie-consent-banner.test.tsx -t visibilité`
Expected: PASS (2 tests)

- [ ] **Step 5 : Commit**

```bash
git add components/cookie-consent-banner.tsx tests/cookie-consent-banner.test.tsx
git commit -m "feat(consent): bandeau de consentement cookies (affichage conditionnel)"
```

---

## Task 5 : Composant `CookieConsentBanner` — actions des boutons

**Files:**
- Modify: `tests/cookie-consent-banner.test.tsx`

Le composant est déjà câblé (Task 4) ; cette tâche verrouille le comportement des clics par des tests.

- [ ] **Step 1 : Écrire le test qui échoue (clics)**

Ajouter à `tests/cookie-consent-banner.test.tsx` :

```tsx
import { fireEvent, waitFor } from '@testing-library/react'

describe('CookieConsentBanner — actions', () => {
  beforeEach(() => {
    jest.spyOn(consent, 'getConsent').mockReturnValue(null)
    jest.spyOn(consent, 'acceptCookies').mockResolvedValue(undefined)
    jest.spyOn(consent, 'declineCookies').mockReturnValue(undefined)
  })

  it('clic Accepter appelle acceptCookies puis masque le bandeau', async () => {
    render(<CookieConsentBanner />)
    fireEvent.click(screen.getByRole('button', { name: /accepter/i }))
    expect(consent.acceptCookies).toHaveBeenCalledTimes(1)
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /accepter/i })).not.toBeInTheDocument()
    )
  })

  it('clic Refuser appelle declineCookies puis masque le bandeau', async () => {
    render(<CookieConsentBanner />)
    fireEvent.click(screen.getByRole('button', { name: /refuser/i }))
    expect(consent.declineCookies).toHaveBeenCalledTimes(1)
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /refuser/i })).not.toBeInTheDocument()
    )
  })
})
```

- [ ] **Step 2 : Lancer le test, vérifier le succès (le composant existe déjà)**

Run: `npx jest tests/cookie-consent-banner.test.tsx`
Expected: PASS (tous — visibilité + actions)

> Si un test échoue, corriger le composant Task 4 (handlers/`useCallback`) jusqu'au vert.

- [ ] **Step 3 : Commit**

```bash
git add tests/cookie-consent-banner.test.tsx
git commit -m "test(consent): verrouille les actions accepter/refuser du bandeau"
```

---

## Task 6 : Brancher le bandeau dans le layout

**Files:**
- Modify: `components/layout/layout-client-chrome.tsx`

- [ ] **Step 1 : Importer et insérer le bandeau**

Dans `components/layout/layout-client-chrome.tsx`, ajouter l'import en tête (après les imports existants) :

```tsx
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
```

Puis insérer `<CookieConsentBanner />` juste après `<ChatPreOverlay />` :

```tsx
      <main className="flex-1 pt-16">{children}</main>
      <ChatPreOverlay />
      <CookieConsentBanner />
    </IconContext.Provider>
```

- [ ] **Step 2 : Vérifier le type-check**

Run: `npm run type-check`
Expected: PASS

- [ ] **Step 3 : Commit**

```bash
git add components/layout/layout-client-chrome.tsx
git commit -m "feat(consent): afficher le bandeau cookies sur toutes les pages"
```

---

## Task 7 : Test e2e du parcours complet

**Files:**
- Create: `tests/e2e/cookie-consent.spec.ts`

- [ ] **Step 1 : Écrire le test e2e**

```ts
// tests/e2e/cookie-consent.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Bandeau de consentement cookies', () => {
  test('1ère visite : bandeau visible, Accepter le masque et persiste', async ({ page }) => {
    await page.goto('/')
    const accept = page.getByRole('button', { name: /accepter/i })
    await expect(accept).toBeVisible()

    await accept.click()
    await expect(accept).toBeHidden()

    const choice = await page.evaluate(() => localStorage.getItem('e2i-cookie-consent'))
    expect(choice).toBe('accepted')

    // Reload : le bandeau ne réapparaît pas
    await page.reload()
    await expect(page.getByRole('button', { name: /accepter/i })).toBeHidden()
  })

  test('Refuser masque le bandeau et persiste declined', async ({ page }) => {
    await page.goto('/')
    const decline = page.getByRole('button', { name: /refuser/i })
    await expect(decline).toBeVisible()

    await decline.click()
    await expect(decline).toBeHidden()

    const choice = await page.evaluate(() => localStorage.getItem('e2i-cookie-consent'))
    expect(choice).toBe('declined')

    await page.reload()
    await expect(page.getByRole('button', { name: /refuser/i })).toBeHidden()
  })
})
```

- [ ] **Step 2 : Lancer le test e2e**

Run: `npx playwright test tests/e2e/cookie-consent.spec.ts`
Expected: PASS (2 tests). Le serveur dev/preview est démarré par la config Playwright (`webServer`).

- [ ] **Step 3 : Commit**

```bash
git add tests/e2e/cookie-consent.spec.ts
git commit -m "test(e2e): parcours consentement cookies (accepter/refuser/reload)"
```

---

## Task 8 : Validation complète + mise à jour second cerveau

**Files:**
- Modify (hors repo) : `~/Documents/SIKS-BRAIN/10-wiki/outils/posthog-e2i-voip-site.md`

- [ ] **Step 1 : Lancer la validation complète (règle projet #4)**

Run: `npm run validate`
Expected: 6/6 vert (lint, type-check, tests unitaires, e2e, audit, build).

> Si échec : corriger avant de continuer. Ne jamais push sur un validate rouge.

- [ ] **Step 2 : Mettre à jour la fiche SIKS-BRAIN**

Dans `~/Documents/SIKS-BRAIN/10-wiki/outils/posthog-e2i-voip-site.md` :
- Retirer/clore le « ⚠️ Point de vigilance RGPD — cookieless non appliqué ».
- Documenter : init cookieless `persistence: 'memory'`, bascule `set_config` au consentement, bandeau, choix mémorisé `localStorage` clé `e2i-cookie-consent`, comportement « Refuser » = reste cookieless.
- Mettre à jour `date-maj`.
- Ajouter une entrée dans `~/Documents/SIKS-BRAIN/90-meta/log.md` (append-only, format `- YYYY-MM-DDTHH:MM claude-opus <op> <détails>`).

- [ ] **Step 3 : Commit final (repo site)**

```bash
git add -A
git commit -m "docs: bandeau consentement cookies opérationnel (validate vert)"
```

---

## Self-Review (rempli)

**Couverture spec :**
- Machine 3 états → Tasks 1-2 (logique), 3 (init), 4-5 (UI), 7 (e2e). ✅
- Init une seule fois + `set_config` → Task 3 + Task 2. ✅
- Charte `#2D3848`/`#E53E3E` → Task 4. ✅
- Mémorisation localStorage `e2i-cookie-consent` → Task 1 (clé), Task 2 (écriture). ✅
- Lien `/politique-confidentialite` → Task 4. ✅
- Tests unitaires dans `tests/` + e2e dans `tests/e2e/` → respecté. ✅
- Mise à jour fiche second cerveau → Task 8. ✅

**Placeholders :** aucun — tout le code est fourni.

**Cohérence des types :** `ConsentChoice`, `CONSENT_KEY`, `getConsent`, `hasAcceptedCookies`, `acceptCookies`, `declineCookies` — noms identiques entre définition (Tasks 1-2), usage init (Task 3) et composant (Task 4). `persistence: 'localStorage+cookie'` cohérent partout. ✅
