# Trunk SIP Agents IA — Refonte SEO page intégrateurs

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Améliorer le contenu SEO de la page `/telephonie-entreprise/trunk-sip-agents-ia` pour corriger les statuts plateformes, optimiser les métadonnées, honnêtiser les cas d'usage et ajouter un CTA dual conforme à la charte éditoriale.

**Architecture:** Deux fichiers seulement — `layout.tsx` pour les métadonnées et `page.tsx` pour le contenu. Aucune nouvelle dépendance. Aucun nouveau composant. Les badges de statut sont du HTML/Tailwind inline.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Phosphor Icons (lib/icons)

---

## Fichiers modifiés

| Fichier | Rôle | Changements |
|---|---|---|
| `app/telephonie-entreprise/trunk-sip-agents-ia/layout.tsx` | Métadonnées SEO | Enrichir title, description, keywords, openGraph |
| `app/telephonie-entreprise/trunk-sip-agents-ia/page.tsx` | Contenu de la page | 5 corrections (statuts, cas d'usage, avantages, CTA, H1) |

---

## Task 1 : Mettre à jour les métadonnées SEO (layout.tsx)

**Files:**
- Modify: `app/telephonie-entreprise/trunk-sip-agents-ia/layout.tsx`

Le layout actuel a des métadonnées correctes mais incomplètes. Les keywords n'incluent pas "revendeur SIP DOM" ni "numéros DOM Guadeloupe Martinique" qui sont des mots-clés primaires selon la charte éditoriale.

- [ ] **Étape 1 : Remplacer le contenu du layout.tsx**

Remplacer le fichier `app/telephonie-entreprise/trunk-sip-agents-ia/layout.tsx` avec ce contenu exact :

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Trunk SIP Agents Vocaux IA — Numéros DOM Antilles-Guyane-Réunion | E2I VoIP",
  description:
    "E2I VoIP, carrier SIP DOM : numéros locaux +596, +590, +594, +262 et interconnexion SIP pour VAPI, Rounded, ElevenLabs, Jambonz. Trunk BYOC validé pour vos agents vocaux IA en zones DOM.",
  keywords:
    "trunk SIP agents vocaux IA, carrier SIP DOM, BYOC SIP DOM, numéros DOM Guadeloupe Martinique, revendeur SIP DOM France, interconnexion VAPI Rounded, SIP trunk Réunion Guyane, Jambonz DOM, ElevenLabs SIP DOM",
  openGraph: {
    title: "Trunk SIP Agents Vocaux IA — Numéros DOM | E2I VoIP",
    description:
      "Carrier SIP DOM pour intégrateurs IA. Numéros locaux +596, +590, +594, +262. Interconnexion validée VAPI, Rounded, ElevenLabs, Jambonz.",
    type: "website",
    locale: "fr_FR",
    url: "https://e2ivoip.fr/telephonie-entreprise/trunk-sip-agents-ia",
    siteName: "E2I VoIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trunk SIP Agents Vocaux IA — Numéros DOM | E2I VoIP",
    description:
      "Carrier SIP DOM pour intégrateurs IA. Numéros locaux Antilles-Guyane-Réunion. Trunk BYOC pour VAPI, Rounded, ElevenLabs, Jambonz.",
  },
};

export default function TrunkSipAgentsIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

- [ ] **Étape 2 : Vérifier la compilation TypeScript**

```bash
cd /Users/alban/Developer/e2ivoip-front && npx tsc --noEmit 2>&1 | grep "trunk-sip-agents-ia"
```

Résultat attendu : aucune sortie (aucune erreur sur ces fichiers).

- [ ] **Étape 3 : Commit**

```bash
git add app/telephonie-entreprise/trunk-sip-agents-ia/layout.tsx
git commit -m "seo: enrichir métadonnées page trunk-sip-agents-ia avec mots-clés revendeur DOM"
```

---

## Task 2 : Corriger le H1 pour intégrer les mots-clés cibles

**Files:**
- Modify: `app/telephonie-entreprise/trunk-sip-agents-ia/page.tsx` (ligne 118-121)

Le H1 actuel "Trunk SIP pour agents vocaux IA" ne contient pas les mots-clés géographiques cibles.

- [ ] **Étape 1 : Remplacer le H1**

Dans `page.tsx`, trouver ce bloc (lignes 118-121) :

```tsx
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Trunk SIP pour{" "}
                <span className="text-white">agents vocaux IA</span>
              </h1>
```

Le remplacer par :

```tsx
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Trunk SIP{" "}
                <span className="text-white">agents vocaux IA</span>{" "}
                DOM
              </h1>
```

- [ ] **Étape 2 : Mettre à jour le sous-titre pour mieux qualifier l'audience**

Trouver ce bloc (lignes 122-126) :

```tsx
              <p className="text-xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed">
                Numéros locaux Antilles-Guyane-Réunion et interconnexion SIP
                pour VAPI, Rounded, ElevenLabs, Jambonz
              </p>
```

Le remplacer par :

```tsx
              <p className="text-xl text-white/95 mb-4 max-w-4xl mx-auto leading-relaxed">
                Numéros locaux +596, +590, +594, +262 et trunk SIP BYOC
                pour VAPI, Rounded, ElevenLabs, Jambonz
              </p>
```

- [ ] **Étape 3 : Vérifier visuellement**

```bash
cd /Users/alban/Developer/e2ivoip-front && npx tsc --noEmit 2>&1 | head -20
```

Résultat attendu : aucune erreur TypeScript.

- [ ] **Étape 4 : Commit**

```bash
git add app/telephonie-entreprise/trunk-sip-agents-ia/page.tsx
git commit -m "seo: optimiser H1 et sous-titre hero avec mots-clés géographiques DOM"
```

---

## Task 3 : Ajouter les badges de statut sur les cartes plateforme

**Files:**
- Modify: `app/telephonie-entreprise/trunk-sip-agents-ia/page.tsx` (objet `platforms` lignes 8-35, cartes lignes 246-270)

La charte éditoriale impose d'afficher le statut de validation de chaque plateforme. Rounded est validé ; VAPI est "en finalisation" ; ElevenLabs et Jambonz sont "en évaluation". Présenter toutes les plateformes à égalité est contraire à la charte.

- [ ] **Étape 1 : Ajouter le champ `status` à l'objet `platforms`**

Trouver et remplacer l'objet `platforms` (lignes 8-35) :

```tsx
const platforms = [
  {
    name: "VAPI",
    description:
      "BYO SIP Trunk et numéro BYO. Credential byo-sip-trunk, routage entrant vers sip.vapi.ai.",
    docUrl: "https://docs.vapi.ai/advanced/sip/sip-trunk",
  },
  {
    name: "Rounded",
    description:
      "Trunk SIP custom. Origination sip:sip.callrounded.com — numéro E.164 + URI de termination.",
    docUrl: "https://docs.callrounded.com/documentation/telephony/sip-trunk",
  },
  {
    name: "ElevenLabs Agents",
    description:
      "SIP Trunking BYOC. Auth digest ou ACL IP, TLS/SRTP pour agents conversationnels.",
    docUrl:
      "https://elevenlabs.io/docs/eleven-agents/phone-numbers/sip-trunking",
  },
  {
    name: "Jambonz",
    description:
      "CPaaS open-source. Trunks IP, auth ou registration — idéal pour intégrateurs self-hosted.",
    docUrl:
      "https://docs.jambonz.org/guides/using-the-jambonz-portal/basic-concepts/creating-carriers",
  },
];
```

Par :

```tsx
const platforms = [
  {
    name: "Rounded",
    description:
      "Trunk SIP custom. Origination sip:sip.callrounded.com — numéro E.164 + URI de termination.",
    docUrl: "https://docs.callrounded.com/documentation/telephony/sip-trunk",
    status: "validated" as const,
    statusLabel: "Validé",
  },
  {
    name: "VAPI",
    description:
      "BYO SIP Trunk et numéro BYO. Credential byo-sip-trunk, routage entrant vers sip.vapi.ai.",
    docUrl: "https://docs.vapi.ai/advanced/sip/sip-trunk",
    status: "in-progress" as const,
    statusLabel: "Compatibilité en finalisation",
  },
  {
    name: "ElevenLabs Agents",
    description:
      "SIP Trunking BYOC. Auth digest ou ACL IP, TLS/SRTP pour agents conversationnels.",
    docUrl:
      "https://elevenlabs.io/docs/eleven-agents/phone-numbers/sip-trunking",
    status: "evaluating" as const,
    statusLabel: "En évaluation",
  },
  {
    name: "Jambonz",
    description:
      "CPaaS open-source. Trunks IP, auth ou registration — idéal pour intégrateurs self-hosted.",
    docUrl:
      "https://docs.jambonz.org/guides/using-the-jambonz-portal/basic-concepts/creating-carriers",
    status: "evaluating" as const,
    statusLabel: "En évaluation",
  },
];
```

- [ ] **Étape 2 : Mettre à jour le rendu des cartes plateforme**

Trouver le bloc de rendu des cartes (lignes 246-270) :

```tsx
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-dark mb-3">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {platform.description}
                  </p>
                  <a
                    href={platform.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-primary text-sm font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Documentation
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
```

Le remplacer par :

```tsx
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border hover:shadow-lg transition-shadow ${
                    platform.status === "validated"
                      ? "border-green-500/40"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-dark">
                      {platform.name}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                        platform.status === "validated"
                          ? "bg-green-100 text-green-700"
                          : platform.status === "in-progress"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {platform.statusLabel}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {platform.description}
                  </p>
                  <a
                    href={platform.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-primary text-sm font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Documentation
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
```

- [ ] **Étape 3 : Vérifier la compilation TypeScript**

```bash
cd /Users/alban/Developer/e2ivoip-front && npx tsc --noEmit 2>&1 | head -30
```

Résultat attendu : aucune erreur TypeScript.

- [ ] **Étape 4 : Commit**

```bash
git add app/telephonie-entreprise/trunk-sip-agents-ia/page.tsx
git commit -m "seo: ajouter badges de statut validation plateformes IA (Rounded validé, VAPI en finalisation)"
```

---

## Task 4 : Corriger la section "Ce que nous apportons" (bullet points)

**Files:**
- Modify: `app/telephonie-entreprise/trunk-sip-agents-ia/page.tsx` (lignes 163-176)

La charte éditoriale impose de mentionner "Guichet unique" et l'accompagnement technique. Ces deux points manquent dans la liste actuelle.

- [ ] **Étape 1 : Remplacer la liste des avantages**

Trouver ce bloc (lignes 163-176) :

```tsx
                <ul className="space-y-4">
                  {[
                    "Numéros locaux +596, +590, +594, +262",
                    "Trunk SIP bidirectionnel ou redirection d'appels",
                    "Accompagnement technique intégrateurs",
                    "Support local Antilles-Guyane-Réunion",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-red-primary mt-0.5" aria-hidden="true" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
```

Le remplacer par :

```tsx
                <ul className="space-y-4">
                  {[
                    "Numéros locaux +596, +590, +594, +262",
                    "Trunk SIP bidirectionnel ou redirection d'appels",
                    "Guichet unique : contrat, facturation et support en un seul interlocuteur",
                    "Accompagnement technique de l'intégration SIP",
                    "Support local Antilles-Guyane-Réunion",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle size={24} className="text-red-primary mt-0.5" aria-hidden="true" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
```

- [ ] **Étape 2 : Commit**

```bash
git add app/telephonie-entreprise/trunk-sip-agents-ia/page.tsx
git commit -m "seo: ajouter guichet unique et accompagnement technique dans les avantages"
```

---

## Task 5 : Corriger les cas d'usage (honnêteté éditoriale)

**Files:**
- Modify: `app/telephonie-entreprise/trunk-sip-agents-ia/page.tsx` (lignes 276-281)

La charte interdit de présenter des cas d'usage non validés comme des "retours d'expérience terrain". Ces cas sont des placeholders jusqu'à ce que les contacts 1 et 2 remontent des données réelles.

- [ ] **Étape 1 : Corriger le sous-titre de la section**

Trouver ce bloc (lignes 276-281) :

```tsx
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Cas d&apos;usage{" "}
                <span className="text-red-primary">déjà déployés</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Retours d&apos;expérience terrain avec des intégrateurs et leurs
                clients en zone DOM.
              </p>
            </div>
```

Le remplacer par :

```tsx
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-6">
                Cas d&apos;usage{" "}
                <span className="text-red-primary">types</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Exemples concrets d&apos;agents vocaux IA déployés avec des numéros
                locaux DOM via trunk SIP.
              </p>
            </div>
```

- [ ] **Étape 2 : Commit**

```bash
git add app/telephonie-entreprise/trunk-sip-agents-ia/page.tsx
git commit -m "seo: corriger section cas usage - retirer claim retours terrain non validés"
```

---

## Task 6 : Ajouter le CTA dual (intégrateurs + revendeurs)

**Files:**
- Modify: `app/telephonie-entreprise/trunk-sip-agents-ia/page.tsx` (lignes 130-135 hero, lignes 393-409 CTA final)

La charte impose un CTA dual : primaire "Parler à un commercial" pour les intégrateurs, et secondaire vers le programme Early Access pour les revendeurs.

- [ ] **Étape 1 : Mettre à jour le CTA dans le hero**

Trouver ce bloc dans le hero (lignes 130-135) :

```tsx
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CTAButton href="#contact" icon="Chat">
                  Parler à un commercial
                </CTAButton>
              </div>
```

Le remplacer par :

```tsx
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CTAButton href="#contact" icon="Chat">
                  Parler à un commercial
                </CTAButton>
                <CTAButtonSecondary
                  href="/trunk-sip-agents-vocaux-ia-revendeurs"
                  icon="ArrowRight"
                >
                  Programme Revendeur Early Access
                </CTAButtonSecondary>
              </div>
```

- [ ] **Étape 2 : Mettre à jour le CTA final en bas de page**

Trouver ce bloc (lignes 389-409) :

```tsx
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Déployez vos agents IA avec des numéros locaux DOM
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Intégrateurs : connectez VAPI, Rounded, ElevenLabs ou Jambonz au
              réseau téléphonique Antilles-Guyane-Réunion avec E2I VoIP.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton href="#contact" icon="Chat">
                Parler à un commercial
              </CTAButton>
              <CTAButtonSecondary
                href="tel:+33189560500"
                external
                icon="Phone"
              >
                01 89 56 05 00
              </CTAButtonSecondary>
            </div>
          </div>
```

Le remplacer par :

```tsx
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Déployez vos agents IA avec des numéros locaux DOM
            </h2>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Intégrateurs : connectez VAPI, Rounded, ElevenLabs ou Jambonz au
              réseau téléphonique Antilles-Guyane-Réunion avec E2I VoIP.
            </p>
            <p className="text-base text-white/75 mb-10 max-w-2xl mx-auto">
              Vous revendez à vos clients ? Rejoignez notre programme Early Access
              revendeur avec des marges de 40 à 60 %.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton href="#contact" icon="Chat">
                Parler à un commercial
              </CTAButton>
              <CTAButtonSecondary
                href="/trunk-sip-agents-vocaux-ia-revendeurs"
                icon="ArrowRight"
              >
                Programme Revendeur Early Access
              </CTAButtonSecondary>
            </div>
          </div>
```

- [ ] **Étape 3 : Vérifier que CTAButtonSecondary accepte icon="ArrowRight"**

```bash
cd /Users/alban/Developer/e2ivoip-front && grep -n "ArrowRight\|icon" components/ui/cta-button.tsx | head -20
```

Si `CTAButtonSecondary` n'accepte pas `icon="ArrowRight"`, utiliser simplement `icon="Phone"` ou supprimer la prop `icon` selon l'implémentation existante.

- [ ] **Étape 4 : Vérifier la compilation TypeScript**

```bash
cd /Users/alban/Developer/e2ivoip-front && npx tsc --noEmit 2>&1 | head -30
```

Résultat attendu : aucune erreur TypeScript.

- [ ] **Étape 5 : Commit**

```bash
git add app/telephonie-entreprise/trunk-sip-agents-ia/page.tsx
git commit -m "seo: ajouter CTA dual intégrateurs + revendeurs Early Access"
```

---

## Task 7 : Validation finale

**Files:** aucun

- [ ] **Étape 1 : Lancer le serveur de développement**

```bash
cd /Users/alban/Developer/e2ivoip-front && npm run dev &
```

Attendre que le serveur soit prêt (message "Ready").

- [ ] **Étape 2 : Vérifier la page en navigateur**

Ouvrir `http://localhost:3000/telephonie-entreprise/trunk-sip-agents-ia` et vérifier :
- H1 contient "DOM"
- Rounded a un badge vert "Validé"
- VAPI a un badge orange "Compatibilité en finalisation"
- ElevenLabs et Jambonz ont un badge gris "En évaluation"
- CTA hero contient deux boutons
- Section cas d'usage dit "types" et non "déjà déployés"
- CTA final mentionne le programme revendeur

- [ ] **Étape 3 : Lancer la suite de validation**

```bash
cd /Users/alban/Developer/e2ivoip-front && npm run validate
```

Résultat attendu : 6/6 contrôles passent.

- [ ] **Étape 4 : Arrêter le serveur**

```bash
kill %1
```

---

## Checklist spec coverage

- [x] Statuts plateformes (Rounded validé, VAPI finalisation, ElevenLabs/Jambonz évaluation) → Task 3
- [x] H1 optimisé avec mots-clés géographiques → Task 2
- [x] Métadonnées enrichies (keywords revendeur, title plus précis) → Task 1
- [x] Avantages enrichis (guichet unique, accompagnement technique) → Task 4
- [x] Cas d'usage honnêtes (retrait "retours terrain") → Task 5
- [x] CTA dual intégrateurs + revendeurs → Task 6
- [x] Validation finale → Task 7
