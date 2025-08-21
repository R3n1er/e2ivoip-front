# Intégration HubSpot - Page de Contact

## Problème résolu

Le formulaire HubSpot ne s'affichait pas sur la page de contact en raison d'un problème de timing et de gestion des erreurs dans le composant `HubSpotScript`.

## Solution implémentée

### 1. Amélioration du composant HubSpotScript

Le composant a été amélioré avec :
- Gestion d'état pour le chargement et les erreurs
- Logs de debug pour diagnostiquer les problèmes
- Fallback en cas d'échec du chargement
- Gestion robuste des erreurs

### 2. Structure de la page de contact

```tsx
<div id="hubspot-form-container">
  <HubSpotScript />
</div>
```

Le composant `HubSpotScript` est maintenant intégré directement dans le conteneur du formulaire avec l'ID `hubspot-form-container`.

### 3. Configuration HubSpot

- **Portal ID**: 26878201
- **Form ID**: 312a9f67-e613-4651-9690-4586646554a0
- **Region**: eu1
- **Target**: #hubspot-form-container

## Composants créés

### HubSpotScript (`components/hubspot-script.tsx`)

Composant principal qui :
- Charge le script HubSpot
- Crée le formulaire une fois le script chargé
- Gère les erreurs et affiche un fallback
- Fournit des informations de debug

### Fallback

En cas d'échec, un lien email est affiché :
```tsx
<a href="mailto:contact@e2ivoip.fr">
  Nous contacter par email
</a>
```

## Tests implémentés

### 1. Tests unitaires
- `tests/hubspot-integration.test.tsx` - Tests d'intégration HubSpot
- `tests/hubspot-debug.test.tsx` - Tests du composant de debug

### 2. Tests d'intégration
- `tests/contact-page-hubspot.test.tsx` - Tests de la page de contact
- `tests/hubspot-e2e.test.tsx` - Tests end-to-end

### 3. Tests de la page complète
- Vérification de l'affichage du formulaire
- Vérification de la structure du conteneur
- Vérification du layout responsive

## Utilisation

### 1. Affichage automatique

Le formulaire HubSpot s'affiche automatiquement une fois la page chargée.

### 2. Debug

Des informations de debug sont affichées sous le formulaire pour diagnostiquer les problèmes.

### 3. Fallback

Si le formulaire ne peut pas être affiché, un lien email est proposé.

## Dépannage

### Problèmes courants

1. **Script HubSpot non chargé**
   - Vérifier la console du navigateur
   - Vérifier que l'URL du script est accessible
   - Vérifier les paramètres de configuration

2. **Conteneur non trouvé**
   - Vérifier que l'ID `hubspot-form-container` existe
   - Vérifier que le composant est rendu côté client

3. **Erreurs de création du formulaire**
   - Vérifier les IDs HubSpot (portal, form)
   - Vérifier les permissions et la configuration

### Logs de debug

Le composant affiche des informations de debug :
- Statut du chargement du script
- Statut de l'initialisation HubSpot
- Erreurs éventuelles

## Maintenance

### Mise à jour des IDs HubSpot

Si les IDs HubSpot changent, modifier le composant `HubSpotScript` :

```tsx
window.hbspt.forms.create({
  portalId: "NOUVEAU_PORTAL_ID",
  formId: "NOUVEAU_FORM_ID",
  region: "eu1",
  target: "#hubspot-form-container"
});
```

### Ajout de nouveaux formulaires

Pour ajouter d'autres formulaires HubSpot, créer de nouveaux composants basés sur `HubSpotScript` avec des IDs différents.

## Sécurité

- Les clés API HubSpot ne sont pas exposées dans le code client
- Le composant utilise uniquement les IDs publics du formulaire
- Aucune information sensible n'est transmise au navigateur

## Performance

- Le script HubSpot est chargé avec la stratégie `afterInteractive`
- Le composant utilise des timeouts appropriés pour éviter les blocages
- Gestion d'état optimisée pour éviter les re-renders inutiles
