# Checklist de Renforcement des Tests

## Objectifs (Historique)

- [x] Corriger la configuration Jest (`moduleNameMapper`, `moduleDirectories`) pour aligner les alias sur les composants existants.
- [x] Harmoniser les intitulés des CTA et textes attendus dans les tests (`tests/homepage-hero-image.test.tsx`, `tests/devis-page-hydration.test.tsx`).
- [x] Ajuster les `data-testid` et attributs d’accessibilité utilisés dans `header` pour correspondre aux assertions Jest.
- [ ] Finaliser la gestion des timers artificiels (`jest.useFakeTimers`) et ajouter `jest.runAllTimers()` ou des délais adaptés.
- [ ] Relancer `npm test -- --coverage` et archiver le rapport de couverture.
- [ ] Mettre à jour la documentation (`docs/PRD.md`, `docs/roadmap.md`, `docs/NEXT_STEPS.md`) en fonction des corrections effectuées.

---

## Adaptations Tests — Alignement Stitch 2026 (2026-03-29)

> Ref : `docs/implementation.md` Phase 6 — Matrice detaillee des tests par phase.

### Phase 1.3 — Section Solutions (lignes rouges decoratives)
- [ ] `tests/services-section-prd.test.tsx` : Ajouter assertion presence ligne rouge (`h-2 w-32 bg-red-primary`)
- [ ] `tests/playwright/services-section.spec.ts` : Verifier ligne rouge visible
- [ ] `tests/playwright/services-cards-alignment.spec.ts` : Verifier alignement non casse

### Phase 1.4 — Navigation (separation Devis/Contact)
- [ ] `tests/header-daisyui.test.tsx` : Tester 2 boutons separes (lien "Devis en ligne" + bouton "Contact" `.monolith-btn`)
- [ ] `tests/header-submenu.test.tsx` : Verifier sous-menus OK avec nouveau layout
- [ ] `tests/header-integration.test.tsx` : Verifier integration 2 CTA
- [ ] `tests/header-menu.test.tsx` : Tester menu mobile avec 2 actions distinctes
- [ ] `tests/e2e/header-simple.spec.ts` : Tester clic "Devis en ligne" et clic "Contact" separement
- [ ] `tests/devis-en-ligne.test.tsx` : Verifier lien correct

### Phase 2.1 — Footer (retrait logo 3CX + restyle)
- [ ] `tests/footer.test.tsx` : Retirer assertions logo/badge 3CX, ajouter verifications style Stitch
- [ ] `tests/3cx-badge.test.tsx` : Adapter (supprimer ref footer, conserver si badge existe ailleurs)

### Phase 1.5 — Chat PreOverlay (redesign Monolithe + UX)
- [ ] `tests/use-chat-intake.test.tsx` : Adapter schema Zod a 3 champs (supprimer `lastName`, `phone`)
- [ ] `tests/playwright/chat-preoverlay-flow.spec.ts` : Adapter flux 3 champs + nouveau declenchement scroll + nouveau style
- [ ] `tests/playwright/chat-animation-cycles.spec.ts` : Adapter au declenchement Intersection Observer post-Hero
- [ ] `tests/playwright/chat-button-animation.spec.ts` : Verifier style rouge plein + hard shadow (plus de gradient)
- [ ] `tests/playwright/debug-chat-button.spec.ts` : Verifier nouveau style et positionnement

### Phase 5.1 — Pages Interieures
- [ ] `tests/e2e/assistants-vocaux-ia.spec.ts` : Verifier Hero + CTA si modifies
- [ ] `tests/assistants-vocaux-ia.test.tsx` : Pas de regression
- [ ] `tests/trunk-sip-compteur.test.tsx` : Pas de regression
