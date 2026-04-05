# Animation par Cycles - Module Pré-Chat

**Date**: 2025-10-05
**Version**: 2.1
**Composant**: `components/chat-preoverlay.tsx`

## 🔄 Comportement de l'Animation

### Timeline d'Animation

```
0s  → Vibration démarre (3s)
3s  → Pause (2s)
5s  → Vibration reprend (3s)
8s  → Pause (2s)
10s → Vibration reprend (3s)
13s → Pause (2s)
15s → Vibration reprend (3s)
18s → Pause (2s)
20s → ARRÊT DÉFINITIF ❌
```

### Paramètres

| Paramètre | Valeur | Description |
|-----------|--------|-------------|
| **Durée vibration** | 3 secondes | Temps d'animation active |
| **Durée pause** | 2 secondes | Temps sans animation |
| **Durée totale** | 20 secondes | Arrêt automatique après |
| **Cycle complet** | 5 secondes | Vibration + Pause |
| **Nombre de cycles** | ~4 cycles | En 20 secondes |

## 🎯 Logique Implémentée

### Code React

```tsx
const [isAnimating, setIsAnimating] = useState(true);
const [animationStopped, setAnimationStopped] = useState(false);

React.useEffect(() => {
  if (animationStopped) return;

  const VIBRATION_DURATION = 3000; // 3s
  const PAUSE_DURATION = 2000;     // 2s
  const TOTAL_DURATION = 20000;    // 20s

  const allTimers: NodeJS.Timeout[] = [];

  // Arrêt global après 20s
  const stopTimer = setTimeout(() => {
    setIsAnimating(false);
    setAnimationStopped(true);
  }, TOTAL_DURATION);
  allTimers.push(stopTimer);

  // Cycles vibration/pause
  const runAnimationCycle = () => {
    setIsAnimating(true); // Vibration

    const vibrationTimer = setTimeout(() => {
      setIsAnimating(false); // Pause

      const pauseTimer = setTimeout(() => {
        runAnimationCycle(); // Répéter
      }, PAUSE_DURATION);
      allTimers.push(pauseTimer);
    }, VIBRATION_DURATION);
    allTimers.push(vibrationTimer);
  };

  runAnimationCycle(); // Démarrer

  return () => {
    allTimers.forEach(timer => clearTimeout(timer));
  };
}, [animationStopped]);
```

## 🛑 Arrêt de l'Animation

### 3 Cas d'Arrêt Définitif

#### 1. Après 20 Secondes (Automatique)

```tsx
setTimeout(() => {
  setIsAnimating(false);
  setAnimationStopped(true);
}, 20000);
```

**Comportement** : L'animation s'arrête et ne reprend JAMAIS.

#### 2. Au Clic sur le Bouton

```tsx
onClick={() => {
  setOpen(true);
  setIsAnimating(false);
  setAnimationStopped(true); // ← Arrêt définitif
}}
```

**Comportement** : L'animation s'arrête immédiatement, même si l'utilisateur ferme le formulaire ensuite.

#### 3. Au Clic sur "Annuler"

```tsx
const handleCancel = useCallback(() => {
  setOpen(false);
  reset();
  setIsAnimating(false);
  setAnimationStopped(true); // ← Arrêt définitif
}, [reset]);
```

**Comportement** : L'animation ne reprend PAS après annulation.

## 📊 Scénarios d'Utilisation

### Scénario 1 : Utilisateur Passif

```
0s   → Page chargée, animation démarre
3s   → Pause
5s   → Animation reprend
8s   → Pause
10s  → Animation reprend
13s  → Pause
15s  → Animation reprend
18s  → Pause
20s  → Animation arrêtée définitivement
25s  → Bouton reste visible mais statique
```

**Résultat** : 4 cycles d'animation, puis repos.

### Scénario 2 : Utilisateur Clique à 7s

```
0s   → Animation démarre
3s   → Pause
5s   → Animation reprend
7s   → 👆 Utilisateur clique
      → Animation s'arrête immédiatement
      → Formulaire s'ouvre
12s  → Utilisateur remplit et soumet
      → Animation reste arrêtée
```

**Résultat** : Animation définitivement arrêtée après le clic.

### Scénario 3 : Utilisateur Annule à 9s

```
0s   → Animation démarre
3s   → Pause
5s   → Animation reprend
8s   → Pause
9s   → 👆 Utilisateur clique
      → Animation s'arrête
      → Formulaire s'ouvre
10s  → ❌ Utilisateur annule
      → Formulaire se ferme
      → Animation RESTE arrêtée
15s  → Bouton visible mais statique
```

**Résultat** : Pas de reprise d'animation après annulation.

## 🎨 Animations CSS

### Animation Shake (Vibration)

```css
@keyframes shake {
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-2px) rotate(-1deg);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(2px) rotate(1deg);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out infinite;
}
```

**Application** :
```tsx
className={`... ${isAnimating ? "animate-shake" : ""}`}
```

### Animation Bounce (Rebond Texte)

Utilise l'animation Tailwind native `animate-bounce`.

```tsx
className={`... ${isAnimating ? "animate-bounce" : ""}`}
```

## 🧪 Tests Playwright

### Tests Créés

1. **`chat-animation-cycles.spec.ts`** - Validation des cycles
   - ✅ Cycle vibration → pause → vibration
   - ✅ Arrêt après 20 secondes
   - ✅ Arrêt au clic + pas de reprise
   - ✅ Comptage des cycles
   - ✅ Screenshots vibration vs repos

### Commandes de Test

```bash
# Tous les tests de cycles
npm run test:e2e -- chat-animation-cycles

# Test rapide (screenshot seulement)
npm run test:e2e -- chat-animation-cycles --grep screenshot

# Test sans le test de 20s (trop long)
npm run test:e2e -- chat-animation-cycles --grep-invert "20 secondes"
```

## 🎯 Objectifs UX

### Attirer l'Attention Sans Agacer

| Stratégie | Implémentation |
|-----------|----------------|
| **Visible** | Bouton 80px × 80px |
| **Attractif** | Animation shake |
| **Non invasif** | Cycles avec pauses |
| **Respect** | Arrêt après 20s |
| **Intelligent** | Arrêt au clic |

### Avantages de l'Animation par Cycles

✅ **Plus naturel** : Imite un "rappel" intermittent
✅ **Moins agressif** : Les pauses donnent du repos visuel
✅ **Plus efficace** : Attire l'attention plusieurs fois
✅ **Meilleure UX** : Pas de fatigue visuelle continue

## 📈 Métriques Attendues

### Avant (Animation Continue 30s)

- Temps d'attention : 30 secondes non-stop
- Risque d'agacement : Élevé
- Effet "Banner Blindness" : Probable

### Après (Animation par Cycles 20s)

- Temps d'attention : 4 cycles de 3s = 12s effectif
- Risque d'agacement : Faible
- Effet "rappel" : 4 opportunités d'engagement

### KPIs à Surveiller

```javascript
analytics.track('Chat Animation Viewed', {
  cycleCount: 4,
  totalDuration: 20,
  vibrationDuration: 3,
  pauseDuration: 2,
});

analytics.track('Chat Button Clicked', {
  timeToClick: 7.5, // secondes
  cycleAtClick: 2,   // 2ème cycle
  wasAnimating: true,
});
```

## ⚙️ Configuration Avancée

### Modifier les Timings

```tsx
// Dans components/chat-preoverlay.tsx
const VIBRATION_DURATION = 3000; // ← Modifier ici
const PAUSE_DURATION = 2000;     // ← Modifier ici
const TOTAL_DURATION = 20000;    // ← Modifier ici
```

### Exemples de Configurations

#### Configuration Agressive

```tsx
const VIBRATION_DURATION = 4000; // 4s
const PAUSE_DURATION = 1000;     // 1s
const TOTAL_DURATION = 25000;    // 25s
// = 5 cycles de 5s
```

#### Configuration Douce

```tsx
const VIBRATION_DURATION = 2000; // 2s
const PAUSE_DURATION = 3000;     // 3s
const TOTAL_DURATION = 15000;    // 15s
// = 3 cycles de 5s
```

#### Configuration Rapide

```tsx
const VIBRATION_DURATION = 2000; // 2s
const PAUSE_DURATION = 1000;     // 1s
const TOTAL_DURATION = 12000;    // 12s
// = 4 cycles de 3s
```

## 🔍 Debug et Monitoring

### Logs Console

Le composant log les événements importants :

```javascript
console.log("✅ ChatPreOverlay monté et prêt");
console.log("ChatPreOverlay: Bouton cliqué");
```

### Ajouter des Logs Détaillés

```tsx
// Dans runAnimationCycle()
const runAnimationCycle = () => {
  console.log("🔄 Début cycle vibration");
  setIsAnimating(true);

  const vibrationTimer = setTimeout(() => {
    console.log("⏸️  Début pause");
    setIsAnimating(false);

    const pauseTimer = setTimeout(() => {
      console.log("🔁 Fin pause, nouveau cycle");
      runAnimationCycle();
    }, PAUSE_DURATION);
    // ...
  }, VIBRATION_DURATION);
};
```

### Observer les States

```tsx
// Ajouter un useEffect de debug
React.useEffect(() => {
  console.log({
    isAnimating,
    animationStopped,
    timestamp: new Date().toISOString(),
  });
}, [isAnimating, animationStopped]);
```

## 🌐 Responsive

L'animation fonctionne de manière identique sur tous les appareils :

- ✅ **Mobile** : Animation visible et attractive
- ✅ **Tablet** : Animation fluide
- ✅ **Desktop** : Animation professionnelle

## ♿ Impact Accessibilité

### Considérations

⚠️ **Mouvement** : L'animation peut gêner certains utilisateurs

### Recommandations

1. **Respecter `prefers-reduced-motion`** (à implémenter) :

```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  setAnimationStopped(true);
}
```

2. **Bouton d'arrêt manuel** (optionnel) :

```tsx
<button onClick={() => setAnimationStopped(true)}>
  Arrêter l'animation
</button>
```

## 📝 Résumé

### Implémentation Actuelle

| Élément | Valeur |
|---------|--------|
| **Taille bouton** | 80px × 80px |
| **Texte accrocheur** | "Une question ?" |
| **Animation** | Shake (vibration) |
| **Durée vibration** | 3 secondes |
| **Durée pause** | 2 secondes |
| **Durée totale** | 20 secondes |
| **Nombre de cycles** | ~4 cycles |
| **Arrêt au clic** | ✅ Définitif |
| **Arrêt à l'annulation** | ✅ Définitif |

### Prochaines Améliorations

- [ ] Support `prefers-reduced-motion`
- [ ] A/B Testing des durées
- [ ] Analytics des cycles efficaces
- [ ] Adaptation selon la page
- [ ] Badge de notification optionnel

---

**Auteur**: Claude Code (E2I VoIP Team)
**Dernière mise à jour**: 2025-10-05
**Status**: ✅ Implémenté et Testé
