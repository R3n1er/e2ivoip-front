# Module Pré-Chat V2 - Améliorations UX

**Date**: 2025-10-05
**Version**: 2.0
**Composant**: `components/chat-preoverlay.tsx`

## 🎨 Améliorations Visuelles

### 1. Bouton Agrandi

**Avant**: `w-14 h-14` (56px × 56px)
**Après**: `w-20 h-20` (80px × 80px)

**Impact**: Bouton 43% plus grand, beaucoup plus visible et cliquable sur mobile.

### 2. Texte Accrocheur "Une question ?"

Ajout d'un texte flottant au-dessus du bouton :
- **Fond**: Blanc avec bordure grise légère
- **Position**: Au-dessus du bouton, aligné à droite
- **Typo**: `text-sm font-semibold` en gris foncé
- **Shadow**: `shadow-lg` pour se détacher du fond

```tsx
<div className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
  <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
    Une question ?
  </p>
</div>
```

### 3. Icône SVG Agrandie

**Avant**: `width="26" height="26"`
**Après**: `width="36" height="36"`

**Impact**: Icône 38% plus grande, proportionnelle au nouveau bouton.

## ⚡ Animations Attractives

### 1. Animation de Vibration (Shake)

**Keyframes CSS** (`app/globals.css`) :

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

**Application**: Le bouton vibre légèrement (±2px horizontal + ±1deg rotation) pour attirer l'attention.

### 2. Animation de Rebond (Bounce)

Le texte "Une question ?" utilise l'animation Tailwind `animate-bounce` native :
- Rebond vertical doux
- Attire l'œil vers le bouton

### 3. Durée d'Animation : 30 Secondes

**Logique React** :

```tsx
const [isAnimating, setIsAnimating] = useState(true);

React.useEffect(() => {
  const timer = setTimeout(() => {
    setIsAnimating(false);
  }, 30000); // 30 secondes

  return () => clearTimeout(timer);
}, []);
```

**Comportement** :
- ✅ Animation démarre au chargement de la page
- ✅ Animation s'arrête automatiquement après 30 secondes
- ✅ Animation s'arrête immédiatement au clic sur le bouton
- ✅ Animation ne reprend PAS après fermeture du formulaire

## 🎯 Objectifs UX

### 1. Attirer l'Attention

**Problème**: Bouton trop petit et statique, facilement ignoré.

**Solution**:
- Bouton 43% plus grand
- Texte accrocheur "Une question ?"
- Animation de vibration pendant 30 secondes

**Impact Attendu**: ↑ 200-300% de clics sur le bouton pré-chat.

### 2. Guider l'Utilisateur

**Texte contextuel**: "Une question ?" suggère l'action sans être intrusif.

**Animation limitée**: 30 secondes évitent l'agacement tout en captant l'attention initiale.

### 3. Expérience Non Intrusive

- Animation s'arrête automatiquement (30s)
- Animation s'arrête au clic (engagement utilisateur)
- Pas de son
- Pas de popup forcée
- Bouton reste discret après 30s

## 📊 Métriques de Performance

### Tests Playwright Créés

1. **Présence et taille** ✅
   - Vérifie le texte "Une question ?"
   - Vérifie la taille du bouton (≥70px)
   - Screenshots avant/après ouverture

2. **Animation 30 secondes** ✅
   - Vérifie présence initiale de `animate-shake`
   - Vérifie arrêt après 30s

3. **Arrêt au clic** ✅
   - Vérifie que l'animation s'arrête au clic
   - Vérifie qu'elle ne reprend pas après fermeture

4. **Responsive** ✅
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)

5. **Accessibilité** ✅
   - `aria-label` présent
   - Bouton focusable
   - Texte lisible par screen readers

### Résultats des Tests

```bash
npx playwright test chat-button-animation
```

**Résultat**: ✅ 5/5 tests passent

## 📐 Structure du Code

### Composant ChatPreOverlay

```tsx
export const ChatPreOverlay = memo(function ChatPreOverlay() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true); // ← Nouveau

  // Timer d'animation (30s)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!open && (
        <div className="flex flex-col items-end gap-3">
          {/* Texte "Une question?" avec bounce */}
          <div className={`... ${isAnimating ? "animate-bounce" : ""}`}>
            <p>Une question ?</p>
          </div>

          {/* Bouton agrandi avec shake */}
          <button
            onClick={() => {
              setOpen(true);
              setIsAnimating(false); // Arrêt immédiat
            }}
            className={`w-20 h-20 ... ${isAnimating ? "animate-shake" : ""}`}
          >
            <svg width="36" height="36">...</svg>
          </button>
        </div>
      )}

      {/* Formulaire (inchangé) */}
      {open && <div>...</div>}
    </div>
  );
});
```

### Styles CSS (app/globals.css)

```css
/* Animation de vibration */
@keyframes shake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px) rotate(-1deg); }
  20%, 40%, 60%, 80% { transform: translateX(2px) rotate(1deg); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out infinite;
}
```

## 🎬 Démonstration

### Timeline d'Utilisation

```
0s   → Page chargée
      ✅ Bouton visible (w-20 h-20)
      ✅ Texte "Une question ?" visible
      ✅ Animation shake démarrée
      ✅ Animation bounce démarrée

5s   → Utilisateur voit les animations
      ↻ Shake continue
      ↻ Bounce continue

30s  → Timer expire
      ❌ Animation shake arrêtée
      ❌ Animation bounce arrêtée
      ✅ Bouton reste visible (sans animation)

OU

15s  → Utilisateur clique sur le bouton
      ❌ Animation arrêtée immédiatement
      ✅ Formulaire s'ouvre

      → Utilisateur annule
      ✅ Formulaire se ferme
      ❌ Animation ne reprend PAS
```

## 🔧 Configuration

### Variables de Configuration

Pour modifier le comportement, éditer `components/chat-preoverlay.tsx` :

```tsx
// Durée de l'animation (en millisecondes)
const ANIMATION_DURATION = 30000; // 30 secondes

React.useEffect(() => {
  const timer = setTimeout(() => {
    setIsAnimating(false);
  }, ANIMATION_DURATION);
  return () => clearTimeout(timer);
}, []);
```

### Personnalisation du Texte

```tsx
// Modifier le texte accrocheur
<p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
  Une question ? {/* ← Personnaliser ici */}
</p>
```

### Ajuster l'Intensité de l'Animation

Dans `app/globals.css` :

```css
/* Vibration forte */
@keyframes shake {
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px) rotate(-2deg); }
  20%, 40%, 60%, 80% { transform: translateX(4px) rotate(2deg); }
}

/* Vibration douce */
@keyframes shake {
  10%, 30%, 50%, 70%, 90% { transform: translateX(-1px) rotate(-0.5deg); }
  20%, 40%, 60%, 80% { transform: translateX(1px) rotate(0.5deg); }
}
```

## 🌐 Responsive Design

Le composant s'adapte automatiquement à toutes les tailles d'écran :

### Mobile (< 768px)
- Bouton : `w-20 h-20` (80px)
- Position : `bottom-6 right-6`
- Texte visible et lisible

### Tablet (768px - 1024px)
- Bouton : `w-20 h-20` (80px)
- Position : `bottom-6 right-6`
- Texte visible et lisible

### Desktop (> 1024px)
- Bouton : `w-20 h-20` (80px)
- Position : `bottom-6 right-6`
- Texte visible et lisible

**Note**: Taille uniforme sur tous les appareils pour cohérence.

## ♿ Accessibilité

### ARIA Labels

```tsx
<button
  aria-label="Ouvrir le pré‑chat"
  data-testid="open-chat-button"
>
```

### Focus Management

- Bouton focusable au clavier (Tab)
- Indicateur de focus visible
- Ordre de tabulation logique

### Screen Readers

- Texte "Une question ?" lisible
- Bouton annoncé comme "Ouvrir le pré‑chat"
- États du formulaire annoncés

## 📱 Test Utilisateur

### Scénarios Testés

1. **Utilisateur arrive sur la page**
   - Voit immédiatement le bouton animé
   - Lit le texte "Une question ?"
   - Comprend l'action possible

2. **Utilisateur attend 5 secondes**
   - Animation attire toujours l'attention
   - Bouton reste visible et cliquable

3. **Utilisateur attend 35 secondes**
   - Animation arrêtée (pas d'agacement)
   - Bouton reste visible
   - Peut toujours cliquer

4. **Utilisateur clique rapidement**
   - Animation s'arrête immédiatement
   - Formulaire s'ouvre
   - Expérience fluide

5. **Utilisateur ferme le formulaire**
   - Animation ne reprend pas
   - Bouton reste calme
   - Pas de harcèlement

## 🚀 Déploiement

### Checklist

- [x] Bouton agrandi (w-20 h-20)
- [x] Texte "Une question ?" ajouté
- [x] Animation shake créée
- [x] Animation bounce appliquée
- [x] Timer 30 secondes implémenté
- [x] Arrêt au clic fonctionnel
- [x] Tests Playwright créés (5 tests)
- [x] Tous les tests passent ✅
- [x] Responsive testé (mobile, tablet, desktop)
- [x] Accessibilité vérifiée

### Commandes de Test

```bash
# Tous les tests d'animation
npm run test:e2e -- chat-button-animation

# Test spécifique (sauf 30s)
npm run test:e2e -- chat-button-animation --grep-invert "30 secondes"

# Test complet du flux
npm run test:e2e -- chat-preoverlay-flow
```

## 📈 KPIs à Surveiller

### Métriques d'Engagement

1. **Taux de clic sur le bouton pré-chat**
   - Avant : X%
   - Objectif : X% × 2-3

2. **Temps avant premier clic**
   - Objectif : < 10 secondes

3. **Taux de conversion (formulaire rempli)**
   - Objectif : ↑ 20-30%

4. **Taux d'abandon du formulaire**
   - Objectif : ↓ 10-15%

### Analytics à Configurer

```javascript
// Google Analytics / HubSpot
analytics.track('Chat Button Viewed', {
  hasAnimation: true,
  buttonSize: '80px',
});

analytics.track('Chat Button Clicked', {
  timeToClick: 5.2, // secondes
  animationWasActive: true,
});

analytics.track('Chat Form Submitted', {
  source: 'prechat-button',
  engagementDuration: 45, // secondes
});
```

## 🔄 Versions

### v2.0 (2025-10-05)
- ✨ Bouton agrandi (w-20 h-20)
- ✨ Texte "Une question ?"
- ✨ Animation shake + bounce
- ✨ Timer 30 secondes
- ✨ Arrêt au clic
- ✅ 5 tests Playwright

### v1.0 (Précédent)
- Bouton petit (w-14 h-14)
- Pas de texte accrocheur
- Pas d'animation
- Moins visible

## 🎯 Prochaines Améliorations Possibles

### Court Terme
- [ ] A/B Testing : tester différents textes ("Besoin d'aide ?", "Contactez-nous", etc.)
- [ ] A/B Testing : tester différentes durées d'animation (20s, 30s, 45s)
- [ ] Analytics : tracker les métriques d'engagement

### Moyen Terme
- [ ] Personnalisation par page (texte différent selon la page)
- [ ] Animation différente selon l'heure de la journée
- [ ] Badge de notification (nombre de messages non lus)

### Long Terme
- [ ] IA : déclencher l'animation selon le comportement utilisateur
- [ ] IA : adapter le texte selon le contexte de la page
- [ ] Intégration chat en temps réel

---

**Auteur**: Claude Code (E2I VoIP Team)
**Dernière mise à jour**: 2025-10-05
**Status**: ✅ Production Ready
