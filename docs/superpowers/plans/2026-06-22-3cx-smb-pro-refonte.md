# Refonte page 3CX SMB PRO — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Réécrire entièrement le contenu et la structure de la page `/telephonie-entreprise/3cx-smb-mutualisee` pour décrire fidèlement l'offre (mutualisé multi-société, 2 formules tarifaires, limitations 3CX), en charte stricte.

**Architecture:** Un seul fichier `app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx` réécrit section par section. Contenu marketing statique → pas de tests unitaires de contenu (fragiles, sans valeur) ; garde-fous = rendu HTTP 200, grep anti-couleur-hors-charte, et `npm run validate` final.

**Tech Stack:** Next.js App Router (Server Component), Tailwind + charte E2I, composants partagés `CTAButton`/`CTAButtonMarine`, icônes `@/lib/icons`.

**Spec de référence:** `docs/superpowers/specs/2026-06-22-3cx-smb-pro-refonte-design.md`

---

## Notes transverses (à respecter dans TOUTES les tâches)

- **Couleurs autorisées uniquement** : `text-red-primary`, `bg-red-primary`, `text-blue-marine`, `text-gray-dark`, `text-gray-600`, `bg-base-200`, `border-gray-200`, blancs. **Interdit** : toute couleur Tailwind brute hors charte (`text-green-*`, `text-yellow-*`, `bg-purple-*`, etc.). Exception tolérée déjà présente dans le projet : `bg-blue-50`, `text-blue-marine` (charte), gradients hero officiels.
- **Hero gradient** : `bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-red-600/85`.
- **Prix** : balise avec `font-mono` (IBM Plex Mono) + `text-red-primary`.
- **CTA Tally** : constante `TALLY_3CX_SMB_URL = "https://tally.so/r/44Gprk"` (déjà dans le fichier).
- **Canonical** : `alternates: { canonical: "https://www.e2i-voip.com/telephonie-3cx" }` — **conserver tel quel**.
- Le serveur `npm run dev` tourne déjà sur http://localhost:3000.

---

### Task 1 : Hero + metadata (refonte intro)

**Files:**
- Modify: `app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx` (imports, metadata description, bloc hero lignes ~30-76)

- [ ] **Step 1 : Mettre à jour les imports d'icônes**

Remplacer la ligne d'import icônes existante par :

```tsx
import { Calculator, Phone, Rocket, Users, Timer, TrendUp, CheckCircle, DeviceMobile, Desktop, Globe, Shield, Info, MusicNote, Network, CaretRight } from '@/lib/icons';
```

- [ ] **Step 2 : Affiner la description metadata (factuelle, 2 formules)**

Dans `export const metadata`, remplacer `description` par :

```tsx
  description:
    "Téléphonie 3CX mutualisée pour TPE/PME de 3 à 10 utilisateurs. Serveur multi-société isolé. Deux formules : 15 €/utilisateur/mois au compteur ou 29 €/utilisateur/mois appels fixes France & DOM illimités.",
```

- [ ] **Step 3 : Réécrire le contenu du hero**

Remplacer le H1 + les 2 `<p>` du hero (le bloc `<h1>…</h1>` jusqu'à la fin du 2e `<p>` avant le CTA) par :

```tsx
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                3CX SMB PRO <span className="text-white">Mutualisé</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                La téléphonie <strong>3CX professionnelle</strong> pour les TPE et PME,
                sur serveur mutualisé multi-société.
              </p>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                De <strong>3 à 10 utilisateurs</strong> • chaque société isolée et sécurisée
              </p>
```

- [ ] **Step 4 : Vérifier le rendu**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/telephonie-entreprise/3cx-smb-mutualisee`
Expected: `200`

- [ ] **Step 5 : Commit**

```bash
git add app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx
git commit -m "content(3cx-smb): hero + metadata refonte (mutualisé multi-société)"
```

---

### Task 2 : Section « C'est quoi / Pour qui » (intro GEO + 3 cards)

**Files:**
- Modify: `app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx` (section principale, remplace l'actuelle « La solution 3CX économique » + ses 3 cards)

- [ ] **Step 1 : Remplacer le titre + intro de la section principale**

Remplacer le bloc `<div className="text-center mb-12">…</div>` (titre « La solution 3CX économique » + paragraphe) par :

```tsx
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
                Une téléphonie <span className="text-red-primary">3CX mutualisée</span> pour les petites équipes
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                La solution <strong>3CX SMB PRO</strong> est une téléphonie 3CX professionnelle
                hébergée sur <strong>serveur mutualisé</strong>, conçue pour les TPE et PME de
                <strong> 3 à 10 utilisateurs</strong>. Vous bénéficiez de toutes les fonctionnalités
                3CX sans le coût d'une infrastructure dédiée.
              </p>
            </div>
```

- [ ] **Step 2 : Remplacer les 3 cards d'avantages**

Remplacer le contenu des 3 cards existantes (`Économique` / `Activation rapide` / `Évolutif`) par :

```tsx
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col p-8">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Calculator size={32} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-dark justify-center">Mutualisé</h3>
                  <p className="text-gray-600 text-center">
                    Coûts optimisés : l'infrastructure 3CX est partagée, sans serveur dédié à financer.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Users size={32} className="text-gray-800" aria-hidden="true" />
                  </div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-dark justify-center">De 3 à 10 utilisateurs</h3>
                  <p className="text-gray-600 text-center">
                    Dimensionnée pour les petites équipes : 3 utilisateurs minimum, 10 maximum.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col p-8">
                  <div className="w-16 h-16 bg-red-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Shield size={32} className="text-red-primary" aria-hidden="true" />
                  </div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-dark justify-center">Multi-société isolé</h3>
                  <p className="text-gray-600 text-center">
                    Plusieurs sociétés sur la même infrastructure, chacune cloisonnée et sécurisée.
                  </p>
                </div>
              </div>
```

- [ ] **Step 3 : Supprimer l'ancien bloc « Toutes les fonctionnalités 3CX incluses »**

Supprimer le bloc `<div className="mt-16 bg-base-200 rounded-2xl p-8">…</div>` (liste 6 fonctionnalités) — son contenu est remplacé par les sections dédiées plus bas.

- [ ] **Step 4 : Vérifier le rendu**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/telephonie-entreprise/3cx-smb-mutualisee`
Expected: `200`

- [ ] **Step 5 : Commit**

```bash
git add app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx
git commit -m "content(3cx-smb): section c'est quoi / pour qui (intro GEO + 3 cards)"
```

---

### Task 3 : Section « Serveur mutualisé & isolation sécurisée »

**Files:**
- Modify: `app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx` (nouvelle `<section>` après la section principale)

- [ ] **Step 1 : Insérer la nouvelle section**

Après la fermeture de la section principale (`</section>` qui suit les 3 cards), insérer :

```tsx
        {/* Serveur mutualisé & isolation sécurisée */}
        <section className="py-16 bg-base-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-6">
                  Un serveur <span className="text-red-primary">mutualisé</span>, chaque société isolée
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  L'offre 3CX SMB PRO repose sur une infrastructure <strong>mutualisée</strong> :
                  plusieurs sociétés partagent le même serveur, ce qui permet de réduire les coûts.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Chaque société reste <strong>cloisonnée et isolée des autres</strong> de manière
                  sécurisée. Vos communications, vos utilisateurs et votre configuration restent
                  strictement privés.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <Shield size={28} className="text-red-primary flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-gray-dark mb-1">Cloisonnement sécurisé</h3>
                    <p className="text-gray-600 text-sm">
                      Chaque société est isolée : aucune visibilité entre les comptes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <Users size={28} className="text-blue-marine flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-gray-dark mb-1">Multi-société</h3>
                    <p className="text-gray-600 text-sm">
                      Une infrastructure partagée, des coûts optimisés pour les petites équipes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
```

- [ ] **Step 2 : Vérifier le rendu**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/telephonie-entreprise/3cx-smb-mutualisee`
Expected: `200`

- [ ] **Step 3 : Commit**

```bash
git add app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx
git commit -m "content(3cx-smb): section serveur mutualisé & isolation sécurisée"
```

---

### Task 4 : Section « Les 2 formules tarifaires » (cœur de page)

**Files:**
- Modify: `app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx` (remplace entièrement la section « Tarification 3CX par utilisateur » actuelle)

- [ ] **Step 1 : Remplacer la section tarification par les 2 formules + encadré Trunk SIP**

Remplacer toute la `<section>` « Tarification 3CX par utilisateur » (du commentaire `{/* Tarification 3CX par utilisateur */}` jusqu'à son `</section>`) par :

```tsx
        {/* Les 2 formules tarifaires */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Deux formules <span className="text-red-primary">tarifaires</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choisissez le modèle qui correspond à votre usage : à la consommation ou tout inclus.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Formule Au compteur */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col">
                <div className="bg-gray-dark px-8 py-6 text-white">
                  <h3 className="text-xl font-bold">Au compteur</h3>
                  <p className="text-white/80 text-sm mt-1">Appels facturés à la consommation</p>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="mb-6">
                    <span className="font-mono text-4xl font-black text-red-primary">15 €</span>
                    <span className="text-sm font-medium text-gray-600"> / utilisateur / mois</span>
                    <span className="block text-sm text-gray-500 mt-1">+ Trunk SIP au compteur (voir ci-dessous)</span>
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-red-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700 text-sm">Licence 3CX Pro mutualisée par utilisateur</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-red-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700 text-sm">Appels fixes et mobiles facturés au compteur, selon notre grille Trunk SIP</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Network size={20} className="text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700 text-sm">Trunk SIP à dimensionner selon vos appels simultanés</span>
                    </li>
                  </ul>
                  <CTAButtonMarine href={TALLY_3CX_SMB_URL} external className="block">
                    Demander un devis
                  </CTAButtonMarine>
                </div>
              </div>

              {/* Formule Illimité (recommandée) */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col ring-2 ring-red-primary relative">
                <div className="absolute top-0 right-0 bg-red-primary text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                  Recommandé
                </div>
                <div className="bg-gradient-to-r from-red-primary to-red-700 px-8 py-6 text-white">
                  <h3 className="text-xl font-bold">Illimité</h3>
                  <p className="text-white/90 text-sm mt-1">Tout inclus, sans Trunk SIP à ajouter</p>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="mb-6">
                    <span className="font-mono text-4xl font-black text-red-primary">29 €</span>
                    <span className="text-sm font-medium text-gray-600"> / utilisateur / mois</span>
                    <span className="block text-sm text-gray-500 mt-1">Tout inclus, aucun Trunk SIP en supplément</span>
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-red-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700 text-sm">Licence 3CX Pro mutualisée par utilisateur</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-red-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700 text-sm">Appels fixes France métropolitaine + DOM (Antilles-Guyane-Réunion) <strong>illimités inclus</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-red-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700 text-sm">Appels vers les mobiles facturés au compteur</span>
                    </li>
                  </ul>
                  <CTAButton href={TALLY_3CX_SMB_URL} external className="block">
                    Demander un devis
                  </CTAButton>
                </div>
              </div>
            </div>

            {/* Encadré Trunk SIP par instance (clarification) */}
            <div className="mt-8 bg-base-200 rounded-xl p-6 flex items-start gap-4">
              <Info size={28} className="text-blue-marine flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-gray-dark mb-1">À propos du Trunk SIP (formule au compteur)</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Le Trunk SIP se dimensionne <strong>au niveau de l'instance</strong> (et non par
                  utilisateur), selon le nombre d'<strong>appels simultanés</strong> souhaités.
                  Paliers disponibles : <span className="font-mono font-semibold text-gray-dark">2 · 4 · 8 · 16</span> canaux,
                  à partir de 2 appels simultanés.
                </p>
              </div>
            </div>
          </div>
        </section>
```

- [ ] **Step 2 : Vérifier le rendu**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/telephonie-entreprise/3cx-smb-mutualisee`
Expected: `200`

- [ ] **Step 3 : Commit**

```bash
git add app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx
git commit -m "content(3cx-smb): 2 formules tarifaires (15€ compteur / 29€ illimité) + encadré Trunk SIP"
```

---

### Task 5 : Sections « Limitations transparentes » + « Personnalisable »

**Files:**
- Modify: `app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx` (2 nouvelles sections avant le CTA final)

- [ ] **Step 1 : Insérer les 2 sections avant la section CTA finale**

Juste avant le commentaire `{/* CTA finale */}`, insérer :

```tsx
        {/* Limitations transparentes — Bon à savoir */}
        <section className="py-16 bg-base-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Bon à savoir : les <span className="text-red-primary">spécificités</span> du mutualisé
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Parce que l'infrastructure est partagée, l'offre mutualisée comporte quelques limites.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <MusicNote size={28} className="text-gray-500 flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-gray-dark mb-1">Musique d'attente imposée</h3>
                  <p className="text-gray-600 text-sm">
                    Le choix de la musique d'attente n'est pas disponible sur l'offre mutualisée
                    (limitation 3CX).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <Network size={28} className="text-gray-500 flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-gray-dark mb-1">5 numéros dédiés maximum</h3>
                  <p className="text-gray-600 text-sm">
                    Jusqu'à 5 numéros dédiés pour vos groupes d'appel, SVI et messages
                    d'ouverture / fermeture.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600 mt-8">
              Besoin de plus de flexibilité ?{" "}
              <Link href="/3cx-cloud" className="font-medium text-blue-marine underline underline-offset-2 hover:text-red-primary transition-colors">
                L'offre 3CX PRO (instance dédiée) lève ces limites
              </Link>.
            </p>
          </div>
        </section>

        {/* Ce qui reste personnalisable */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Ce qui reste <span className="text-red-primary">personnalisable</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Malgré le mutualisé, l'essentiel de votre accueil téléphonique reste sur-mesure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={24} className="text-red-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-700">Message d'accueil personnalisé (pré-décroché)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={24} className="text-red-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-700">SVI / serveur vocal interactif personnalisé</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={24} className="text-red-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-700">Messages d'ouverture et de fermeture</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={24} className="text-red-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-gray-700">App mobile 3CX, téléphones SIP Fanvil / Yealink</span>
              </div>
            </div>
          </div>
        </section>
```

- [ ] **Step 2 : Ajouter l'import `Link` next**

En haut du fichier, vérifier que `import Link from "next/link";` est présent (la page restaurée l'a déjà). Si absent, l'ajouter après l'import `Metadata`.

- [ ] **Step 3 : Vérifier le rendu**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/telephonie-entreprise/3cx-smb-mutualisee`
Expected: `200`

- [ ] **Step 4 : Commit**

```bash
git add app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx
git commit -m "content(3cx-smb): limitations transparentes + ce qui reste personnalisable"
```

---

### Task 6 : Section FAQ

**Files:**
- Modify: `app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx` (nouvelle section FAQ avant le CTA final)

- [ ] **Step 1 : Insérer la section FAQ avant `{/* CTA finale */}`**

```tsx
        {/* FAQ */}
        <section className="py-16 bg-base-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-gray-dark mb-4">
                Questions <span className="text-red-primary">fréquentes</span>
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-dark mb-2">Combien d'utilisateurs pour l'offre 3CX SMB PRO ?</h3>
                <p className="text-gray-600 text-sm">De 3 à 10 utilisateurs : 3 minimum, 10 maximum.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-dark mb-2">Quelle différence entre les formules « au compteur » et « illimité » ?</h3>
                <p className="text-gray-600 text-sm">
                  À <span className="font-mono">15 €</span>/utilisateur/mois, les appels sont facturés
                  au compteur et un Trunk SIP est à ajouter. À <span className="font-mono">29 €</span>/utilisateur/mois,
                  les appels fixes France métropolitaine et DOM sont illimités et inclus, sans Trunk SIP supplémentaire.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-dark mb-2">Qu'est-ce qu'un serveur mutualisé multi-société ?</h3>
                <p className="text-gray-600 text-sm">
                  Plusieurs sociétés partagent la même infrastructure 3CX pour réduire les coûts.
                  Chaque société est cloisonnée et isolée des autres de manière sécurisée.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-dark mb-2">Puis-je personnaliser mon message d'accueil ?</h3>
                <p className="text-gray-600 text-sm">
                  Oui : message d'accueil de pré-décroché et SVI restent personnalisables. Seul le
                  choix de la musique d'attente n'est pas disponible sur le mutualisé.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-dark mb-2">Quand faut-il un Trunk SIP ?</h3>
                <p className="text-gray-600 text-sm">
                  Avec la formule au compteur. Le Trunk SIP se dimensionne au niveau de l'instance,
                  selon vos appels simultanés (paliers 2, 4, 8, 16). La formule illimitée n'en
                  nécessite aucun.
                </p>
              </div>
            </div>
          </div>
        </section>
```

- [ ] **Step 2 : Vérifier le rendu**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/telephonie-entreprise/3cx-smb-mutualisee`
Expected: `200`

- [ ] **Step 3 : Commit**

```bash
git add app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx
git commit -m "content(3cx-smb): section FAQ (5 questions)"
```

---

### Task 7 : CTA final + vérification charte

**Files:**
- Modify: `app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx` (CTA final)

- [ ] **Step 1 : Ajuster le texte du CTA final**

Dans la section `{/* CTA finale */}`, remplacer le sous-titre `<p>` par :

```tsx
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              De 3 à 10 utilisateurs • Support par mail et téléphone • Deux formules au choix
            </p>
```

- [ ] **Step 2 : Grep anti-couleur hors charte**

Run:
```bash
grep -nE "text-(green|yellow|purple|pink|orange|emerald|teal|indigo|amber|lime|cyan|fuchsia|rose|violet)-[0-9]|bg-(green|yellow|purple|pink|orange|emerald|teal|indigo|amber|lime|cyan|fuchsia|rose|violet)-[0-9]" app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx
```
Expected: aucune sortie (aucune couleur hors charte).

- [ ] **Step 3 : Commit**

```bash
git add app/telephonie-entreprise/3cx-smb-mutualisee/page.tsx
git commit -m "content(3cx-smb): CTA final + texte honnête (2 formules)"
```

---

### Task 8 : Validation finale

- [ ] **Step 1 : Lancer la validation complète**

Run: `npm run validate`
Expected: 6/6 vert (Jest, Playwright, ESLint, TypeScript, npm audit, build).

- [ ] **Step 2 : Si un test e2e existant cible cette page et casse sur le contenu**

Vérifier `tests/` pour un éventuel test e2e de la page 3cx-smb. S'il assert sur l'ancien texte (« 29 €/utilisateur/mois » comme tarif unique), mettre à jour l'assertion vers le nouveau contenu (2 formules). Montrer le diff avant commit.

- [ ] **Step 3 : Commit final si ajustements de tests**

```bash
git add -A
git commit -m "test(3cx-smb): aligner les assertions e2e sur la refonte 2 formules"
```

---

## Self-review (effectuée)

- **Couverture spec** : Hero (T1), C'est quoi/Pour qui (T2), Mutualisé & isolation (T3), 2 formules + encadré Trunk SIP (T4), Limitations transparentes + Personnalisable (T5), FAQ (T6), CTA (T7), validation (T8). Toutes les sections de la spec sont couvertes.
- **Placeholders** : aucun — chaque step contient le JSX réel.
- **Cohérence types/noms** : `TALLY_3CX_SMB_URL`, `CTAButton`/`CTAButtonMarine`, icônes toutes vérifiées présentes dans `@/lib/icons` (Shield, Info, MusicNote, Network, CaretRight inclus).
- **Charte** : couleurs limitées + grep de contrôle en T7.
