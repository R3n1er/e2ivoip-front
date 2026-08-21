# Titre SEO — opérateur télécom DOM

## Objectif

Renforcer le positionnement de la page d’accueil sur l’intention
« opérateur télécom DOM » avec un titre clair, concis et cohérent sur les
supports de partage.

## Décision

Le titre retenu est :

> Opérateur de services télécom DOM | E2I VoIP

Cette formulation place le sujet principal et la zone géographique avant la
marque. Sa longueur reste adaptée à l’affichage dans les résultats de recherche.

## Périmètre

- Remplacer le titre par défaut de la page d’accueil dans les métadonnées Next.js.
- Utiliser le même texte pour `openGraph.title` et `twitter.title`.
- Ne pas modifier la description SEO, le H1 ou le contenu visible.
- Ne pas modifier les titres propres aux pages internes.

## Validation

- Ajouter un test unitaire vérifiant le titre HTML, Open Graph et Twitter.
- Vérifier que les pages internes conservent leur mécanisme de titre existant.
- Exécuter `npm run validate`, dont les contrôles Jest et Playwright.
- Vérifier l’absence d’erreur ou de warning d’hydratation au démarrage local.

## Documentation et livraison

- Ajouter la décision dans `docs/ADR.md`.
- Mettre à jour la roadmap et l’état d’implémentation.
- Livrer sur une branche dédiée via une PR vers `dev`, sans fusion automatique.
