# Intégration du formulaire HubSpot

## Vue d'ensemble
Cette documentation décrit l'intégration du formulaire HubSpot dans la page contact de l'application Next.js 15.

## Composants créés

### 1. `components/hubspot-simple.tsx`
Composant principal pour charger et afficher le formulaire HubSpot.

**Caractéristiques :**
- Utilise `useRef` pour éviter les re-rendus multiples
- Vérifie si le script HubSpot est déjà chargé
- Attend que `window.hbspt` soit disponible avant de créer le formulaire
- Affiche un message de chargement pendant l'initialisation
- Timeout de sécurité après 10 secondes

**Configuration :**
```javascript
portalId: "26878201"
formId: "312a9f67-e613-4651-9690-4586646554a0"
region: "eu1"
```

### 2. Autres composants (archives)
- `hubspot-form-container.tsx` - Version avec logging détaillé
- `hubspot-inline.tsx` - Tentative avec script inline
- `hubspot-form.tsx` - Version initiale

## Utilisation

Dans la page contact (`app/contact/page.tsx`) :

```tsx
import { HubSpotSimple } from "@/components/hubspot-simple";

// Dans le JSX :
<CardContent className="p-8">
  <HubSpotSimple />
</CardContent>
```

## Problèmes connus et solutions

### 1. Formulaire ne s'affiche pas en développement local
**Causes possibles :**
- Bloqueurs de publicités (AdBlock, uBlock Origin, etc.)
- Restrictions CORS/CSP de HubSpot pour localhost
- Script bloqué par le navigateur

**Solutions :**
- Désactiver temporairement les bloqueurs de publicités
- Tester en environnement de staging/production
- Utiliser un tunnel (ngrok) pour obtenir une URL publique
- Vérifier la console du navigateur pour les erreurs

### 2. Erreurs MetaMask dans la console
Ces erreurs ne sont pas liées à HubSpot et peuvent être ignorées.

## Déploiement

Le formulaire HubSpot devrait fonctionner correctement une fois déployé sur un domaine public. Assurez-vous que :

1. Le domaine est ajouté dans les paramètres HubSpot
2. Les CSP (Content Security Policy) permettent le chargement depuis js-eu1.hsforms.net
3. Le tracking code HubSpot est installé si vous voulez suivre les analytics

## Commandes de test

```bash
# Développement local
npm run dev -- --port 3001

# Accéder à la page contact
http://localhost:3001/contact
```

## Références
- [Documentation HubSpot Forms](https://knowledge.hubspot.com/forms/how-can-i-share-a-hubspot-form-if-im-using-an-external-site)
- Script embed : `https://js-eu1.hsforms.net/forms/embed/v2.js`