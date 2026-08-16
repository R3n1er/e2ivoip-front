# ME.md — Profil utilisateur

> Qui je suis, comment je travaille, et ce que j'attends d'un assistant sur ce projet.
> **Source de vérité du profil** : `claude.md` et `agents.md` renvoient ici plutôt que de dupliquer.
> Dernière mise à jour : 2026-08-15

---

## 👤 Identité

- **Nom** : Alban
- **Rôle** : chef de projet, et développeur NextJS débutant
- **Projet porteur** : E2I VoIP — refonte du site web (`e2ivoip-front`)
- **Second cerveau** : `/Users/alban/Documents/SIKS-BRAIN/` (lire son `AGENTS.md` avant toute opération)

---

## 🧠 Fonctionnement (TDAH)

Je travaille avec un TDAH. Ce n'est pas un détail de confort : une réponse mal calibrée me fait perdre le fil et le travail avec. **C'est un trouble du déficit de l'attention (TDA)**, pas seulement de l'hyperactivité. J'ai besoin de clarté, de structure et d'un seul fil à suivre à chaque instant.

**Ce qui marche :**

- **Une chose à la fois.** Une seule question par message, une seule décision à trancher.
- **Étapes numérotées, 3 maximum** à la fois. Au-delà, je décroche.
- **Résumer ce qui vient d'être fait** avant de proposer la suite. Sans ce point d'ancrage, je perds le contexte entre deux échanges.
- **Réponses courtes et concrètes.** Le code et le résultat priment sur l'explication.
- **Aller au fait en premier.** La conclusion d'abord, le raisonnement ensuite si je le demande.
- **Poser les questions de brainstorming une par une**, dans un ordre logique, et jamais en vrac. Chaque question doit partir de la réponse précédente pour m'aider à avancer sans surcharger ma charge cognitive.

**Ce qui ne marche pas :**

- Les murs de texte, les listes de 10 points, les tableaux comparatifs exhaustifs.
- Les questions ouvertes multiples dans un même message.
- Les propositions non priorisées : si plusieurs voies existent, **recommander la meilleure** au lieu de me lister les options à égalité.
- Reposer une question déjà tranchée dans la session.
- Le brainstorming sans fil conducteur : une batterie d'idées non hiérarchisées me bloque immédiatement.

---

## 🎯 Ce que j'attends d'un assistant

- **Challenger l'approche** si une meilleure voie existe. Ne pas exécuter en silence une demande bancale : le dire en une phrase, puis proposer mieux.
- **Signaler les vrais problèmes**, y compris ceux que je n'ai pas vus. Un bug latent trouvé en chemin vaut d'être remonté même hors périmètre.
- **Ne pas surestimer mon niveau technique.** Je suis débutant en NextJS : nommer les concepts, expliquer brièvement le « pourquoi » d'un choix technique.
- **Ne pas sous-estimer mon niveau métier.** Sur la téléphonie IP, le SEO business et la stratégie produit, je sais de quoi je parle.
- **Vérifier avant d'affirmer.** Un build qui passe ne prouve pas qu'une sortie est correcte : vérifier le rendu réel.
- **Ne jamais écraser du travail existant** sans avoir regardé ce qu'il contenait (`git status`, `M` vs `??`).

---

## ✅ Décisions : ce que je délègue, ce que je garde

**Décide sans me demander :**

- Choix d'implémentation technique dans `app/`, `components/`, `lib/`, `tests/`, configs
- Corrections de bugs, refactorings à périmètre constant
- Formulation des commits, structure des tests

**Demande-moi toujours :**

- Décisions produit et commerciales (une offre est-elle encore au catalogue ? quel positionnement ?)
- Tout ce qui touche à la charte graphique ou éditoriale
- `docs/PRD.md`, `docs/roadmap.md`, `.env.production`
- Suppression de contenu ou de pages publiées

Le détail des permissions par fichier est dans `memory.md` (section « Permissions »).

---

## ✅ Validation avant push

Après toute modification significative (composant, page, hook, test, config) et **avant tout push vers GitHub** :

1. Lancer les tests unitaires : `npm test`
2. Lancer les tests E2E Playwright : `npx playwright test`
3. Vérifier le type-check : `npm run type-check`
4. Vérifier le lint : `npm run lint`

Ne pas pousser si un seul de ces quatre points échoue. Vérifier localement plutôt que d'attendre CI/Verce.

---

## 🗣️ Langue et style

- **Français** pour tout : explications, commentaires de code, messages de commit.
- Accents et diacritiques **obligatoires** dans les textes et la documentation.
- Les identifiants de code et termes techniques restent dans leur forme d'origine.

---

## 🔗 Où trouver le reste

| Sujet | Fichier |
|---|---|
| Règles de collaboration IA | `claude.md`, `agents.md`, `.agents.md` |
| Décisions et contexte projet | `memory.md` |
| Décisions d'architecture | `docs/ADR.md` |
| Charte graphique (règle absolue) | `docs/CHARTE_GRAPHIQUE.md` |
| Ligne éditoriale | `docs/ligne-editoriale.md` |
| Planification | `.planning/ROADMAP.md`, `.planning/STATE.md` |

---

*Fichier maintenu manuellement. À mettre à jour quand ma façon de travailler ou mes attentes changent.*
