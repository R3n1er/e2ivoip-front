# Checklist de Renforcement des Tests

## Objectifs

- [x] Corriger la configuration Jest (`moduleNameMapper`, `moduleDirectories`) pour aligner les alias sur les composants existants.
- [x] Harmoniser les intitulés des CTA et textes attendus dans les tests (`tests/homepage-hero-image.test.tsx`, `tests/devis-page-hydration.test.tsx`).
- [x] Ajuster les `data-testid` et attributs d’accessibilité utilisés dans `header` pour correspondre aux assertions Jest.
- [ ] Finaliser la gestion des timers artificiels (`jest.useFakeTimers`) et ajouter `jest.runAllTimers()` ou des délais adaptés.
- [ ] Relancer `npm test -- --coverage` et archiver le rapport de couverture.
- [ ] Mettre à jour la documentation (`docs/PRD.md`, `docs/roadmap.md`, `docs/NEXT_STEPS.md`) en fonction des corrections effectuées.
