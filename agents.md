# Agents Operating Memo

## Objectif

- Rassembler les consignes essentielles pour limiter le contexte nécessaire aux agents (Codex, IA argentique).
- Centraliser la procédure de livraison afin d'éviter les répétitions dans les discussions et PR.

## Processus Fonctionnalité

1. Développer la fonctionnalité en respectant la charte produit.
2. Stopper le serveur de développement, **libérer le port 3000** (`lsof -ti :3000 | xargs kill -9 2>/dev/null || true`), puis relancer pour repartir d'un cache vide avant de lancer les tests.
3. Écrire ou mettre à jour les tests unitaires couvrant le comportement métier.
4. Ajouter ou mettre à jour les tests Playwright garantissant que l'affichage correspond aux attentes.
5. Lancer la phase de test pour vérifier que toutes les fonctionnalités développées sont OK.
6. Vérifier l'hydratation CSS (aucun warning/erreur au lancement du serveur de développement).
7. Documenter l'évolution dans `docs/ADR.md` (nouvelle décision, impacts, tests).
8. Mettre à jour la roadmap et le plan d'implémentation.
9. Quand tout est vert et que l'ADR est à jour : commit, puis push vers GitHub.

## Validation Rapide

- `npm test`
- `npx playwright test`
- Démarrage local : `npm run dev -- --port 3000`
- Redémarrage : interrompre le process (`Ctrl+C`), libérer le port 3000 si nécessaire, puis relancer `npm run dev -- --port 3000`.

## Notes

- Ces règles condensent les directives décrites sur https://agents.md/ et https://agentsmd.net/.
- En cas d'exception produit, documenter ici pour éviter de rallonger le contexte dans les futures missions.

## Stack & Priorities

- **Testing**: TDD with Jest + MCP Playwright + Browser MCP
- **State**: Zustand pour la gestion d'états UI (loading/erreur, flags)

## Documentation Rules

- Document in /docs automatically (inclure l'usage de Zustand si pertinent)
