# Tunnel de Leads Trunk SIP Compteur — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retirer tous les tarifs affichés publiquement sur la page Trunk SIP au compteur et les remplacer par un formulaire Tally unique de capture de leads relié à un webhook n8n.

**Architecture:** Suppression du bloc tarifs (grille 2 colonnes → 1 colonne centrée). Création d'un composant `TallyEmbedTarifs` calqué sur le pattern SSR-safe de `TallyEmbedDevis` existant (garde `isClient` contre les mismatch d'hydratation), pointant vers le formulaire Tally `7RpEBa`. Le `TallyEmbedDevis` est retiré de la page mais le fichier est conservé.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind, Tally embed, Jest + Testing Library.

---

## File Structure

| Fichier | Responsabilité |
|---------|----------------|
| `components/tally-embed-tarifs.tsx` | **Créer.** Composant client affichant le formulaire Tally `7RpEBa` (demande de tarifs), SSR-safe. |
| `app/telephonie-entreprise/trunk-sip-compteur/page.tsx` | **Modifier.** Supprimer bloc tarifs, passer en 1 colonne, remplacer `TallyEmbedDevis` par `TallyEmbedTarifs`, ajuster texte de défilement. |
| `tests/trunk-sip-compteur.test.tsx` | **Modifier.** Retirer assertions tarifs, ajouter assertions formulaire + non-régression prix. |

---

## Task 1 : Mettre à jour les tests (RED)

On modifie les tests d'abord. Ils doivent échouer car la page affiche encore les tarifs et n'a pas le composant tarifs.

**Files:**
- Test: `tests/trunk-sip-compteur.test.tsx`

- [ ] **Step 1 : Supprimer les 3 tests qui vérifient l'affichage des tarifs**

Supprimer entièrement ces 3 blocs `test(...)` du fichier :
- `test("affiche la section des tarifs détaillés des appels à la minute", ...)`
- `test("affiche le tableau des coûts avec tous les tarifs", ...)`
- `test('affiche les indications "Sur devis"', ...)`

(Ces comportements ne doivent plus exister — les tarifs sont retirés.)

- [ ] **Step 2 : Ajouter deux nouveaux tests à la fin du `describe`**

Ajouter juste avant la dernière accolade fermante `});` du `describe("Page Trunk SIP au Compteur", ...)` :

```tsx
  test("affiche le formulaire de demande de tarifs", () => {
    render(<TrunkSIPCompteur />);
    expect(
      screen.getByText(/Recevez nos tarifs personnalisés/i)
    ).toBeInTheDocument();
  });

  test("n'affiche aucun tarif chiffré (protection concurrentielle)", () => {
    render(<TrunkSIPCompteur />);
    expect(screen.queryByText(/0,0120/)).not.toBeInTheDocument();
    expect(screen.queryByText(/0,0600/)).not.toBeInTheDocument();
    expect(screen.queryByText(/0,0160/)).not.toBeInTheDocument();
    expect(screen.queryByText(/0,0800/)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Tarifs des appels à la minute/i)
    ).not.toBeInTheDocument();
  });
```

- [ ] **Step 3 : Lancer les tests pour vérifier qu'ils échouent**

Run : `npx jest tests/trunk-sip-compteur.test.tsx`
Expected : FAIL. Le nouveau test "affiche le formulaire de demande de tarifs" échoue (texte absent), et "n'affiche aucun tarif chiffré" échoue (les prix `0,0120` etc. sont encore présents).

- [ ] **Step 4 : Commit**

```bash
git add tests/trunk-sip-compteur.test.tsx
git commit -m "$(cat <<'EOF'
test: mettre à jour les tests trunk-sip-compteur pour tunnel de leads (RED)

Retire les assertions sur les tarifs affichés, ajoute assertions
formulaire de tarifs présent + non-régression absence de prix chiffrés.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2 : Créer le composant `TallyEmbedTarifs`

Composant client calqué sur `TallyEmbedDevis` mais orienté "recevoir les tarifs", pointant vers le form Tally `7RpEBa`.

**Files:**
- Create: `components/tally-embed-tarifs.tsx`

- [ ] **Step 1 : Créer le fichier avec le contenu complet**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Calculator, CheckCircle, Shield, Timer, Users } from '@/lib/icons';

const TALLY_EMBED_URL =
  "https://tally.so/embed/7RpEBa?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1";
const TALLY_SCRIPT_SRC = "https://tally.so/widgets/embed.js";
const TALLY_SCRIPT_ID = "tally-embed-script";

export function TallyEmbedTarifs() {
  const [isClient, setIsClient] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const loadEmbeds = () => {
      const tally = (window as any).Tally;
      if (tally && typeof tally.loadEmbeds === "function") {
        tally.loadEmbeds();
      } else if (iframeRef.current && !iframeRef.current.src) {
        iframeRef.current.src = TALLY_EMBED_URL;
      }
    };

    const existingScript = document.getElementById(
      TALLY_SCRIPT_ID
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if ((window as any).Tally) {
        loadEmbeds();
      } else {
        existingScript.addEventListener("load", loadEmbeds, { once: true });
        existingScript.addEventListener("error", loadEmbeds, { once: true });
      }

      return () => {
        existingScript.removeEventListener("load", loadEmbeds);
        existingScript.removeEventListener("error", loadEmbeds);
      };
    }

    const script = document.createElement("script");
    script.id = TALLY_SCRIPT_ID;
    script.src = TALLY_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", loadEmbeds, { once: true });
    script.addEventListener("error", loadEmbeds, { once: true });
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", loadEmbeds);
      script.removeEventListener("error", loadEmbeds);
    };
  }, [isClient]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-primary/10 text-red-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calculator size={20} className="mr-2" aria-hidden="true" />
            Tarifs personnalisés
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
            Recevez nos{" "}
            <span className="text-red-primary">tarifs personnalisés</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Laissez-nous vos coordonnées, nous vous envoyons notre{" "}
            <strong>grille tarifaire complète par email</strong>
          </p>

          {/* Avantages du formulaire */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle size={24} className="text-red-primary" aria-hidden="true" />
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield size={24} className="text-blue-marine" aria-hidden="true" />
              <span>Données confidentielles</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Timer size={24} className="text-red-primary" aria-hidden="true" />
              <span>Envoi rapide par email</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={24} className="text-blue-marine" aria-hidden="true" />
              <span>Expert dédié</span>
            </div>
          </div>
        </div>

        {/* Container du formulaire */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-red-primary/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-tl from-blue-600/20 to-transparent rounded-full blur-2xl"></div>

          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="rounded-xl overflow-hidden">
              {isClient ? (
                <iframe
                  ref={iframeRef}
                  src={TALLY_EMBED_URL}
                  data-tally-src={TALLY_EMBED_URL}
                  loading="lazy"
                  width="100%"
                  height="500"
                  style={{ border: 0, margin: 0 }}
                  title="E2I VOIP - Demande de tarifs Trunk SIP"
                  className="w-full"
                  allow="clipboard-read; clipboard-write"
                  sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-[500px] bg-gray-50">
                  <span className="text-gray-500">
                    Chargement du formulaire…
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2 : Vérifier que TypeScript compile**

Run : `npx tsc --noEmit`
Expected : Aucune nouvelle erreur liée à `tally-embed-tarifs.tsx`.

- [ ] **Step 3 : Commit**

```bash
git add components/tally-embed-tarifs.tsx
git commit -m "$(cat <<'EOF'
feat: composant TallyEmbedTarifs pour demande de tarifs par email

Formulaire Tally 7RpEBa SSR-safe, calqué sur TallyEmbedDevis.
Relié à un webhook n8n côté Tally qui enverra les tarifs au prospect.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3 : Modifier la page (GREEN)

On retire les tarifs, on passe la grille en 1 colonne, on remplace le formulaire et on ajuste le texte de défilement.

**Files:**
- Modify: `app/telephonie-entreprise/trunk-sip-compteur/page.tsx`

- [ ] **Step 1 : Remplacer l'import du composant Tally (ligne 6)**

Ancien :
```tsx
import { TallyEmbedDevis } from "@/components/tally-embed-devis";
```
Nouveau :
```tsx
import { TallyEmbedTarifs } from "@/components/tally-embed-tarifs";
```

- [ ] **Step 2 : Ajuster le texte de l'indicateur de défilement (vers ligne 109-111)**

Ancien :
```tsx
                  <span className="text-white/60 text-sm mb-2">
                    Découvrez nos tarifs
                  </span>
```
Nouveau :
```tsx
                  <span className="text-white/60 text-sm mb-2">
                    Recevez nos tarifs personnalisés
                  </span>
```

- [ ] **Step 3 : Passer la grille en une seule colonne (ligne 140)**

Ancien :
```tsx
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
```
Nouveau :
```tsx
            <div className="max-w-3xl mx-auto">
              <div>
```

- [ ] **Step 4 : Supprimer entièrement le bloc tarifs (lignes ~224-306)**

Supprimer tout le bloc qui commence par :
```tsx
              <div className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-2xl">
```
et se termine par la balise fermante `</div>` correspondante juste avant la fermeture du conteneur `grid` (le `</div>` à la ligne ~306, avant `</div></div></section>`).

Concrètement, après suppression, la fin de cette `<section>` doit ressembler à :
```tsx
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users size={24} className="text-gray-secondary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-dark mb-2">
                        Support technique local réactif
                      </h3>
                      <p className="text-gray-600">
                        Équipes présentes localement en{" "}
                        <strong>Martinique, Guadeloupe, Guyane</strong>. Réponse
                        en moins de 2h.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
```

(Le bloc `<div className="bg-gradient-to-br from-blue-50 to-red-50 ...">` qui contenait les prix France Fixe/Mobile, DOM Fixe/Mobile, SDA, Portabilité, et l'encart Info, a entièrement disparu.)

- [ ] **Step 5 : Remplacer l'usage `<TallyEmbedDevis />` (ligne ~421)**

Ancien :
```tsx
        {/* Formulaire Tally (embed) avec nouvelle UX améliorée */}
        <TallyEmbedDevis />
```
Nouveau :
```tsx
        {/* Formulaire Tally tarifs (embed) → webhook n8n */}
        <TallyEmbedTarifs />
```

- [ ] **Step 6 : Lancer les tests pour vérifier qu'ils passent**

Run : `npx jest tests/trunk-sip-compteur.test.tsx`
Expected : PASS. Tous les tests verts, dont "affiche le formulaire de demande de tarifs" et "n'affiche aucun tarif chiffré".

- [ ] **Step 7 : Vérifier la compilation TypeScript**

Run : `npx tsc --noEmit`
Expected : Aucune erreur (notamment aucune référence orpheline à `TallyEmbedDevis` dans cette page).

- [ ] **Step 8 : Commit**

```bash
git add app/telephonie-entreprise/trunk-sip-compteur/page.tsx
git commit -m "$(cat <<'EOF'
feat: remplacer tarifs affichés par tunnel de leads (GREEN)

Supprime le bloc tarifs (protection concurrentielle), passe la grille
en une colonne centrée, remplace TallyEmbedDevis par TallyEmbedTarifs.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4 : Vérification finale (REFACTOR + VALIDATE)

**Files:** aucun changement de code attendu, sauf correction si validation échoue.

- [ ] **Step 1 : Vérifier visuellement la page en local**

Run : `npm run dev`
Ouvrir `http://localhost:3000/telephonie-entreprise/trunk-sip-compteur`.
Vérifier :
- Aucun prix affiché nulle part.
- Les 4 avantages (facturation au compteur, numéros locaux, compatible IPBX, support local) sont centrés, bien lisibles, pas de colonne vide à droite.
- Le formulaire "Recevez nos tarifs personnalisés" se charge (iframe Tally `7RpEBa`).
- Le texte de défilement du hero dit "Recevez nos tarifs personnalisés".

- [ ] **Step 2 : Lancer la validation complète du projet**

Run : `npm run validate`
Expected : Les 6 contrôles passent. Si un contrôle échoue, corriger la cause racine puis recommencer (ne pas contourner).

- [ ] **Step 3 : Commit final si des corrections ont été nécessaires**

(Seulement si Step 2 a nécessité des modifications.)
```bash
git add -A
git commit -m "$(cat <<'EOF'
fix: corrections post-validation tunnel de leads trunk-sip-compteur

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Étape manuelle hors-code (utilisateur)

Le webhook n8n doit être configuré côté Tally + n8n par l'utilisateur :
1. Dans Tally (form `7RpEBa`) : **Integrations → Webhooks** → coller l'URL du nœud Webhook n8n.
2. Dans n8n : construire le workflow qui reçoit le payload (4 champs : Nom/prénom, Email, Entreprise, Téléphone) et envoie l'email avec les tarifs au prospect.

Sans cette config, le formulaire collecte les leads mais l'email automatique n'est pas envoyé.
