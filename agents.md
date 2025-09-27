# Agents Operating Memo

## Objectif
- Rassembler les consignes essentielles pour limiter le contexte nécessaire aux agents (Codex, IA argentique).
- Centraliser la procédure de livraison afin d'éviter les répétitions dans les discussions et PR.

## Processus Fonctionnalité
1. Développer la fonctionnalité en respectant la charte produit.
2. Écrire ou mettre à jour les tests unitaires couvrant le comportement métier.
3. Ajouter ou mettre à jour les tests Playwright garantissant que l'affichage correspond aux attentes.
4. Vérifier l'hydratation CSS (aucun warning/erreur au lancement du serveur de développement).
5. Stopper le serveur de développement, nettoyer l'état en le relançant pour repartir d'un cache vide.
6. Documenter l'évolution dans `docs/ADR.md` (nouvelle décision, impacts, tests).
7. Quand tout est vert et que l'ADR est à jour : commit, puis push vers GitHub.

## Validation Rapide
- `npm test`
- `npx playwright test`
- Démarrage local : `npm run dev`
- Redémarrage : interrompre le process (`Ctrl+C`) puis relancer `npm run dev`.

## Notes
- Ces règles condensent les directives décrites sur https://agents.md/ et https://agentsmd.net/.
- En cas d'exception produit, documenter ici pour éviter de rallonger le contexte dans les futures missions.
